import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import Profile from '../../Profile/Profile'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import { clearUser, setUser } from '../../../store/userSlice'
import './Header.css'
import useAxios from '../../../AxiosHook/useAxios'

const Header: React.FC = () => {
	const user = useAppSelector(state => state.user.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { get, post } = useAxios()

	useEffect(() => {
		const fetchUser = async () => {
			const accessToken = localStorage.getItem('accessToken')
			if (accessToken) {
				try {
					const data = await get('/auth/me')
					dispatch(setUser(data.user))
				} catch (error) {
					console.error('Ошибка при проверке токена:', error)
					await handleTokenRefresh()
				}
			}
		}

		const handleTokenRefresh = async () => {
			const refreshToken = localStorage.getItem('refreshToken')
			console.log('Рефрешь= ', refreshToken)
			if (refreshToken) {
				try {
					const data = await post(
						'/auth/refresh-token',
						{},
						{},
						true // Используем refreshToken
					)
					localStorage.setItem('accessToken', data.accessToken)
					await fetchUser() // Повторный вызов для получения данных пользователя
				} catch (error) {
					console.error('Ошибка при обновлении токена:', error)
					handleLogout()
				}
			} else {
				handleLogout()
			}
		}

		fetchUser()
	}, [dispatch])

	const handleLogout = () => {
		dispatch(clearUser())
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		navigate('/login')
	}

	return (
		<div className='header'>
			<div className='logo'>
				<Link to='/'>Авито Авто</Link>
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
