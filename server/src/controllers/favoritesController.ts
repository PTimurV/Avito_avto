import { Request, Response } from 'express'
import {
	addFavoriteService,
	removeFavoriteService,
	getUserFavoritesService,
} from '../services/favoritesService'
import { verifyAccessToken } from '../services/tokenService'

interface CustomError extends Error {
	status?: number
}

export const addFavorite = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			res.status(401).send('Unauthorized')
			return
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)
		const userId = userPayload.id
		const { carId } = req.body

		await addFavoriteService(userId, carId)
		res.status(200).json({ message: 'Added to favorites' })
	} catch (error) {
		const err = error as CustomError
		res.status(err.status || 500).json({ error: err.message })
	}
}

export const removeFavorite = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			res.status(401).send('Unauthorized')
			return
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)
		const userId = userPayload.id
		const { carId } = req.body

		await removeFavoriteService(userId, carId)
		res.status(200).json({ message: 'Removed from favorites' })
	} catch (error) {
		const err = error as CustomError
		res.status(err.status || 500).json({ error: err.message })
	}
}

export const getUserFavorites = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			res.status(401).send('Unauthorized')
			return
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)
		const userId = userPayload.id

		const favorites = await getUserFavoritesService(userId)
		res.status(200).json(favorites)
	} catch (error) {
		const err = error as CustomError
		res.status(err.status || 500).json({ error: err.message })
	}
}
