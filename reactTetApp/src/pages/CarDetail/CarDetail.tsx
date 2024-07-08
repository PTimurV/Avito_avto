import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MessageSender from '../../components/MessageSender/MessageSender'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import './CarDetail.css'
import AIChat from '../../components/AIChat/AIChat'

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
	user_id: number
	photos: string[]
}

interface VinInfo {
	ErrorText?: string
	VehicleDescriptor?: string
	Trim?: string
	BodyClass?: string
	Doors?: string
	GrossVehicleWeightRatingFrom?: string
	GrossVehicleWeightRatingTo?: string
	EngineNumberOfCylinders?: string
	DisplacementCC?: string
	DisplacementL?: string
	FuelTypePrimary?: string
	TransmissionStyle?: string
	TransmissionSpeeds?: string
	ValveTrainDesign?: string
	EngineConfiguration?: string
	EngineBrakeHPFrom?: string
	FrontAirBagLocations?: string
	SideAirBagLocations?: string
}

const CarDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [car, setCar] = useState<CarDetail | null>(null)
	const [vinInfo, setVinInfo] = useState<VinInfo | null>(null)
	const [isFavorite, setIsFavorite] = useState<boolean>(false)

	const fetchCar = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/api/cars/${id}`)
			setCar(response.data)

			const accessToken = localStorage.getItem('accessToken')
			if (accessToken) {
				await axios.post(
					'http://localhost:3000/api/view-history/add',
					{ carId: id },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				const favoritesResponse = await axios.get(
					'http://localhost:3000/api/favorites/user',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				const favoriteCars = favoritesResponse.data.map(
					(favorite: any) => favorite.id
				)
				setIsFavorite(favoriteCars.includes(parseInt(id)))
			}

			if (response.data.VIN) {
				const vinResponse = await axios.get(
					`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${response.data.VIN}?format=json`
				)
				const vinData = vinResponse.data.Results

				const vinInfo: VinInfo = {
					ErrorText: vinData.find((item: any) => item.Variable === 'Error Text')
						?.Value,
					VehicleDescriptor: vinData.find(
						(item: any) => item.Variable === 'Vehicle Descriptor'
					)?.Value,
					Trim: vinData.find((item: any) => item.Variable === 'Trim')?.Value,
					BodyClass: vinData.find((item: any) => item.Variable === 'Body Class')
						?.Value,
					Doors: vinData.find((item: any) => item.Variable === 'Doors')?.Value,
					GrossVehicleWeightRatingFrom: vinData.find(
						(item: any) => item.Variable === 'Gross Vehicle Weight Rating From'
					)?.Value,
					GrossVehicleWeightRatingTo: vinData.find(
						(item: any) => item.Variable === 'Gross Vehicle Weight Rating To'
					)?.Value,
					EngineNumberOfCylinders: vinData.find(
						(item: any) => item.Variable === 'Engine Number of Cylinders'
					)?.Value,
					DisplacementCC: vinData.find(
						(item: any) => item.Variable === 'Displacement (CC)'
					)?.Value,
					DisplacementL: vinData.find(
						(item: any) => item.Variable === 'Displacement (L)'
					)?.Value,
					FuelTypePrimary: vinData.find(
						(item: any) => item.Variable === 'Fuel Type - Primary'
					)?.Value,
					TransmissionStyle: vinData.find(
						(item: any) => item.Variable === 'Transmission Style'
					)?.Value,
					TransmissionSpeeds: vinData.find(
						(item: any) => item.Variable === 'Transmission Speeds'
					)?.Value,
					ValveTrainDesign: vinData.find(
						(item: any) => item.Variable === 'Valve Train Design'
					)?.Value,
					EngineConfiguration: vinData.find(
						(item: any) => item.Variable === 'Engine Configuration'
					)?.Value,
					EngineBrakeHPFrom: vinData.find(
						(item: any) => item.Variable === 'Engine Brake (hp) From'
					)?.Value,
					FrontAirBagLocations: vinData.find(
						(item: any) => item.Variable === 'Front Air Bag Locations'
					)?.Value,
					SideAirBagLocations: vinData.find(
						(item: any) => item.Variable === 'Side Air Bag Locations'
					)?.Value,
				}
				setVinInfo(vinInfo)
			}
		} catch (error) {
			console.error('Ошибка при получении данных:', error)
		}
	}

	const toggleFavorite = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			if (!accessToken) {
				throw new Error('Нет токена доступа')
			}

			if (isFavorite) {
				await axios.post(
					'http://localhost:3000/api/favorites/remove',
					{ carId: id },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setIsFavorite(false)
			} else {
				await axios.post(
					'http://localhost:3000/api/favorites/add',
					{ carId: id },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setIsFavorite(true)
			}
		} catch (error) {
			console.error('Ошибка при изменении избранного:', error)
		}
	}

	useEffect(() => {
		fetchCar()
	}, [id])

	if (!car) {
		return <div>Загрузка...</div>
	}

	return (
		<div className='car-detail'>
			<div className='car-detail__images'>
				{car.photos.length > 0 ? (
					car.photos.map((photo, index) => (
						<img key={index} src={photo} alt={`Car ${index + 1}`} />
					))
				) : (
					<>
						<img src='/images/placeholder.jpg' alt='Car' />
						<img src='/images/placeholder.jpg' alt='Car' />
					</>
				)}
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
						<strong>Тип двигателя:</strong> {car.engine_type}
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
			{vinInfo && (
				<div className='car-detail__vin-info'>
					<h3>Информация по VIN</h3>
					<ul>
						{vinInfo.ErrorText && (
							<li>
								<strong>Текст ошибки:</strong> {vinInfo.ErrorText}
							</li>
						)}
						{vinInfo.VehicleDescriptor && (
							<li>
								<strong>Описание транспортного средства:</strong>{' '}
								{vinInfo.VehicleDescriptor}
							</li>
						)}
						{vinInfo.Trim && (
							<li>
								<strong>Комплектация:</strong> {vinInfo.Trim}
							</li>
						)}
						{vinInfo.BodyClass && (
							<li>
								<strong>Класс кузова:</strong> {vinInfo.BodyClass}
							</li>
						)}
						{vinInfo.Doors && (
							<li>
								<strong>Количество дверей:</strong> {vinInfo.Doors}
							</li>
						)}
						{vinInfo.GrossVehicleWeightRatingFrom && (
							<li>
								<strong>Рейтинг полной массы (начало):</strong>{' '}
								{vinInfo.GrossVehicleWeightRatingFrom}
							</li>
						)}
						{vinInfo.GrossVehicleWeightRatingTo && (
							<li>
								<strong>Рейтинг полной массы (конец):</strong>{' '}
								{vinInfo.GrossVehicleWeightRatingTo}
							</li>
						)}
						{vinInfo.EngineNumberOfCylinders && (
							<li>
								<strong>Количество цилиндров:</strong>{' '}
								{vinInfo.EngineNumberOfCylinders}
							</li>
						)}
						{vinInfo.DisplacementCC && (
							<li>
								<strong>Объем двигателя (CC):</strong> {vinInfo.DisplacementCC}
							</li>
						)}
						{vinInfo.DisplacementL && (
							<li>
								<strong>Объем двигателя (L):</strong> {vinInfo.DisplacementL}
							</li>
						)}
						{vinInfo.FuelTypePrimary && (
							<li>
								<strong>Тип топлива:</strong> {vinInfo.FuelTypePrimary}
							</li>
						)}
						{vinInfo.TransmissionStyle && (
							<li>
								<strong>Тип трансмиссии:</strong> {vinInfo.TransmissionStyle}
							</li>
						)}
						{vinInfo.TransmissionSpeeds && (
							<li>
								<strong>Количество передач:</strong>{' '}
								{vinInfo.TransmissionSpeeds}
							</li>
						)}
						{vinInfo.ValveTrainDesign && (
							<li>
								<strong>Дизайн клапанного механизма:</strong>{' '}
								{vinInfo.ValveTrainDesign}
							</li>
						)}
						{vinInfo.EngineConfiguration && (
							<li>
								<strong>Конфигурация двигателя:</strong>{' '}
								{vinInfo.EngineConfiguration}
							</li>
						)}
						{vinInfo.EngineBrakeHPFrom && (
							<li>
								<strong>Мощность двигателя (HP):</strong>{' '}
								{vinInfo.EngineBrakeHPFrom}
							</li>
						)}
						{vinInfo.FrontAirBagLocations && (
							<li>
								<strong>Передние подушки безопасности:</strong>{' '}
								{vinInfo.FrontAirBagLocations}
							</li>
						)}
						{vinInfo.SideAirBagLocations && (
							<li>
								<strong>Боковые подушки безопасности:</strong>{' '}
								{vinInfo.SideAirBagLocations}
							</li>
						)}
					</ul>
				</div>
			)}
			<div className='car-detail__location'>
				<h3>Расположение</h3>
				<p>{car.adress}</p>
			</div>
			<div className='car-detail__description'>
				<h3>Описание</h3>
				<p>{car.description}</p>
			</div>
			<div
				className='car-detail__owner'
				onClick={() => navigate(`/profile/${car.user_id}`)}
			>
				<h3>Владелец объявления</h3>
				<p>
					<strong>Имя:</strong> {car.user_name} {car.user_surname}
				</p>
				<p>
					<strong>Телефон:</strong> {car.user_phone || 'Не указан'}
				</p>
			</div>
			<div className='car-detail__actions'>
				<div className='car-detail__favorite' onClick={toggleFavorite}>
					{isFavorite ? (
						<HeartFilled style={{ color: 'red' }} />
					) : (
						<HeartOutlined />
					)}
				</div>
				<MessageSender receiverId={car.user_id.toString()} />
			</div>
			<div className='car-detail__ai-chat'>
				<h3>Чат с ИИ</h3>
				<AIChat
					context={`У меня есть сайт и на нем есть пользователи, которые отправляют тебе запросы. Этот пользователь спрашивает о машине ${car.brand} ${car.model} ${car.release_year} года. ОТВЕЧАЙ ЕМУ НА РУССКОМ`}
				/>
			</div>
		</div>
	)
}

export default CarDetail
