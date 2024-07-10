// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../services/tokenService'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization
	if (!authHeader) {
		return res.status(401).send('Unauthorized')
	}

	const token = authHeader.split(' ')[1]
	try {
		const userPayload = verifyAccessToken(token)
		next() // переходим к следующей мидлваре или маршруту
	} catch (error) {
		return res.status(401).send('Invalid access token')
	}
}

export default authMiddleware
