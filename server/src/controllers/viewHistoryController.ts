import { Request, Response } from 'express'
import viewHistoryService from '../services/viewHistoryService'
import { verifyAccessToken } from '../services/tokenService'

export const addViewHistory = async (
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
		await viewHistoryService.addViewHistory(userId, carId)
		res.status(201).json({ message: 'View history added successfully' })
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message })
		} else {
			res.status(500).json({ error: 'An unknown error occurred' })
		}
	}
}

export const getViewHistoryByUser = async (
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

		const viewHistory = await viewHistoryService.getViewHistoryByUser(userId)
		res.status(200).json(viewHistory)
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message })
		} else {
			res.status(500).json({ error: 'An unknown error occurred' })
		}
	}
}

export default { addViewHistory, getViewHistoryByUser }
