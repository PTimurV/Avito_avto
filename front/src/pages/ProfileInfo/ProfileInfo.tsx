import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Card } from 'antd'
import { Car, User } from '../../types'
import MessageSender from '../../components/MessageSender/MessageSender'
import './ProfileInfo.css'

interface ProfileData {
	user: User
	cars: Car[]
	owner: number
}

const ProfileInfo: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [profile, setProfile] = useState<ProfileData | null>(null)

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (!accessToken) {
					throw new Error('Нет токена доступа')
				}

				const response = await axios.get(
					`http://localhost:3000/api/user/profile/${id}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setProfile(response.data)
			} catch (error) {
				console.error('Ошибка при получении данных профиля:', error)
			}
		}

		fetchProfile()
	}, [id])

	const handleDelete = async (carId: number) => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			if (!accessToken) {
				throw new Error('Нет токена доступа')
			}

			await axios.delete(`http://localhost:3000/api/cars/${carId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Обновляем состояние, чтобы удалить объявление из списка
			setProfile(prevProfile => {
				if (!prevProfile) return prevProfile
				return {
					...prevProfile,
					cars: prevProfile.cars.filter(car => car.id !== carId),
				}
			})
		} catch (error) {
			console.error('Ошибка при удалении объявления:', error)
		}
	}

	if (!profile) {
		return <div>Загрузка...</div>
	}

	return (
		<div className='profile-info'>
			<div className='profile-info__details'>
				<h1>{`${profile.user.name} ${profile.user.surname}`}</h1>
				<p>
					<strong>Email:</strong> {profile.user.email}
				</p>
				<p>
					<strong>Телефон:</strong> {profile.user.phone || 'Не указан'}
				</p>
			</div>
			{profile.owner === 0 && <MessageSender receiverId={id} />}
			<div className='profile-info__cars'>
				<h2>Мои объявления</h2>
				{profile.cars.map(car => (
					<Card key={car.id} className='car-item'>
						<div className='car-item__image'>
							<img
								src={
									car.photos.length > 0
										? car.photos[0]
										: '/images/placeholder.jpg'
								}
								alt='Car'
							/>
						</div>
						<div className='car-item__details'>
							<h3
								onClick={() => navigate(`/cars/${car.id}`)}
								className='car-title'
							>{`${car.brand} ${car.model} ${car.release_year}, ${car.mileage} км`}</h3>
							<p>{car.description}</p>
							<p>
								<strong>{car.price} ₽</strong>
							</p>
							{profile.owner === 1 && (
								<div className='car-item__actions'>
									<Button
										type='primary'
										onClick={() => navigate(`/edit-car/${car.id}`)}
									>
										Редактировать
									</Button>
									<Button onClick={() => handleDelete(car.id)}>Удалить</Button>
								</div>
							)}
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}

export default ProfileInfo
