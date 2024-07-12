import React, { useEffect, useState } from 'react'
import { Car } from '../../types'
import CarItem from '../../components/CarItem/CarItem'
import './ViewHistory.css'
import useAxios from '../../AxiosHook/useAxios'
import withErrorBoundary from '../../components/Hoc/withErrorBoundary'

const ViewHistory: React.FC = () => {
	const [viewHistory, setViewHistory] = useState<Car[]>([])
	const [favorites, setFavorites] = useState<number[]>([])
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
		const fetchViewHistory = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (accessToken) {
					const data = await get('/view-history', {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					})
					setViewHistory(data)
				}
			} catch (error) {
				console.error('Ошибка при получении истории просмотров:', error)
			}
		}

		fetchViewHistory()
		fetchFavorites()
	}, [])

	return (
		<div className='view-history'>
			<h1>История посещений</h1>
			<div className='car-list'>
				{viewHistory.map(car => (
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

export default withErrorBoundary(ViewHistory)
