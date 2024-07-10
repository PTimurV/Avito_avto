import React, { useState, useEffect } from 'react'
import BrandDropdown from '../BrandDropdown/BrandDropdown'
import ModelDropdown from '../ModelDropdown/ModelDropdown'
import axios from 'axios'
import './Filters.css'

interface FiltersProps {
	onFiltersChange: (filters: any) => void
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
	const [filters, setFilters] = useState<{
		carType: string
		manufacturer: string[]
		brand: number | null
		brandId: number | null
		model: number | null
		priceFrom: string
		priceTo: string
		yearFrom: string
		yearTo: string
		mileageFrom: string
		mileageTo: string
		transmission: string[]
		drive: string[]
		engineType: string[]
		ownersFrom: string
		ownersTo: string
		registration: string
		condition: string
		color: string
		search: string
	}>({
		carType: '',
		manufacturer: [],
		brand: null,
		brandId: null,
		model: null,
		priceFrom: '',
		priceTo: '',
		yearFrom: '',
		yearTo: '',
		mileageFrom: '',
		mileageTo: '',
		transmission: [],
		drive: [],
		engineType: [],
		ownersFrom: '',
		ownersTo: '',
		registration: '',
		condition: '',
		color: '',
		search: '',
	})

	useEffect(() => {
		console.log('Filters component updated:', filters)
	}, [filters])

	const handleFilterChange = (key: string, value: any) => {
		setFilters(prevFilters => {
			const updatedFilters = { ...prevFilters, [key]: value }
			console.log('Updated filters:', updatedFilters)
			onFiltersChange(updatedFilters)
			return updatedFilters
		})
	}

	const handleBrandChange = (value: number, brandId: number) => {
		handleFilterChange('brand', value)
		handleFilterChange('brandId', brandId)
		handleFilterChange('model', null) // Reset model when brand changes
	}
	const resetFilters = () => {
		const initialFilters = {
			carType: '',
			manufacturer: [],
			brand: null,
			brandId: null,
			model: null,
			priceFrom: '',
			priceTo: '',
			yearFrom: '',
			yearTo: '',
			mileageFrom: '',
			mileageTo: '',
			transmission: [],
			drive: [],
			engineType: [],
			ownersFrom: '',
			ownersTo: '',
			registration: '',
			condition: '',
			color: '',
			search: '',
		}
		setFilters(initialFilters)
		onFiltersChange(initialFilters)
	}

	return (
		<div className='filters'>
			<button onClick={resetFilters}>Сбросить</button>
			<div className='filter-item'>
				<label>Поиск</label>
				<input
					type='text'
					placeholder='Введите текст для поиска'
					onChange={e => handleFilterChange('search', e.target.value)}
				/>
			</div>

			<h3>Фильтры</h3>

			<div className='filter-item'>
				<label>Тип автомобиля</label>
				<div>
					<label>
						<input
							type='radio'
							name='car_type'
							onChange={() => handleFilterChange('carType', '')}
						/>{' '}
						Все
					</label>
					<label>
						<input
							type='radio'
							name='car_type'
							onChange={() => handleFilterChange('carType', '1')}
						/>{' '}
						С пробегом
					</label>
					<label>
						<input
							type='radio'
							name='car_type'
							onChange={() => handleFilterChange('carType', '2')}
						/>{' '}
						Новые
					</label>
				</div>
			</div>
			<div className='filter-item'>
				<label>Производитель</label>
				<div>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '1']
										: filters.manufacturer.filter(item => item !== '1')
								)
							}
						/>{' '}
						Отечественные
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '2']
										: filters.manufacturer.filter(item => item !== '2')
								)
							}
						/>{' '}
						Китай
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '3']
										: filters.manufacturer.filter(item => item !== '3')
								)
							}
						/>{' '}
						Корея
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '4']
										: filters.manufacturer.filter(item => item !== '4')
								)
							}
						/>{' '}
						Япония
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '5']
										: filters.manufacturer.filter(item => item !== '5')
								)
							}
						/>{' '}
						Германия
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '6']
										: filters.manufacturer.filter(item => item !== '6')
								)
							}
						/>{' '}
						Франция
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '7']
										: filters.manufacturer.filter(item => item !== '7')
								)
							}
						/>{' '}
						Европа
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '8']
										: filters.manufacturer.filter(item => item !== '8')
								)
							}
						/>{' '}
						Азия
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'manufacturer',
									e.target.checked
										? [...filters.manufacturer, '9']
										: filters.manufacturer.filter(item => item !== '9')
								)
							}
						/>{' '}
						Америка
					</label>
				</div>
			</div>
			<div className='filter-item'>
				<label>Марка</label>
				<BrandDropdown value={filters.brand} onChange={handleBrandChange} />
			</div>
			<div className='filter-item'>
				<label>Модель</label>
				<ModelDropdown
					brandId={filters.brandId}
					value={filters.model}
					onChange={(value: number) => handleFilterChange('model', value)}
				/>
			</div>
			<div className='filter-item'>
				<label>Цена, ₽</label>
				<div>
					<input
						type='number'
						placeholder='От'
						onChange={e => handleFilterChange('priceFrom', e.target.value)}
					/>
					<input
						type='number'
						placeholder='До'
						onChange={e => handleFilterChange('priceTo', e.target.value)}
					/>
				</div>
			</div>
			<div className='filter-item'>
				<label>Год выпуска</label>
				<div>
					<input
						type='number'
						placeholder='От'
						onChange={e => handleFilterChange('yearFrom', e.target.value)}
					/>
					<input
						type='number'
						placeholder='До'
						onChange={e => handleFilterChange('yearTo', e.target.value)}
					/>
				</div>
			</div>
			<div className='filter-item'>
				<label>Пробег</label>
				<div>
					<input
						type='number'
						placeholder='От км'
						onChange={e => handleFilterChange('mileageFrom', e.target.value)}
					/>
					<input
						type='number'
						placeholder='До км'
						onChange={e => handleFilterChange('mileageTo', e.target.value)}
					/>
				</div>
			</div>
			<div className='filter-item'>
				<label>Коробка передач</label>
				<div>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'transmission',
									e.target.checked
										? [...filters.transmission, '1']
										: filters.transmission.filter(item => item !== '1')
								)
							}
						/>{' '}
						Механика
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'transmission',
									e.target.checked
										? [...filters.transmission, '2']
										: filters.transmission.filter(item => item !== '2')
								)
							}
						/>{' '}
						Автоматическая
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'transmission',
									e.target.checked
										? [...filters.transmission, '3']
										: filters.transmission.filter(item => item !== '3')
								)
							}
						/>{' '}
						Вариатор
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'transmission',
									e.target.checked
										? [...filters.transmission, '4']
										: filters.transmission.filter(item => item !== '4')
								)
							}
						/>{' '}
						Робот
					</label>
				</div>
			</div>
			<div className='filter-item'>
				<label>Привод</label>
				<div>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'drive',
									e.target.checked
										? [...filters.drive, '1']
										: filters.drive.filter(item => item !== '1')
								)
							}
						/>{' '}
						Задний
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'drive',
									e.target.checked
										? [...filters.drive, '2']
										: filters.drive.filter(item => item !== '2')
								)
							}
						/>{' '}
						Передний
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'drive',
									e.target.checked
										? [...filters.drive, '3']
										: filters.drive.filter(item => item !== '3')
								)
							}
						/>{' '}
						Полный
					</label>
				</div>
			</div>
			<div className='filter-item'>
				<label>Тип двигателя</label>
				<div>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'engineType',
									e.target.checked
										? [...filters.engineType, '1']
										: filters.engineType.filter(item => item !== '1')
								)
							}
						/>{' '}
						Бензин
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'engineType',
									e.target.checked
										? [...filters.engineType, '2']
										: filters.engineType.filter(item => item !== '2')
								)
							}
						/>{' '}
						Газ
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'engineType',
									e.target.checked
										? [...filters.engineType, '3']
										: filters.engineType.filter(item => item !== '3')
								)
							}
						/>{' '}
						Гибрид
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'engineType',
									e.target.checked
										? [...filters.engineType, '4']
										: filters.engineType.filter(item => item !== '4')
								)
							}
						/>{' '}
						Дизель
					</label>
					<label>
						<input
							type='checkbox'
							onChange={e =>
								handleFilterChange(
									'engineType',
									e.target.checked
										? [...filters.engineType, '5']
										: filters.engineType.filter(item => item !== '5')
								)
							}
						/>{' '}
						Электро
					</label>
				</div>
			</div>
			<div className='filter-item'>
				<label>Владельцев по ПТС</label>
				<div>
					<input
						type='number'
						placeholder='От'
						onChange={e => handleFilterChange('ownersFrom', e.target.value)}
					/>
					<input
						type='number'
						placeholder='До'
						onChange={e => handleFilterChange('ownersTo', e.target.value)}
					/>
				</div>
			</div>
			<div className='filter-item'>
				<label>Состояние</label>
				<div>
					<label>
						<input
							type='radio'
							name='condition'
							onChange={() => handleFilterChange('condition', '')}
						/>{' '}
						Все
					</label>
					<label>
						<input
							type='radio'
							name='condition'
							onChange={() => handleFilterChange('condition', '1')}
						/>{' '}
						Битые
					</label>
					<label>
						<input
							type='radio'
							name='condition'
							onChange={() => handleFilterChange('condition', '2')}
						/>{' '}
						Кроме битых
					</label>
				</div>
			</div>
			<div className='filter-item'>
				<label>Цвет</label>
				<div>
					<label>
						<input
							type='radio'
							name='color'
							onChange={() => handleFilterChange('color', '1')}
						/>{' '}
						Белый
					</label>
					<label>
						<input
							type='radio'
							name='color'
							onChange={() => handleFilterChange('color', '2')}
						/>{' '}
						Черный
					</label>
					<label>
						<input
							type='radio'
							name='color'
							onChange={() => handleFilterChange('color', '3')}
						/>{' '}
						Серый
					</label>
					<label>
						<input
							type='radio'
							name='color'
							onChange={() => handleFilterChange('color', '4')}
						/>{' '}
						Красный
					</label>
					<label>
						<input
							type='radio'
							name='color'
							onChange={() => handleFilterChange('color', '5')}
						/>{' '}
						Желтый
					</label>
				</div>
			</div>
		</div>
	)
}

export default Filters
