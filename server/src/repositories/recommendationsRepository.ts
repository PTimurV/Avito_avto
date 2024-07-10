import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

interface Car {
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

export const getViewedCarsByUser = async (userId: number): Promise<Car[]> => {
	const viewedCars = await db('view_history as vh')
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
		.join('cars as c', 'vh.car_id', 'c.id')
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
		.where('vh.user_id', userId)

	return viewedCars
}

export const getRecommendedCars = async (userId: number): Promise<Car[]> => {
	const viewedCars = await getViewedCarsByUser(userId)

	if (viewedCars.length === 0) {
		return []
	}

	const brandNames = viewedCars.map(car => car.brand)
	const modelNames = viewedCars.map(car => car.model)

	const brandIds = await db('brand').select('id').whereIn('name', brandNames)

	const modelIds = await db('model').select('id').whereIn('name', modelNames)

	const recommendedCars = await db('cars as c')
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
		.whereIn(
			'c.brand_id',
			brandIds.map(b => b.id)
		)
		.orWhereIn(
			'c.model_id',
			modelIds.map(m => m.id)
		)
		.limit(10)

	// Get photos for each car
	for (const car of recommendedCars) {
		const photos = await db('cars_photo').select('img').where('cars_id', car.id)
		car.photos = photos.map(photo => photo.img)
	}

	return recommendedCars
}

export default { getViewedCarsByUser, getRecommendedCars }
