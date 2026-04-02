import type { Request, Response } from "express"
import { chatService } from "../services/chat.service";
import z from "zod";




const chatSchema = z.object({
  prompt: z.string()
    .trim()
    .min(1, 'Prompt is required')
    .max(1000, "prompt is too long (Max 100 characters)"),
  conversationId: z.string().uuid()

})


//pub
export const chatController = {
  async sendMessage(req: Request, res: Response) {
    const parsedResult = await chatSchema.safeParse(req.body);

    if (!parsedResult.success) {
      res.status(400).json(parsedResult.error.format());
      return;
    }


    try {
      const { prompt, conversationId } = req.body;

      const response = await chatService.sendMessage(prompt, conversationId)

      res.json({ message: response.message })
    } catch (error) {
      res.status(500).json({
        error: "failed to generate a response"
      })
    }
  }
}
