import { Request, Response } from 'express'
import {
	fetchChatHistory,
	createChatAndSendMessage,
	processMessage,
	fetchUserChats,
} from '../services/chatService'
import { WebSocket } from 'ws'
import { verifyAccessToken } from '../services/tokenService'
import { saveMessage } from '../repositories/chatRepository'

interface CustomError extends Error {
	status?: number
}

interface Message {
	id?: number
	conversation_id: number
	sender_id: number
	receiver_id: number
	message_text: string
	timestamp?: Date
}

export const getChatHistory = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const conversationId = parseInt(req.params.conversationId)
		const chatHistory = await fetchChatHistory(conversationId)
		res.json(chatHistory)
	} catch (error) {
		const err = error as CustomError
		res.status(err.status || 500).json({ error: err.message })
	}
}

export const handleMessage = (ws: WebSocket, message: string): void => {
	try {
		const parsedMessage: Message = JSON.parse(message)
		saveMessage(parsedMessage)

		// Отправляем сообщение обратно всем клиентам
		ws.send(JSON.stringify(parsedMessage))
	} catch (error) {
		console.error('Error handling message:', error)
	}
}

export const sendMessage = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			res.status(401).send('Unauthorized')
			return
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)
		const senderId = userPayload.id

		const { receiverId, message } = req.body

		await createChatAndSendMessage(senderId, receiverId, message)
		res.status(200).json({ message: 'Сообщение отправлено' })
	} catch (error) {
		const err = error as CustomError
		res.status(err.status || 500).json({ error: err.message })
	}
}

export const getUserChats = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			res.status(401).send('Unauthorized')
			return
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)
		const userId = userPayload.id

		const userChats = await fetchUserChats(userId)
		res.json(userChats)
	} catch (error) {
		const err = error as CustomError
		res.status(err.status || 500).json({ error: err.message })
	}
}
