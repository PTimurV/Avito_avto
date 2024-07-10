import { Request, Response } from 'express'
import recommendationsService from '../services/recommendationsService'
import { verifyAccessToken } from '../services/tokenService'

export const getRecommendations = async (
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

		const recommendations = await recommendationsService.getRecommendations(
			userId
		)
		res.status(200).json(recommendations)
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message })
		} else {
			res.status(500).json({ error: 'An unknown error occurred' })
		}
	}
}

export default { getRecommendations }
