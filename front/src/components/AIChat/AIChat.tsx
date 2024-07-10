// AIChat.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface ChatMessage {
	role: 'system' | 'user' | 'assistant'
	content: string
}

interface AIChatProps {
	context: string
}

const AIChat: React.FC<AIChatProps> = ({ context }) => {
	const [userInput, setUserInput] = useState<string>('')
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

	useEffect(() => {
		const initMessage: ChatMessage = {
			role: 'system',
			content: context,
		}
		setChatHistory([initMessage])
	}, [context])

	const sendMessage = async () => {
		if (userInput.trim() === '') return

		const newMessage: ChatMessage = {
			role: 'user',
			content: userInput,
		}

		const newChatHistory = [...chatHistory, newMessage]
		setChatHistory(newChatHistory)
		setUserInput('')

		try {
			const response = await axios.post(
				'https://api.mistral.ai/v1/chat/completions',
				{
					model: 'mistral-large-latest',
					messages: newChatHistory,
				},
				{
					headers: {
						Authorization: `Bearer x2j19nHsfpSsCZvBKrlTcBdz16xXzQx1`,
						'Content-Type': 'application/json',
					},
				}
			)

			const aiMessage: ChatMessage = {
				role: 'assistant',
				content: response.data.choices[0].message.content,
			}

			setChatHistory([...newChatHistory, aiMessage])
		} catch (error) {
			console.error('Ошибка при общении с ИИ:', error)
		}
	}

	return (
		<div className='ai-chat'>
			<div className='ai-chat__history'>
				{chatHistory
					.filter(message => message.role !== 'system') // Фильтрация системных сообщений
					.map((message, index) => (
						<div
							key={index}
							className={`ai-chat__message ai-chat__message--${message.role}`}
						>
							{message.content}
						</div>
					))}
			</div>
			<input
				type='text'
				value={userInput}
				onChange={e => setUserInput(e.target.value)}
				placeholder='Введите ваш вопрос...'
			/>
			<button onClick={sendMessage}>Отправить</button>
		</div>
	)
}

export default AIChat
