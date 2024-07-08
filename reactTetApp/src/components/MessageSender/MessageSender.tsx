import React, { useState } from 'react'
import axios from 'axios'
import { Button, Input } from 'antd'

interface MessageSenderProps {
	receiverId: string
}

const MessageSender: React.FC<MessageSenderProps> = ({ receiverId }) => {
	const [message, setMessage] = useState('')

	const handleSendMessage = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			if (!accessToken) {
				throw new Error('Нет токена доступа')
			}

			await axios.post(
				'http://localhost:3000/api/chat/send-message',
				{
					receiverId,
					message,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			setMessage('')
			alert('Сообщение отправлено!')
		} catch (error) {
			console.error('Ошибка при отправке сообщения:', error)
			alert('Не удалось отправить сообщение')
		}
	}

	return (
		<div className='message-section'>
			<Input.TextArea
				value={message}
				onChange={e => setMessage(e.target.value)}
				placeholder='Напишите сообщение...'
				rows={4}
			/>
			<Button type='primary' onClick={handleSendMessage}>
				Написать
			</Button>
		</div>
	)
}

export default MessageSender
