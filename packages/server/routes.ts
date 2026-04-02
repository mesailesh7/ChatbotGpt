import expres from 'express'
import type { Request, Response } from 'express'
import { chatController } from './controllers/chat.controller'


const router = expres.Router()

router.get('/health', (req: Request, res: Response) => {
  res.send("Server Up")
})

router.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: "Hello world" })
})

let lastResponseId: string | null;


router.post('/api/chat', chatController.sendMessage)

export default router;
