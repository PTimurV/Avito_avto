import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CarItem from '../../components/CarItem/CarItem'
import { Car } from '../../types'
import Filters from '../../components/Filters/Filters'
import './Home.css'

const Home: React.FC = () => {
	const [cars, setCars] = useState<Car[]>([])
	const [filters, setFilters] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await axios.get('http://localhost:3000/api/cars')
				setCars(response.data)
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		}

		fetchCars()
	}, [])

	const handleFiltersChange = async (newFilters: any) => {
		setFilters(newFilters)
		const params = new URLSearchParams()

		if (newFilters.yearFrom)
			params.append('release_year_from', newFilters.yearFrom)
		if (newFilters.yearTo) params.append('release_year_to', newFilters.yearTo)
		if (newFilters.mileageFrom)
			params.append('mileage_from', newFilters.mileageFrom)
		if (newFilters.mileageTo) params.append('mileage_to', newFilters.mileageTo)
		if (newFilters.priceFrom) params.append('price_from', newFilters.priceFrom)
		if (newFilters.priceTo) params.append('price_to', newFilters.priceTo)
		if (newFilters.carType) params.append('car_type', newFilters.carType)
		if (newFilters.color) params.append('color', newFilters.color)
		if (newFilters.brandId !== null)
			params.append('brand', newFilters.brandId.toString())
		if (newFilters.model !== null)
			params.append('model', newFilters.model.toString())
		if (newFilters.manufacturer.length > 0)
			params.append('manufacturer', newFilters.manufacturer.join(','))
		if (newFilters.engineType.length > 0)
			params.append('engine_type', newFilters.engineType.join(','))
		if (newFilters.drive.length > 0)
			params.append('drive', newFilters.drive.join(','))
		if (newFilters.transmission.length > 0)
			params.append('transmission', newFilters.transmission.join(','))
		if (newFilters.condition) params.append('condition', newFilters.condition)
		if (newFilters.ownersFrom)
			params.append('owners_by_PTS_from', newFilters.ownersFrom)
		if (newFilters.ownersTo)
			params.append('owners_by_PTS_to', newFilters.ownersTo)
		if (newFilters.search) params.append('search', newFilters.search)

		try {
			const response = await axios.get(
				`http://localhost:3000/api/cars?${params.toString()}`
			)
			setCars(response.data)
		} catch (error) {
			console.error('Ошибка при получении данных автомобилей:', error)
		}
	}

	return (
		<div className='home'>
			<Filters onFiltersChange={handleFiltersChange} />
			<div className='car-list'>
				{cars.map(car => (
					<CarItem
						key={car.id}
						car={car}
						onClick={() => navigate(`/cars/${car.id}`)}
					/>
				))}
			</div>
		</div>
	)
}

export default Home
