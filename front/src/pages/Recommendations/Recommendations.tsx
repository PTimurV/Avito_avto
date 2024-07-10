import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Car } from '../../types'
import CarItem from '../../components/CarItem/CarItem'
import './Recommendations.css'

const Recommendations: React.FC = () => {
	const [recommendations, setRecommendations] = useState<Car[]>([])
	const [favorites, setFavorites] = useState<number[]>([])

	const fetchFavorites = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			if (!accessToken) {
				throw new Error('Нет токена доступа')
			}

			const response = await axios.get(
				'http://localhost:3000/api/favorites/user',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			setFavorites(response.data.map((favorite: any) => favorite.id))
		} catch (error) {
			console.error('Ошибка при получении избранных объявлений:', error)
		}
	}

	const toggleFavorite = async (carId: number) => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			if (!accessToken) {
				throw new Error('Нет токена доступа')
			}

			if (favorites.includes(carId)) {
				await axios.post(
					'http://localhost:3000/api/favorites/remove',
					{ carId: carId },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setFavorites(favorites.filter(id => id !== carId))
			} else {
				await axios.post(
					'http://localhost:3000/api/favorites/add',
					{ carId: carId },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setFavorites([...favorites, carId])
			}
		} catch (error) {
			console.error('Ошибка при изменении избранного:', error)
		}
	}

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (accessToken) {
					const response = await axios.get(
						'http://localhost:3000/api/recommendations',
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						}
					)
					setRecommendations(response.data)
				}
			} catch (error) {
				console.error('Ошибка при получении рекомендаций:', error)
			}
		}

		fetchRecommendations()
		fetchFavorites()
	}, [])

	return (
		<div className='recommendations'>
			<h1>Рекомендации</h1>
			<div className='car-list'>
				{recommendations.map(car => (
					<CarItem
						key={car.id}
						car={car}
						onClick={() => (window.location.href = `/cars/${car.id}`)}
						isFavorite={favorites.includes(car.id)}
						onFavoriteToggle={toggleFavorite}
					/>
				))}
			</div>
		</div>
	)
}

export default Recommendations
