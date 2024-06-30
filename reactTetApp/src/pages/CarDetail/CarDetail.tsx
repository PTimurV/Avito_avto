import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './CarDetail.css'

interface CarDetail {
	id: number
	VIN: string
	state_number: string
	release_year: number
	mileage: number
	owners_by_PTS: number
	description: string
	adress: string
	price: string
	manufacturer: string
	car_type: string
	color: string
	brand: string
	model: string
	engine_type: string
	drive: string
	transmission: string
	condition: string
	user_name: string
	user_surname: string
	user_phone: string | null
}

const CarDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [car, setCar] = useState<CarDetail | null>(null)

	useEffect(() => {
		axios
			.get(`http://localhost:3000/api/cars/${id}`)
			.then(response => setCar(response.data))
			.catch(error => console.error('Ошибка при получении данных:', error))
	}, [id])

	if (!car) {
		return <div>Загрузка...</div>
	}

	return (
		<div className='car-detail'>
			<div className='car-detail__images'>
				{/* Здесь будут заглушки для изображений */}
				<img src='/images/placeholder.jpg' alt='Car' />
				<img src='/images/placeholder.jpg' alt='Car' />
			</div>
			<div className='car-detail__info'>
				<h1>{`${car.brand} ${car.model} ${car.release_year}, ${car.mileage} км`}</h1>
				<h2>{`${car.price} ₽`}</h2>
				<p>{car.description}</p>
			</div>
			<div className='car-detail__characteristics'>
				<h3>Характеристики</h3>
				<ul>
					<li>
						<strong>Год выпуска:</strong> {car.release_year}
					</li>
					<li>
						<strong>Объем двигателя:</strong> {car.engine_type}
					</li>
					<li>
						<strong>Тип топлива:</strong> {car.engine_type}
					</li>
					<li>
						<strong>Коробка передач:</strong> {car.transmission}
					</li>
					<li>
						<strong>Привод:</strong> {car.drive}
					</li>
					<li>
						<strong>Цвет:</strong> {car.color}
					</li>
					<li>
						<strong>Состояние:</strong> {car.condition}
					</li>
					<li>
						<strong>Владельцы по ПТС:</strong> {car.owners_by_PTS}
					</li>
					<li>
						<strong>VIN:</strong> {car.VIN}
					</li>
					<li>
						<strong>Производитель:</strong> {car.manufacturer}
					</li>
					<li>
						<strong>Тип автомобиля:</strong> {car.car_type}
					</li>
				</ul>
			</div>
			<div className='car-detail__location'>
				<h3>Расположение</h3>
				<p>{car.adress}</p>
			</div>
			<div className='car-detail__description'>
				<h3>Описание</h3>
				<p>{car.description}</p>
			</div>
		</div>
	)
}

export default CarDetail
