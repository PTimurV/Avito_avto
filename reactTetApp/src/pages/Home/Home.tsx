import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CarItem from '../../components/CarItem/CarItem'
import { Car } from '../../types'
import './Home.css'

const Home: React.FC = () => {
	const [cars, setCars] = useState<Car[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get('http://localhost:3000/api/cars')
			.then(response => setCars(response.data))
			.catch(error => console.error('Ошибка при получении данных:', error))
	}, [])

	return (
		<div className='home'>
			<div className='filters'>
				<h3>Фильтры</h3>
				<div className='filter-item'>
					<label>Марка</label>
					<input type='text' />
				</div>
				<div className='filter-item'>
					<label>Цена, ₽</label>
					<div>
						<input type='number' placeholder='От' />
						<input type='number' placeholder='До' />
					</div>
				</div>
				<div className='filter-item'>
					<label>Год выпуска</label>
					<div>
						<input type='number' placeholder='От' />
						<input type='number' placeholder='До' />
					</div>
				</div>
				<div className='filter-item'>
					<label>Пробег</label>
					<div>
						<input type='number' placeholder='От км' />
						<input type='number' placeholder='До км' />
					</div>
				</div>
				<div className='filter-item'>
					<label>Коробка передач</label>
					<div>
						<label>
							<input type='checkbox' /> Механика
						</label>
						<label>
							<input type='checkbox' /> Автоматическая
						</label>
					</div>
				</div>
				<div className='filter-item'>
					<label>Привод</label>
					<div>
						<label>
							<input type='checkbox' /> Задний
						</label>
						<label>
							<input type='checkbox' /> Передний
						</label>
						<label>
							<input type='checkbox' /> Полный
						</label>
					</div>
				</div>
			</div>
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
