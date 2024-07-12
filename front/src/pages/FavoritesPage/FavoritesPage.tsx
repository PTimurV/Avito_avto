import React, { useEffect, useState } from 'react'
import { Car } from '../../types'
import CarItem from '../../components/CarItem/CarItem'
import './FavoritesPage.css'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../AxiosHook/useAxios'
import withErrorBoundary from '../../components/Hoc/withErrorBoundary'

const FavoritesPage: React.FC = () => {
	const [favorites, setFavorites] = useState<Car[]>([])
	const [favoriteIds, setFavoriteIds] = useState<number[]>([])
	const { get, post } = useAxios()

	const navigate = useNavigate()

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (!accessToken) {
					throw new Error('Нет токена доступа')
				}

				const favoriteCars = await get('/favorites/user', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})

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
				await post(
					'/favorites/remove',
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
				await post(
					'/favorites/add',
					{ carId: carId },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				const newFavorite = await get(`/cars/${carId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				setFavoriteIds([...favoriteIds, carId])
				setFavorites([...favorites, newFavorite])
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
						onClick={() => navigate(`/cars/${car.id}`)}
						isFavorite={favoriteIds.includes(car.id)}
						onFavoriteToggle={toggleFavorite}
					/>
				))}
			</div>
		</div>
	)
}

export default withErrorBoundary(FavoritesPage)
