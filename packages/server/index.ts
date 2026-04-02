import express from 'express'
import type { Request, Response } from 'express'
import OpenAI from 'openai'
import dotenv from "dotenv"
import z from "zod"

dotenv.config()

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000

app.get('/health', (req: Request, res: Response) => {
  res.send("Server Up")
})

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: "Hello world" })
})

let lastResponseId: string | null;
//Conversationid => lastResponseId
// conv1 => 100
// //conv2 => 200
const conversations = new Map<string, string>()
const chatSchema = z.object({
  prompt: z.string()
    .trim()
    .min(1, 'Prompt is required')
    .max(1000, "prompt is too long (Max 100 characters)"),
  conversationId: z.string().uuid()

})

app.post('/api/chat', async (req: Request, res: Response) => {
  const parsedResult = chatSchema.safeParse(req.body);

  if (!parsedResult.success) {
    res.status(400).json(parsedResult.error.format());
    return;
  }


  try {
    const { prompt, conversationId } = req.body;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: conversations.get(conversationId)
    })

    conversations.set(conversationId, response.id)

    lastResponseId = response.id;

    res.json({ message: response.output_text })
  } catch (error) {
    res.status(500).json({
      error: "failed to generate a response"
    })
  }


})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
