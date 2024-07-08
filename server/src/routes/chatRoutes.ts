import { Router } from 'express'
import {
	getChatHistory,
	sendMessage,
	getUserChats,
} from '../controllers/chatController'

const router = Router()

router.get('/history/:conversationId', getChatHistory)
router.post('/send-message', sendMessage)
router.get('/user-chats', getUserChats) // Новый маршрут

export default router
