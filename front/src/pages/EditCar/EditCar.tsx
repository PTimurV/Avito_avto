import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Car } from '../../types'
import './EditCar.css'
const { Option } = Select
import useAxios from '../../AxiosHook/useAxios'
import withErrorBoundary from '../../components/Hoc/withErrorBoundary'

const EditCar: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [car, setCar] = useState<Car | null>(null)

	// Предзаполнение значений для селектов
	const manufacturers = [
		{ id: 1, name: 'Отечественные' },
		{ id: 2, name: 'Китай' },
		{ id: 3, name: 'Корея' },
		{ id: 4, name: 'Япония' },
		{ id: 5, name: 'Германия' },
		{ id: 6, name: 'Франция' },
		{ id: 7, name: 'Европа' },
		{ id: 8, name: 'Азия' },
		{ id: 9, name: 'Америка' },
	]
	const carTypes = [
		{ id: 1, name: 'С пробегом' },
		{ id: 2, name: 'Новые' },
	]
	const colors = [
		{ id: 1, name: 'Белый' },
		{ id: 2, name: 'Черный' },
		{ id: 3, name: 'Серый' },
		{ id: 4, name: 'Красный' },
		{ id: 5, name: 'Желтый' },
	]
	const brands = [
		{ id: 1, name: 'Audi' },
		{ id: 2, name: 'BMW' },
		// Добавьте остальные значения
	]
	const models = [
		{ id: 1, name: 'Q7' },
		{ id: 2, name: 'X5' },
		// Добавьте остальные значения
	]
	const engineTypes = [
		{ id: 1, name: 'Бензин' },
		{ id: 2, name: 'Газ' },
		{ id: 3, name: 'Гибрид' },
		{ id: 4, name: 'Дизель' },
		{ id: 5, name: 'Электро' },
	]
	const drives = [
		{ id: 1, name: 'Задний' },
		{ id: 2, name: 'Передний' },
		{ id: 3, name: 'Полный' },
	]
	const transmissions = [
		{ id: 1, name: 'Механика' },
		{ id: 2, name: 'Автомат' },
		{ id: 3, name: 'Вариатор' },
		{ id: 4, name: 'Робот' },
	]
	const conditions = [
		{ id: 1, name: 'Битый' },
		{ id: 2, name: 'Кроме целых' },
	]
	const { get, put } = useAxios()

	useEffect(() => {
		const fetchCar = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (!accessToken) {
					throw new Error('Нет токена доступа')
				}

				const data = await get(`/cars/${id}/edit`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				setCar(data)
			} catch (error) {
				console.error('Ошибка при получении данных автомобиля:', error)
			}
		}

		fetchCar()
	}, [id])

	const handleFinish = async (values: any) => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			if (!accessToken) {
				throw new Error('Нет токена доступа')
			}

			await put(
				`/cars/${id}`,
				{
					...values,
					car_type_id: values.car_type,
					color_id: values.color,
					manufacturer_id: values.manufacturer,
					brand_id: values.brand,
					model_id: values.model,
					engine_type_id: values.engine_type,
					drive_id: values.drive,
					transmission_id: values.transmission,
					condition_id: values.condition,
					photos: car?.photos || [],
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			navigate(`/cars/${id}`)
		} catch (error) {
			console.error('Ошибка при сохранении изменений:', error)
		}
	}

	if (!car) {
		return <div>Загрузка...</div>
	}

	return (
		<div className='edit-car'>
			<h1>Редактировать автомобиль</h1>
			<Form
				layout='vertical'
				initialValues={{
					...car,
					car_type: car.car_type_id,
					color: car.color_id,
					manufacturer: car.manufacturer_id,
					brand: car.brand_id,
					model: car.model_id,
					engine_type: car.engine_type_id,
					drive: car.drive_id,
					transmission: car.transmission_id,
					condition: car.condition_id,
				}}
				onFinish={handleFinish}
			>
				<Form.Item label='VIN' name='VIN'>
					<Input />
				</Form.Item>
				<Form.Item label='Автомобильный номер' name='state_number'>
					<Input />
				</Form.Item>
				<Form.Item label='Год выпуска' name='release_year'>
					<Input type='number' />
				</Form.Item>
				<Form.Item label='Пробег' name='mileage'>
					<Input type='number' />
				</Form.Item>
				<Form.Item label='Количество владельцев по ПТС' name='owners_by_PTS'>
					<Input type='number' />
				</Form.Item>
				<Form.Item label='Описание' name='description'>
					<Input.TextArea />
				</Form.Item>
				<Form.Item label='Адрес' name='adress'>
					<Input />
				</Form.Item>
				<Form.Item label='Цена' name='price'>
					<Input type='number' />
				</Form.Item>
				<Form.Item label='Производитель' name='manufacturer'>
					<Select>
						{manufacturers.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Тип автомобиля' name='car_type'>
					<Select>
						{carTypes.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Цвет' name='color'>
					<Select>
						{colors.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Марка' name='brand'>
					<Select>
						{brands.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Модель' name='model'>
					<Select>
						{models.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Тип двигателя' name='engine_type'>
					<Select>
						{engineTypes.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Привод' name='drive'>
					<Select>
						{drives.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Коробка передач' name='transmission'>
					<Select>
						{transmissions.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Состояние' name='condition'>
					<Select>
						{conditions.map(option => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Фотографии' name='photos'>
					<Upload
						listType='picture'
						multiple
						defaultFileList={car.photos.map((photo, index) => ({
							uid: index.toString(),
							name: `image${index + 1}.png`,
							status: 'done',
							url: photo,
						}))}
						beforeUpload={file => {
							const reader = new FileReader()
							reader.readAsDataURL(file)
							reader.onload = () => {
								if (car) {
									const updatedPhotos = [...car.photos, reader.result as string]
									setCar({ ...car, photos: updatedPhotos })
								}
							}
							return false
						}}
						onRemove={file => {
							if (car) {
								const updatedPhotos = car.photos.filter(
									photo => photo !== file.url
								)
								setCar({ ...car, photos: updatedPhotos })
							}
						}}
					>
						<Button icon={<UploadOutlined />}>Загрузить фотографии</Button>
					</Upload>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Сохранить изменения
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default withErrorBoundary(EditCar)
