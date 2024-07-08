import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

interface CarData {
	user_id: number
	car_type_id: number
	color_id: number
	VIN: string
	state_number: string
	manufacturer_id: number
	brand_id: number
	model_id: number
	release_year: number
	engine_type_id: number
	drive_id: number
	transmission_id: number
	mileage: number
	condition_id: number
	owners_by_PTS: number
	description: string
	adress: string
	price: number
}

export const createCar = async (carData: CarData) => {
	const [car] = await db('cars').insert(carData).returning('*')
	return car
}

export const addCarPhotos = async (carId: number, photos: string[]) => {
	const photoData = photos.map(photo => ({ cars_id: carId, img: photo }))
	await db('cars_photo').insert(photoData)
}

export const getAllCars = async (
	filters: any,
	limit: number,
	offset: number
) => {
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
				'users.phone as user_phone',
				'users.id as user_id'
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
			.limit(limit)
			.offset(offset)

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

		if (filters.search) {
			query.where(builder => {
				builder

					.where('brand.name', 'ilike', `%${filters.search}%`)
					.orWhere('model.name', 'ilike', `%${filters.search}%`)
					.orWhere('description', 'ilike', `%${filters.search}%`)
					.orWhere('adress', 'ilike', `%${filters.search}%`)
			})
		}

		const cars = await query

		// Get photos for each car
		for (const car of cars) {
			const photos = await db('cars_photo')
				.select('img')
				.where('cars_id', car.id)
			car.photos = photos.map(photo => photo.img)
		}

		return cars
	} catch (error) {
		console.error('Ошибка при получении автомобилей:', error)
		throw error
	}
}

export const countAllCars = async (filters: any) => {
	try {
		const query = db('cars as c')
			.leftJoin('brand', 'c.brand_id', 'brand.id')
			.leftJoin('model', 'c.model_id', 'model.id')

		// Применение фильтров
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
		if (filters.search) {
			query.where(builder => {
				builder
					.where('brand.name', 'ilike', `%${filters.search}%`)
					.orWhere('model.name', 'ilike', `%${filters.search}%`)
					.orWhere('description', 'ilike', `%${filters.search}%`)
					.orWhere('adress', 'ilike', `%${filters.search}%`)
			})
		}

		const result = await query.count({ total: '*' }).first()
		return result ? result.total : 0
	} catch (error) {
		console.error('Ошибка при подсчете автомобилей:', error)
		throw error
	}
}
export const getCarById = async (id: number) => {
	try {
		const car = await db('cars')
			.select(
				'cars.id',
				'cars.VIN',
				'cars.state_number',
				'cars.release_year',
				'cars.mileage',
				'cars.owners_by_PTS',
				'cars.description',
				'cars.adress',
				'cars.price',
				'cars.manufacturer_id',
				'cars.car_type_id',
				'cars.color_id',
				'cars.brand_id',
				'cars.model_id',
				'cars.engine_type_id',
				'cars.drive_id',
				'cars.transmission_id',
				'cars.condition_id',
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
				'users.phone as user_phone',
				'cars.user_id'
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

		if (car) {
			const photos = await db('cars_photo')
				.select('img')
				.where('cars_id', car.id)
			car.photos = photos.map(photo => photo.img)
		}

		return car
	} catch (error) {
		console.error('Error fetching car from database:', error)
		throw error
	}
}

export const getCarByIdWithIds = async (id: number) => {
	// новый метод
	const car = await db('cars')
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
			'cars.manufacturer_id',
			'cars.car_type_id',
			'cars.color_id',
			'cars.brand_id',
			'cars.model_id',
			'cars.engine_type_id',
			'cars.drive_id',
			'cars.transmission_id',
			'cars.condition_id',
			'users.name as user_name',
			'users.surname as user_surname',
			'users.phone as user_phone'
		)
		.leftJoin('users', 'cars.user_id', 'users.id')
		.where('cars.id', id)
		.first()

	if (car) {
		const photos = await db('cars_photo').select('img').where('cars_id', car.id)
		car.photos = photos.map(photo => photo.img)
	}

	return car
}

export const updateCar = async (id: number, carData: CarData) => {
	// новый метод
	await db('cars').where('id', id).update(carData)
}

export const updateCarPhotos = async (carId: number, photos: string[]) => {
	// новый метод
	await db('cars_photo').where('cars_id', carId).del()
	const photoData = photos.map(photo => ({ cars_id: carId, img: photo }))
	await db('cars_photo').insert(photoData)
}

export const findCarsByUserId = async (userId: number) => {
	const cars = await db('cars')
		.join('manufacturer', 'cars.manufacturer_id', 'manufacturer.id')
		.join('car_type', 'cars.car_type_id', 'car_type.id')
		.join('color', 'cars.color_id', 'color.id')
		.join('brand', 'cars.brand_id', 'brand.id')
		.join('model', 'cars.model_id', 'model.id')
		.join('engine_type', 'cars.engine_type_id', 'engine_type.id')
		.join('drive', 'cars.drive_id', 'drive.id')
		.join('transmission', 'cars.transmission_id', 'transmission.id')
		.join('condition', 'cars.condition_id', 'condition.id')
		.where('cars.user_id', userId)
		.select(
			'cars.id',
			'cars.VIN',
			'cars.state_number',
			'cars.release_year',
			'cars.mileage',
			'cars.owners_by_PTS',
			'cars.description',
			'cars.adress',
			'cars.price',
			'manufacturer.name as manufacturer',
			'car_type.type as car_type',
			'color.name as color',
			'brand.name as brand',
			'model.name as model',
			'engine_type.name as engine_type',
			'drive.name as drive',
			'transmission.name as transmission',
			'condition.name as condition'
		)

	for (const car of cars) {
		const photos = await db('cars_photo').select('img').where('cars_id', car.id)
		car.photos = photos.map(photo => photo.img)
	}

	return cars
}

export const deleteCar = async (carId: number, userId: number) => {
	const deleted = await db('cars').where({ id: carId, user_id: userId }).del()
	return deleted > 0
}
