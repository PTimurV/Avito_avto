import React, { useState } from 'react'
import { Form, Input, Button, Select, Upload, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import BrandDropdown from '../../components/BrandDropdown/BrandDropdown'
import ModelDropdown from '../../components/ModelDropdown/ModelDropdown'
import axios from 'axios'
import './CreateAd.css'

const { TextArea } = Input
const { Option } = Select

const CreateAd: React.FC = () => {
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const [fileList, setFileList] = useState<any[]>([])
	const [adDetails, setAdDetails] = useState<{
		car_type_id: string
		color_id: string
		VIN: string
		state_number: string
		manufacturer_id: string
		brand_id: number | null
		model_id: number | null
		release_year: string
		engine_type_id: string
		drive_id: string
		transmission_id: string
		mileage: string
		condition_id: string
		owners_by_PTS: string
		description: string
		adress: string
		price: string
	}>({
		car_type_id: '',
		color_id: '',
		VIN: '',
		state_number: '',
		manufacturer_id: '',
		brand_id: null,
		model_id: null,
		release_year: '',
		engine_type_id: '',
		drive_id: '',
		transmission_id: '',
		mileage: '',
		condition_id: '',
		owners_by_PTS: '',
		description: '',
		adress: '',
		price: '',
	})

	const handleChange = (key: string, value: any) => {
		setAdDetails(prevDetails => ({
			...prevDetails,
			[key]: value,
		}))
	}

	const handleBrandChange = (value: number, brandId: number) => {
		handleChange('brand_id', value)
		handleChange('model_id', brandId)
		handleChange('model', null) // Reset model when brand changes
	}

	const handleFileChange = ({ fileList }) => {
		setFileList(fileList)
	}

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields()
			const photos = await Promise.all(
				fileList.map(file => {
					return new Promise<string>((resolve, reject) => {
						const reader = new FileReader()
						reader.readAsDataURL(file.originFileObj)
						reader.onload = () => resolve(reader.result as string)
						reader.onerror = error => reject(error)
					})
				})
			)
			const requestData = { ...values, photos }
			const accessToken = localStorage.getItem('accessToken')
			if (accessToken) {
				const response = await axios.post(
					'http://localhost:3000/api/cars',
					requestData,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				const { id } = response.data
				if (id) {
					navigate(`/cars/${id}`)
				} else {
					notification.error({
						message: 'Ошибка',
						description: 'Не удалось получить ID созданного объявления',
					})
				}
			} else {
				console.error('Токен доступа не найден')
			}
		} catch (errorInfo) {
			console.log('Ошибка валидации или отправки:', errorInfo)
			notification.error({
				message: 'Ошибка',
				description: 'Произошла ошибка при создании объявления',
			})
		}
	}

	return (
		<div className='create-ad'>
			<h1>Разместить объявление</h1>
			<Form
				form={form}
				layout='vertical'
				onFinish={handleSubmit}
				initialValues={adDetails}
			>
				<Form.Item
					label='Тип автомобиля'
					name='car_type_id'
					rules={[{ required: true, message: 'Тип автомобиля обязателен' }]}
				>
					<Select onChange={value => handleChange('car_type_id', value)}>
						<Option value='1'>Новые</Option>
						<Option value='2'>С пробегом</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='Производитель'
					name='manufacturer_id'
					rules={[{ required: true, message: 'Производитель обязателен' }]}
				>
					<Select onChange={value => handleChange('manufacturer_id', value)}>
						<Option value='1'>Отечественные</Option>
						<Option value='2'>Китай</Option>
						<Option value='3'>Корея</Option>
						<Option value='4'>Япония</Option>
						<Option value='5'>Германия</Option>
						<Option value='6'>Франция</Option>
						<Option value='7'>Европа</Option>
						<Option value='8'>Азия</Option>
						<Option value='9'>Америка</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='Марка'
					name='brand_id'
					rules={[{ required: true, message: 'Марка обязательна' }]}
				>
					<BrandDropdown
						value={adDetails.brand_id}
						onChange={handleBrandChange}
					/>
				</Form.Item>
				<Form.Item
					label='Модель'
					name='model_id'
					rules={[{ required: true, message: 'Модель обязательна' }]}
				>
					<ModelDropdown
						brandId={adDetails.brand_id}
						value={adDetails.model_id}
						onChange={(value: number) => handleChange('model_id', value)}
					/>
				</Form.Item>
				<Form.Item
					label='Цена, ₽'
					name='price'
					rules={[{ required: true, message: 'Цена обязательна' }]}
				>
					<Input
						type='number'
						value={adDetails.price}
						onChange={e => handleChange('price', e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label='Год выпуска'
					name='release_year'
					rules={[{ required: true, message: 'Год выпуска обязателен' }]}
				>
					<Input
						type='number'
						value={adDetails.release_year}
						onChange={e => handleChange('release_year', e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label='Пробег, км'
					name='mileage'
					rules={[{ required: true, message: 'Пробег обязателен' }]}
				>
					<Input
						type='number'
						value={adDetails.mileage}
						onChange={e => handleChange('mileage', e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label='Коробка передач'
					name='transmission_id'
					rules={[{ required: true, message: 'Коробка передач обязательна' }]}
				>
					<Select onChange={value => handleChange('transmission_id', value)}>
						<Option value='1'>Механика</Option>
						<Option value='2'>Автоматическая</Option>
						<Option value='3'>Вариатор</Option>
						<Option value='4'>Робот</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='Привод'
					name='drive_id'
					rules={[{ required: true, message: 'Привод обязателен' }]}
				>
					<Select onChange={value => handleChange('drive_id', value)}>
						<Option value='1'>Задний</Option>
						<Option value='2'>Передний</Option>
						<Option value='3'>Полный</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='Тип двигателя'
					name='engine_type_id'
					rules={[{ required: true, message: 'Тип двигателя обязателен' }]}
				>
					<Select onChange={value => handleChange('engine_type_id', value)}>
						<Option value='1'>Бензин</Option>
						<Option value='2'>Газ</Option>
						<Option value='3'>Гибрид</Option>
						<Option value='4'>Дизель</Option>
						<Option value='5'>Электро</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='Владельцев по ПТС'
					name='owners_by_PTS'
					rules={[
						{ required: true, message: 'Количество владельцев обязательно' },
					]}
				>
					<Input
						type='number'
						value={adDetails.owners_by_PTS}
						onChange={e => handleChange('owners_by_PTS', e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label='Состояние'
					name='condition_id'
					rules={[{ required: true, message: 'Состояние обязательно' }]}
				>
					<Select onChange={value => handleChange('condition_id', value)}>
						<Option value='1'>Битая</Option>
						<Option value='2'>Целая</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='Цвет'
					name='color_id'
					rules={[{ required: true, message: 'Цвет обязателен' }]}
				>
					<Select onChange={value => handleChange('color_id', value)}>
						<Option value='1'>Белый</Option>
						<Option value='2'>Черный</Option>
						<Option value='3'>Серый</Option>
						<Option value='4'>Красный</Option>
						<Option value='5'>Желтый</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='VIN'
					name='VIN'
					rules={[{ required: true, message: 'VIN обязателен' }]}
				>
					<Input
						value={adDetails.VIN}
						onChange={e => handleChange('VIN', e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label='Автомобильный номер'
					name='state_number'
					rules={[
						{ required: true, message: 'Автомобильный номер обязателен' },
					]}
				>
					<Input
						value={adDetails.state_number}
						onChange={e => handleChange('state_number', e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label='Описание'
					name='description'
					rules={[{ required: true, message: 'Описание обязательно' }]}
				>
					<TextArea
						value={adDetails.description}
						onChange={e => handleChange('description', e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label='Адрес'
					name='adress'
					rules={[{ required: true, message: 'Адрес обязателен' }]}
				>
					<Input
						value={adDetails.adress}
						onChange={e => handleChange('adress', e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label='Фотографии'
					name='photos'
					rules={[
						{ required: true, message: 'Добавьте хотя бы одну фотографию' },
					]}
				>
					<Upload
						listType='picture-card'
						fileList={fileList}
						onChange={handleFileChange}
						beforeUpload={() => false} // prevent automatic upload
					>
						{fileList.length >= 10 ? null : (
							<div>
								<PlusOutlined />
								<div style={{ marginTop: 8 }}>Upload</div>
							</div>
						)}
					</Upload>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Разместить объявление
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default CreateAd
