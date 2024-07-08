import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

interface ViewHistory {
	id?: number
	user_id: number
	car_id: number
	viewed_at?: Date
}

export const addViewHistory = async (
	userId: number,
	carId: number
): Promise<void> => {
	const existingEntry = await db('view_history')
		.where({ user_id: userId, car_id: carId })
		.first()

	if (!existingEntry) {
		await db('view_history').insert({ user_id: userId, car_id: carId })
	}
}

export const getViewHistoryByUser = async (
	userId: number
): Promise<ViewHistory[]> => {
	const viewHistory = await db('view_history as vh')
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
			'users.id as user_id',
			'vh.viewed_at'
		)
		.leftJoin('cars as c', 'vh.car_id', 'c.id')
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
		.orderBy('vh.viewed_at', 'desc')

	// Get photos for each car
	for (const car of viewHistory) {
		const photos = await db('cars_photo').select('img').where('cars_id', car.id)
		car.photos = photos.map(photo => photo.img)
	}

	return viewHistory
}

export default { addViewHistory, getViewHistoryByUser }
