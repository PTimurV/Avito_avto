import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import Profile from '../../Profile/Profile'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import { clearUser, setUser } from '../../../store/userSlice'
import axios from 'axios'
import './Header.css'

const Header: React.FC = () => {
	const user = useAppSelector(state => state.user.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUser = async () => {
			const accessToken = localStorage.getItem('accessToken')
			if (accessToken) {
				try {
					const response = await axios.get(
						'http://localhost:3000/api/auth/me',
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						}
					)
					dispatch(setUser(response.data.user))
				} catch (error) {
					console.error('Ошибка при проверке токена:', error)
					await handleTokenRefresh()
				}
			}
		}

		const handleTokenRefresh = async () => {
			const refreshToken = localStorage.getItem('refreshToken')
			if (refreshToken) {
				try {
					const response = await axios.post(
						'http://localhost:3000/api/auth/refresh-token',
						{},
						{
							headers: {
								Authorization: `Bearer ${refreshToken}`,
							},
						}
					)
					localStorage.setItem('accessToken', response.data.accessToken)
					fetchUser() // Повторный вызов для получения данных пользователя
				} catch (error) {
					console.error('Ошибка при обновлении токена:', error)
					handleLogout()
				}
			} else {
				handleLogout()
			}
		}

		fetchUser()
	}, [dispatch, navigate])

	const handleLogout = () => {
		dispatch(clearUser())
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		navigate('/login')
	}

	return (
		<div className='header'>
			<div className='logo'>
				<Link to='/'>Мой сайт</Link>
			</div>
			<div className='nav-buttons'>
				{user ? (
					<>
						<Link to='/create-ad'>
							<Button type='primary'>Разместить объявление</Button>
						</Link>
						<Link to='/chats'>
							<Button>Чаты</Button>
						</Link>
						<Profile user={user} onLogout={handleLogout} />
					</>
				) : (
					<>
						<Link to='/login'>
							<Button type='primary'>Войти</Button>
						</Link>
						<Link to='/register'>
							<Button>Регистрация</Button>
						</Link>
					</>
				)}
			</div>
		</div>
	)
}

export default Header
