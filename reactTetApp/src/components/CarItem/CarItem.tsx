import React from 'react'
import { Card, Button } from 'antd'
import { Car } from '../../types'
import './CarItem.css'

const CarItem = ({ car, onClick }: { car: Car; onClick: () => void }) => {
	return (
		<Card className='car-item' onClick={onClick}>
			<div className='car-item__image'>
				<img src='/images/placeholder.jpg' alt='Car' />
			</div>
			<div className='car-item__details'>
				<h3>{`${car.brand} ${car.model} ${car.release_year}, ${car.mileage} км`}</h3>
				<p>{car.description}</p>
				<p>
					<strong>{car.price} ₽</strong>
				</p>
				<div className='car-item__actions'>
					<Button type='primary'>Показать телефон</Button>
					<Button>Написать</Button>
				</div>
			</div>
		</Card>
	)
}

export default CarItem
