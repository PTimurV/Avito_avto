import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, List } from 'antd'
import { useAppSelector } from '../../hooks'
import { Chat } from '../../types'
import './ChatPage.css'
import useAxios from '../../AxiosHook/useAxios'
import withErrorBoundary from '../../components/Hoc/withErrorBoundary'

interface User {
	id: number
	name: string
	surname: string
}

const ChatPage: React.FC = () => {
	const [chats, setChats] = useState<Chat[]>([])
	const [users, setUsers] = useState<{ [key: number]: User }>({})
	const user = useAppSelector(state => state.user.user)
	const navigate = useNavigate()
	const { get } = useAxios()

	useEffect(() => {
		const fetchChats = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (!accessToken) {
					throw new Error('Нет токена доступа')
				}

				const chatsData = await get('/chat/user-chats', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				setChats(chatsData)

				// Fetch user details for each chat
				chatsData.forEach(async (chat: Chat) => {
					const otherUserId =
						chat.user1_id === user?.id ? chat.user2_id : chat.user1_id
					if (!users[otherUserId]) {
						const userData = await get(`/user/profile/${otherUserId}`, {
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						})
						setUsers(prevUsers => ({
							...prevUsers,
							[otherUserId]: userData.user,
						}))
					}
				})
			} catch (error) {
				console.error('Ошибка при получении чатов:', error)
			}
		}

		fetchChats()
	}, [user?.id, users])

	const handleChatClick = (chatId: number) => {
		navigate(`/chat/${chatId}`)
	}

	return (
		<div className='chat-page'>
			<h1>Мои чаты</h1>
			<List
				itemLayout='horizontal'
				dataSource={chats}
				renderItem={chat => {
					const otherUserId =
						chat.user1_id === user?.id ? chat.user2_id : chat.user1_id
					const otherUser = users[otherUserId]
					return (
						<List.Item>
							<List.Item.Meta
								title={
									otherUser
										? `${otherUser.name} ${otherUser.surname}`
										: 'Загрузка...'
								}
							/>
							<Button onClick={() => handleChatClick(chat.id)}>
								Перейти в чат
							</Button>
						</List.Item>
					)
				}}
			/>
		</div>
	)
}

export default withErrorBoundary(ChatPage)
