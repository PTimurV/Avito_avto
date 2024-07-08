import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

interface Message {
	id?: number
	conversation_id: number
	sender_id: number
	receiver_id: number
	message_text: string
	timestamp?: Date
}

export const getChatHistory = async (
	conversationId: number
): Promise<Message[]> => {
	return db('messages')
		.where({ conversation_id: conversationId })
		.orderBy('timestamp', 'asc')
}

export const saveMessage = async (message: Message): Promise<void> => {
	await db('messages').insert(message)
}

export const createChat = async (
	user1Id: number,
	user2Id: number
): Promise<number> => {
	const [conversation] = await db('conversations')
		.insert({
			user1_id: user1Id,
			user2_id: user2Id,
		})
		.returning('id')
	return conversation.id
}

export const getUserChatsFromDB = async (userId: number): Promise<any[]> => {
	return db('conversations')
		.where('user1_id', userId)
		.orWhere('user2_id', userId)
		.select('*')
}
