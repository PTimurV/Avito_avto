import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../AxiosHook/useAxios' // Предполагаем, что useAxios уже существует

const withAuth = (WrappedComponent: React.ComponentType) => {
	return (props: any) => {
		const navigate = useNavigate()
		const { get, post } = useAxios()
		const [loading, setLoading] = useState(true)

		useEffect(() => {
			const checkAuth = async () => {
				try {
					const accessToken = localStorage.getItem('accessToken')
					if (accessToken) {
						try {
							await get('/auth/me')
							setLoading(false)
						} catch (error) {
							console.error(
								'AccessToken недействителен, пробуем обновить токен:',
								error
							)
							await handleTokenRefresh()
						}
					} else {
						navigate('/login')
					}
				} catch (error) {
					console.error('Ошибка при проверке авторизации:', error)
					navigate('/login')
				}
			}

			const handleTokenRefresh = async () => {
				const refreshToken = localStorage.getItem('refreshToken')
				if (refreshToken) {
					try {
						const data = await post(
							'/auth/refresh-token',
							{},
							{},
							true // Используем refreshToken
						)
						localStorage.setItem('accessToken', data.accessToken)
						await checkAuth() // Повторный вызов для получения данных пользователя
					} catch (error) {
						console.error('Ошибка при обновлении токена:', error)
						handleLogout()
					}
				} else {
					handleLogout()
				}
			}

			const handleLogout = () => {
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')
				navigate('/login')
			}

			checkAuth()
		}, [navigate, get, post])

		if (loading) {
			return <div>Loading...</div>
		}

		return <WrappedComponent {...props} />
	}
}

export default withAuth
