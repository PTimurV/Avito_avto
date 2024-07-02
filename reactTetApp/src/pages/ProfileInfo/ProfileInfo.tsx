import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Car, User } from '../../types'
import { Button, Card } from 'antd'
import './ProfileInfo.css'

interface ProfileData {
	user: User
	cars: Car[]
	owner: number
}

const ProfileInfo: React.FC = () => {
	const { id } = useParams<{ id: string }>()
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
							<h3>{`${car.brand} ${car.model} ${car.release_year}, ${car.mileage} км`}</h3>
							<p>{car.description}</p>
							<p>
								<strong>{car.price} ₽</strong>
							</p>
							{profile.owner === 1 && (
								<div className='car-item__actions'>
									<Button type='primary'>Редактировать</Button>
									<Button>Удалить</Button>
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
