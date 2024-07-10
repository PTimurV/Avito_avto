export interface Car {
	id: number
	brand: string
	model: string
	release_year: number
	mileage: number
	description: string
	price: number
	photos?: [string]
}

export interface User {
	id?: number
	email: string
	name: string
	surname: string
	phone: string
}

export interface Chat {
	id: number
	user1_id: number
	user2_id: number
	created_at: string
}

export interface Message {
	id?: number
	conversation_id: number
	sender_id: number
	receiver_id: number
	message_text: string
	timestamp?: Date
}
