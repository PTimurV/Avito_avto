import { Request, Response } from 'express'
import * as userService from '../services/userService'
import { verifyAccessToken } from '../services/tokenService'
import * as carService from '../services/carService'

export const getProfile = async (req: Request, res: Response) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).send('Unauthorized')
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)

		const user = await userService.getUserById(userPayload.id)
		if (!user) {
			return res.status(404).send('User not found')
		}

		res.json(user)
	} catch (error) {
		console.error('Error fetching profile:', error)
		res.status(500).send('Error fetching profile')
	}
}

export const updateProfile = async (req: Request, res: Response) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).send('Unauthorized')
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)

		const updatedUserData = req.body
		const updatedUser = await userService.updateUser(
			userPayload.id,
			updatedUserData
		)

		res.json(updatedUser)
	} catch (error) {
		console.error('Error updating profile:', error)
		res.status(500).send('Error updating profile')
	}
}

export const getProfileById = async (req: Request, res: Response) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).send('Unauthorized')
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)

		const userId = parseInt(req.params.id, 10)

		const user = await userService.getUserById(userId)
		if (!user) {
			return res.status(404).send('User not found')
		}

		const cars = await carService.getCarsByUserId(userId)

		const owner = userId === userPayload.id ? 1 : 0

		res.json({ user, cars, owner })
	} catch (error) {
		console.error('Error fetching profile by ID:', error)
		res.status(500).send('Error fetching profile by ID')
	}
}
