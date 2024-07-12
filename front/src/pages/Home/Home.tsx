import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarItem from '../../components/CarItem/CarItem'
import { Car } from '../../types'
import Filters from '../../components/Filters/Filters'
import Pagination from '../../components/Pagination/Pagination'
import './Home.css'
import useAxios from '../../AxiosHook/useAxios'
import withErrorBoundary from '../../components/Hoc/withErrorBoundary'

const Home: React.FC = () => {
	const [cars, setCars] = useState<Car[]>([])
	const [favorites, setFavorites] = useState<number[]>([])
	const [filters, setFilters] = useState<any>({})
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const navigate = useNavigate()
	const { get, post } = useAxios()

	const fetchCars = async (page: number, filters: any) => {
		try {
			const params = new URLSearchParams()
			params.append('page', page.toString())
			params.append('limit', '10')

			// Добавляем фильтры
			if (filters.yearFrom) params.append('release_year_from', filters.yearFrom)
			if (filters.yearTo) params.append('release_year_to', filters.yearTo)
			if (filters.mileageFrom)
				params.append('mileage_from', filters.mileageFrom)
			if (filters.mileageTo) params.append('mileage_to', filters.mileageTo)
			if (filters.priceFrom) params.append('price_from', filters.priceFrom)
			if (filters.priceTo) params.append('price_to', filters.priceTo)
			if (filters.carType) params.append('car_type', filters.carType)
			if (filters.color) params.append('color', filters.color)
			if (filters.brand) params.append('brand', filters.brand)
			if (filters.model) params.append('model', filters.model)
			if (filters.manufacturer)
				params.append('manufacturer', filters.manufacturer)
			if (filters.engineType) params.append('engine_type', filters.engineType)
			if (filters.drive) params.append('drive', filters.drive)
			if (filters.transmission)
				params.append('transmission', filters.transmission)
			if (filters.condition) params.append('condition', filters.condition)
			if (filters.ownersFrom)
				params.append('owners_by_PTS_from', filters.ownersFrom)
			if (filters.ownersTo) params.append('owners_by_PTS_to', filters.ownersTo)
			if (filters.search) params.append('search', filters.search)

			const data = await get(`/cars?${params.toString()}`)
			setCars(data.cars)
			setTotalPages(data.pages)
		} catch (error) {
			console.error('Ошибка при получении данных:', error)
		}
	}

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
		fetchCars(page, filters)
		fetchFavorites()
	}, [page, filters])

	const handleFiltersChange = (newFilters: any) => {
		setFilters(newFilters)
		setPage(1) // Сбрасываем на первую страницу при изменении фильтров
	}

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPage(newPage)
		}
	}

	return (
		<div className='home'>
			<div className='home__filters'>
				<Filters onFiltersChange={handleFiltersChange} />
			</div>
			<div className='home__car-list'>
				{cars.map(car => (
					<CarItem
						key={car.id}
						car={car}
						onClick={() => navigate(`/cars/${car.id}`)}
						isFavorite={favorites.includes(car.id)}
						onFavoriteToggle={toggleFavorite}
					/>
				))}
				<Pagination
					page={page}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	)
}

export default withErrorBoundary(Home)
