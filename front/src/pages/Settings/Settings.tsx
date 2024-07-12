import React, { useEffect, useState } from 'react'
import { Input, Button, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/userSlice'
import { RootState } from '../../store'
import './Settings.css'
import useAxios from '../../AxiosHook/useAxios'
import withErrorBoundary from '../../components/Hoc/withErrorBoundary'

const Settings: React.FC = () => {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user.user)
	const [profile, setProfile] = useState({
		phone: '',
		name: '',
		surname: '',
		email: '',
	})
	const [loading, setLoading] = useState(true)
	const [editing, setEditing] = useState(false)
	const { get, put } = useAxios()

	useEffect(() => {
		const fetchProfile = async () => {
			const accessToken = localStorage.getItem('accessToken')
			if (accessToken) {
				try {
					const data = await get('/user/profile', {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					})
					setProfile(data)
					setLoading(false)
				} catch (error) {
					console.error('Ошибка при получении профиля:', error)
				}
			} else {
				console.error('Токен доступа не найден')
			}
		}

		fetchProfile()
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setProfile(prevProfile => ({
			...prevProfile,
			[name]: value,
		}))
	}

	const handleEdit = async () => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			try {
				await put('/user/profile', profile, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				setEditing(false)
				dispatch(setUser(profile)) // обновить профиль в Redux
			} catch (error) {
				console.error('Ошибка при обновлении профиля:', error)
			}
		}
	}

	useEffect(() => {
		if (user) {
			setProfile(user)
			setLoading(false)
		}
	}, [user])

	if (loading) {
		return <div>Загрузка...</div>
	}

	return (
		<div className='settings'>
			<h1>Настройки профиля</h1>
			<Form>
				<Form.Item
					label='Телефон'
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
				>
					<Input
						name='phone'
						value={profile.phone}
						onChange={handleInputChange}
						disabled={!editing}
					/>
				</Form.Item>
				<Form.Item label='Имя' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
					<Input
						name='name'
						value={profile.name}
						onChange={handleInputChange}
						disabled={!editing}
					/>
				</Form.Item>
				<Form.Item
					label='Фамилия'
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
				>
					<Input
						name='surname'
						value={profile.surname}
						onChange={handleInputChange}
						disabled={!editing}
					/>
				</Form.Item>
				<Form.Item
					label='Email'
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
				>
					<Input
						name='email'
						value={profile.email}
						onChange={handleInputChange}
						disabled={!editing}
					/>
				</Form.Item>
				{editing ? (
					<Button type='primary' onClick={handleEdit}>
						Сохранить
					</Button>
				) : (
					<Button type='primary' onClick={() => setEditing(true)}>
						Редактировать
					</Button>
				)}
			</Form>
		</div>
	)
}

export default withErrorBoundary(Settings)
