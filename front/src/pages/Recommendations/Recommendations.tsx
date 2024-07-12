import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Car } from '../../types'
import CarItem from '../../components/CarItem/CarItem'
import './Recommendations.css'
import useAxios from '../../AxiosHook/useAxios'
import withErrorBoundary from '../../components/Hoc/withErrorBoundary'

const Recommendations: React.FC = () => {
	const [recommendations, setRecommendations] = useState<Car[]>([])
	const [favorites, setFavorites] = useState<number[]>([])
	const navigate = useNavigate()
	const { get, post } = useAxios()

	const fetchFavorites = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			if (!accessToken) {
				throw new Error('Нет токена доступа')
			}

			const data = await get('/favorites/user', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			setFavorites(data.map((favorite: any) => favorite.id))
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
				await post(
					'/favorites/remove',
					{ carId: carId },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setFavorites(favorites.filter(id => id !== carId))
			} else {
				await post(
					'/favorites/add',
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
					const data = await get('/recommendations', {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					})
					setRecommendations(data)
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
						onClick={() => navigate(`/cars/${car.id}`)}
						isFavorite={favorites.includes(car.id)}
						onFavoriteToggle={toggleFavorite}
					/>
				))}
			</div>
		</div>
	)
}

export default withErrorBoundary(Recommendations)
