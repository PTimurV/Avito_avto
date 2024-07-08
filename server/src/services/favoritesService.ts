import knex from 'knex'
import knexConfig from '../knexfile'
import { getCarById } from '../repositories/carRepository'

const db = knex(knexConfig.development)

export const addFavoriteService = async (
	userId: number,
	carId: number
): Promise<void> => {
	await db('favorites').insert({ user_id: userId, car_id: carId })
}

export const removeFavoriteService = async (
	userId: number,
	carId: number
): Promise<void> => {
	await db('favorites').where({ user_id: userId, car_id: carId }).del()
}

export const getUserFavoritesService = async (
	userId: number
): Promise<any[]> => {
	const favorites = await db('favorites')
		.select('car_id')
		.where({ user_id: userId })

	const carDetailsPromises = favorites.map(async favorite => {
		return await getCarById(favorite.car_id)
	})

	return await Promise.all(carDetailsPromises)
}
