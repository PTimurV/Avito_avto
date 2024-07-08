import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Car } from '../../types'
import CarItem from '../../components/CarItem/CarItem'
import './FavoritesPage.css'

const FavoritesPage: React.FC = () => {
	const [favorites, setFavorites] = useState<Car[]>([])
	const [favoriteIds, setFavoriteIds] = useState<number[]>([])

	useEffect(() => {
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

				const favoriteCars = response.data
				setFavorites(favoriteCars)
				setFavoriteIds(favoriteCars.map((car: Car) => car.id))
			} catch (error) {
				console.error('Ошибка при получении избранных объявлений:', error)
			}
		}

		fetchFavorites()
	}, [])

	const toggleFavorite = async (carId: number) => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			if (!accessToken) {
				throw new Error('Нет токена доступа')
			}

			if (favoriteIds.includes(carId)) {
				await axios.post(
					'http://localhost:3000/api/favorites/remove',
					{ carId: carId },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setFavoriteIds(favoriteIds.filter(id => id !== carId))
				setFavorites(favorites.filter(car => car.id !== carId))
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
				const newFavoriteResponse = await axios.get(
					`http://localhost:3000/api/cars/${carId}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setFavoriteIds([...favoriteIds, carId])
				setFavorites([...favorites, newFavoriteResponse.data])
			}
		} catch (error) {
			console.error('Ошибка при изменении избранного:', error)
		}
	}

	return (
		<div className='favorites-page'>
			<h1>Избранные объявления</h1>
			<div className='favorites-list'>
				{favorites.map(car => (
					<CarItem
						key={car.id}
						car={car}
						onClick={() => console.log(car.id)}
						isFavorite={favoriteIds.includes(car.id)}
						onFavoriteToggle={toggleFavorite}
					/>
				))}
			</div>
		</div>
	)
}

export default FavoritesPage
