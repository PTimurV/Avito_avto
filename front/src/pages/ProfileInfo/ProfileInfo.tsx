import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card } from 'antd'
import { Car, User } from '../../types'
import MessageSender from '../../components/MessageSender/MessageSender'
import './ProfileInfo.css'
import withErrorBoundary from '../../components/Hoc/withErrorBoundary'

import useAxios from '../../AxiosHook/useAxios'

interface ProfileData {
	user: User
	cars: Car[]
	owner: number
}

const ProfileInfo: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [profile, setProfile] = useState<ProfileData | null>(null)
	const { get, del } = useAxios()

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (!accessToken) {
					throw new Error('Нет токена доступа')
				}

				const data = await get(`/user/profile/${id}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				setProfile(data)
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

			await del(`/cars/${carId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

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
				{profile.owner === 0 && <MessageSender receiverId={id} />}
			</div>
			<div className='profile-info__cars'>
				<h2>Мои объявления</h2>
				{profile.cars.map(car => (
					<Card key={car.id} className='car-item'>
						<div className='car-item__header'>
							<div
								className='car-item__images'
								onClick={() => navigate(`/cars/${car.id}`)}
							>
								<img
									src={
										car.photos.length > 0
											? car.photos[0]
											: '/images/placeholder.jpg'
									}
									alt='Car'
									className='car-item__main-image'
								/>
								<div className='car-item__small-images'>
									{car.photos.slice(1, 3).map((src, index) => (
										<img
											key={index}
											src={src}
											alt='Car'
											className='car-item__small-image'
										/>
									))}
								</div>
							</div>
							<div
								className='car-item__details'
								onClick={() => navigate(`/cars/${car.id}`)}
							>
								<h3 className='car-title'>{`${car.brand} ${car.model} ${car.release_year}, ${car.mileage} км`}</h3>
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
										<Button onClick={() => handleDelete(car.id)}>
											Удалить
										</Button>
									</div>
								)}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}

export default withErrorBoundary(ProfileInfo)
