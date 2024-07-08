import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Input, List } from 'antd'
import { useAppSelector } from '../../hooks'
import { Message } from '../../types'
import './ChatRoom.css'

const { TextArea } = Input

interface User {
	id: number
	name: string
	surname: string
}

const ChatRoom: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [messages, setMessages] = useState<Message[]>([])
	const [newMessage, setNewMessage] = useState('')
	const [receiver, setReceiver] = useState<User | null>(null)
	const ws = useRef<WebSocket | null>(null)
	const user = useAppSelector(state => state.user.user)
	const [receiverId, setReceiverId] = useState<number | null>(null)

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (!accessToken) {
					throw new Error('Нет токена доступа')
				}

				const response = await axios.get(
					`http://localhost:3000/api/chat/history/${id}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setMessages(response.data)

				// Предполагаем, что первый пользователь, не равный текущему пользователю, является получателем
				if (response.data.length > 0) {
					const message = response.data[0]
					const otherUserId =
						message.sender_id === user?.id
							? message.receiver_id
							: message.sender_id
					setReceiverId(otherUserId)

					if (otherUserId) {
						const userResponse = await axios.get(
							`http://localhost:3000/api/user/profile/${otherUserId}`,
							{
								headers: {
									Authorization: `Bearer ${accessToken}`,
								},
							}
						)
						setReceiver(userResponse.data.user)
					}
				}
			} catch (error) {
				console.error('Ошибка при получении сообщений:', error)
			}
		}

		fetchMessages()

		ws.current = new WebSocket('ws://localhost:3000')
		ws.current.onopen = () => {
			console.log('Connected to WebSocket')
		}
		ws.current.onmessage = event => {
			const message: Message = JSON.parse(event.data)
			setMessages(prevMessages => [...prevMessages, message])
		}
		ws.current.onclose = () => {
			console.log('Disconnected from WebSocket')
		}

		return () => {
			ws.current?.close()
		}
	}, [id, user?.id])

	const handleSendMessage = () => {
		if (ws.current && newMessage.trim() && receiverId) {
			const message: Message = {
				conversation_id: Number(id),
				sender_id: user?.id!,
				receiver_id: receiverId,
				message_text: newMessage,
				timestamp: new Date(),
			}
			ws.current.send(JSON.stringify(message))
			setNewMessage('')
		}
	}

	return (
		<div className='chat-room'>
			<List
				className='message-list'
				itemLayout='horizontal'
				dataSource={messages}
				renderItem={message => (
					<List.Item>
						<List.Item.Meta
							title={
								message.sender_id === user?.id
									? 'Вы'
									: receiver
									? `${receiver.name} ${receiver.surname}`
									: 'Загрузка...'
							}
							description={message.message_text}
						/>
					</List.Item>
				)}
			/>
			<TextArea
				rows={4}
				value={newMessage}
				onChange={e => setNewMessage(e.target.value)}
				placeholder='Напишите сообщение...'
			/>
			<Button type='primary' onClick={handleSendMessage}>
				Отправить
			</Button>
		</div>
	)
}

export default ChatRoom
