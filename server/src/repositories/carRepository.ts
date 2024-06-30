import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

export const createCar = async (carData: any) => {
	await db('cars').insert(carData)
}

export const getAllCars = async (filters: any) => {
	try {
		const query = db('cars as c')
			.select(
				'c.id',
				'c.VIN',
				'c.state_number',
				'c.release_year',
				'c.mileage',
				'c.owners_by_PTS',
				'c.description',
				'c.adress',
				'c.price',
				'manufacturer.name as manufacturer',
				'car_type.type as car_type',
				'color.name as color',
				'brand.name as brand',
				'model.name as model',
				'engine_type.name as engine_type',
				'drive.name as drive',
				'transmission.name as transmission',
				'condition.name as condition',
				'users.name as user_name',
				'users.surname as user_surname',
				'users.phone as user_phone'
			)
			.leftJoin('car_type', 'c.car_type_id', 'car_type.id')
			.leftJoin('color', 'c.color_id', 'color.id')
			.leftJoin('brand', 'c.brand_id', 'brand.id')
			.leftJoin('model', 'c.model_id', 'model.id')
			.leftJoin('engine_type', 'c.engine_type_id', 'engine_type.id')
			.leftJoin('drive', 'c.drive_id', 'drive.id')
			.leftJoin('transmission', 'c.transmission_id', 'transmission.id')
			.leftJoin('condition', 'c.condition_id', 'condition.id')
			.leftJoin('users', 'c.user_id', 'users.id')
			.leftJoin('manufacturer', 'c.manufacturer_id', 'manufacturer.id')

		// Фильтры
		if (filters.release_year_from) {
			query.where('c.release_year', '>=', Number(filters.release_year_from))
		}
		if (filters.release_year_to) {
			query.where('c.release_year', '<=', Number(filters.release_year_to))
		}
		if (filters.mileage_from) {
			query.where('c.mileage', '>=', Number(filters.mileage_from))
		}
		if (filters.mileage_to) {
			query.where('c.mileage', '<=', Number(filters.mileage_to))
		}
		if (filters.owners_by_PTS_from) {
			query.where('c.owners_by_PTS', '>=', Number(filters.owners_by_PTS_from))
		}
		if (filters.owners_by_PTS_to) {
			query.where('c.owners_by_PTS', '<=', Number(filters.owners_by_PTS_to))
		}
		if (filters.price_from) {
			query.where('c.price', '>=', Number(filters.price_from))
		}
		if (filters.price_to) {
			query.where('c.price', '<=', Number(filters.price_to))
		}
		if (filters.car_type) {
			query.where('c.car_type_id', '=', Number(filters.car_type))
		}
		if (filters.color) {
			query.where('c.color_id', '=', Number(filters.color))
		}
		if (filters.brand) {
			query.where('c.brand_id', '=', Number(filters.brand))
		}
		if (filters.model) {
			query.where('c.model_id', '=', Number(filters.model))
		}
		if (filters.manufacturer) {
			const manufacturers = filters.manufacturer.split(',').map(Number)
			query.whereIn('c.manufacturer_id', manufacturers)
		}
		if (filters.engine_type) {
			query.where('c.engine_type_id', '=', Number(filters.engine_type))
		}
		if (filters.drive) {
			query.where('c.drive_id', '=', Number(filters.drive))
		}
		if (filters.transmission) {
			query.where('c.transmission_id', '=', Number(filters.transmission))
		}
		if (filters.condition) {
			query.where('c.condition_id', '=', Number(filters.condition))
		}

		return await query
	} catch (error) {
		console.error('Ошибка при получении автомобилей:', error)
		throw error
	}
}

export const getCarById = async (id: number) => {
	return await db('cars')
		.select(
			'cars.id',
			'VIN',
			'state_number',
			'release_year',
			'mileage',
			'owners_by_PTS',
			'description',
			'adress',
			'price',
			'manufacturer.name as manufacturer',
			'car_type.type as car_type',
			'color.name as color',
			'brand.name as brand',
			'model.name as model',
			'engine_type.name as engine_type',
			'drive.name as drive',
			'transmission.name as transmission',
			'condition.name as condition',
			'users.name as user_name',
			'users.surname as user_surname',
			'users.phone as user_phone'
		)
		.leftJoin('manufacturer', 'cars.manufacturer_id', 'manufacturer.id')
		.leftJoin('car_type', 'cars.car_type_id', 'car_type.id')
		.leftJoin('color', 'cars.color_id', 'color.id')
		.leftJoin('brand', 'cars.brand_id', 'brand.id')
		.leftJoin('model', 'cars.model_id', 'model.id')
		.leftJoin('engine_type', 'cars.engine_type_id', 'engine_type.id')
		.leftJoin('drive', 'cars.drive_id', 'drive.id')
		.leftJoin('transmission', 'cars.transmission_id', 'transmission.id')
		.leftJoin('condition', 'cars.condition_id', 'condition.id')
		.leftJoin('users', 'cars.user_id', 'users.id')
		.where('cars.id', id)
		.first()
}
