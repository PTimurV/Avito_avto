import { Router } from 'express'
import {
	getChatHistory,
	sendMessage,
	getUserChats,
} from '../controllers/chatController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.get('/history/:conversationId', authMiddleware, getChatHistory)
router.post('/send-message', authMiddleware, sendMessage)
router.get('/user-chats', authMiddleware, getUserChats) // Новый маршрут

export default router
