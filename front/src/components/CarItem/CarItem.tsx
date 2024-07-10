import React, { useState } from 'react'
import { Card, Button, Modal } from 'antd'
import { Car } from '../../types'
import { useNavigate } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import MessageSender from '../../components/MessageSender/MessageSender'
import './CarItem.css'

interface CarItemProps {
	car: Car
	onClick: () => void
	isFavorite: boolean
	onFavoriteToggle: (carId: number) => void
}

const CarItem: React.FC<CarItemProps> = ({
	car,
	onClick,
	isFavorite,
	onFavoriteToggle,
}) => {
	const navigate = useNavigate()
	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const imageSrc =
		car.photos && car.photos.length > 0
			? car.photos[0]
			: '/images/placeholder.jpg'

	return (
		<Card className='car-item'>
			<div className='car-item__image' onClick={onClick}>
				<img src={imageSrc} alt='Car' />
			</div>
			<div className='car-item__details' onClick={onClick}>
				<h3>{`${car.brand} ${car.model} ${car.release_year}, ${car.mileage} км`}</h3>
				<p>{car.description}</p>
				<p>
					<strong>{car.price} ₽</strong>
				</p>
			</div>
			<div
				className='car-item__owner'
				onClick={() => navigate(`/profile/${car.user_id}`)}
			>
				<div className='car-item__owner-info'>
					<p>
						<strong>
							{car.user_name} {car.user_surname}
						</strong>
					</p>
					<p>{car.user_phone || 'Не указан'}</p>
				</div>
			</div>
			<div className='car-item__actions'>
				<Button type='primary'>Показать телефон</Button>
				<Button onClick={showModal}>Написать</Button>
			</div>
			<div
				className='car-item__favorite'
				onClick={() => onFavoriteToggle(car.id)}
			>
				{isFavorite ? (
					<HeartFilled style={{ color: 'red' }} />
				) : (
					<HeartOutlined />
				)}
			</div>
			<Modal
				title='Написать сообщение'
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<MessageSender receiverId={car.user_id.toString()} />
			</Modal>
		</Card>
	)
}

export default CarItem
