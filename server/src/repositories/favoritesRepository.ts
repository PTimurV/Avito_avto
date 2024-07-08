import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

interface Favorite {
	id?: number
	user_id: number
	car_id: number
}

export const addFavorite = async (
	userId: number,
	carId: number
): Promise<void> => {
	await db('favorites').insert({ user_id: userId, car_id: carId })
}

export const removeFavorite = async (
	userId: number,
	carId: number
): Promise<void> => {
	await db('favorites').where({ user_id: userId, car_id: carId }).del()
}

export const getUserFavorites = async (userId: number): Promise<Favorite[]> => {
	return db('favorites').where({ user_id: userId })
}

export const isFavorite = async (
	userId: number,
	carId: number
): Promise<boolean> => {
	const favorite = await db('favorites')
		.where({ user_id: userId, car_id: carId })
		.first()
	return !!favorite
}
