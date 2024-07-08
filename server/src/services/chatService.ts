import {
	getChatHistory,
	saveMessage,
	createChat,
	getUserChatsFromDB,
} from '../repositories/chatRepository'
import { WebSocket } from 'ws'

interface Message {
	id?: number
	conversation_id: number
	sender_id: number
	receiver_id: number
	message_text: string
	timestamp?: Date
}

let clients: WebSocket[] = []

export const fetchChatHistory = async (
	conversationId: number
): Promise<Message[]> => {
	return getChatHistory(conversationId)
}

export const processMessage = async (
	ws: WebSocket,
	message: string
): Promise<void> => {
	const parsedMessage: Message = JSON.parse(message)
	await saveMessage(parsedMessage)

	clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(parsedMessage))
		}
	})
}

export const createChatAndSendMessage = async (
	senderId: number,
	receiverId: number,
	messageText: string
): Promise<void> => {
	const conversationId = await createChat(senderId, receiverId)
	const message: Message = {
		conversation_id: conversationId,
		sender_id: senderId,
		receiver_id: receiverId,
		message_text: messageText,
		timestamp: new Date(),
	}
	await saveMessage(message)

	clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(message))
		}
	})
}

export const fetchUserChats = async (userId: number): Promise<any[]> => {
	return getUserChatsFromDB(userId)
}

export const addClient = (ws: WebSocket): void => {
	clients.push(ws)
}

export const removeClient = (ws: WebSocket): void => {
	clients = clients.filter(client => client !== ws)
}
