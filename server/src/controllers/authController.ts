import { Request, Response } from 'express'
import * as authService from '../services/authService'
import {
	verifyRefreshToken,
	generateAccessToken,
	verifyAccessToken,
} from '../services/tokenService'

const refreshTokens = new Set<string>()

interface ErrorWithMessage {
	message: string
}

export const me = async (req: Request, res: Response) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).send('Unauthorized')
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)
		const user = await authService.getUserById(userPayload.id)

		if (!user) {
			return res.status(401).send('User not found')
		}

		res.json({ user })
	} catch (error) {
		console.error('Ошибка при получении данных пользователя:', error)
		res.status(401).send('Invalid token')
	}
}

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, name, surname, phone } = req.body
		const { accessToken, refreshToken, user } = await authService.register({
			email,
			password,
			name,
			surname,
			phone,
		})

		refreshTokens.add(refreshToken)

		res.json({ accessToken, refreshToken, user })
	} catch (error) {
		const errorMessage =
			(error as ErrorWithMessage).message || 'An error occurred'
		console.error('Ошибка при регистрации:', errorMessage)
		res.status(400).send(errorMessage)
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const { accessToken, refreshToken, user } = await authService.login(
			email,
			password
		)

		refreshTokens.add(refreshToken)

		res.json({ accessToken, refreshToken, user })
	} catch (error) {
		const errorMessage =
			(error as ErrorWithMessage).message || 'An error occurred'
		console.error('Ошибка при входе:', errorMessage)
		res.status(401).send(errorMessage)
	}
}

export const refreshToken = (req: Request, res: Response) => {
	const authHeader = req.headers.authorization
	if (!authHeader) {
		return res.status(403).send('Refresh token is not provided')
	}

	const refreshToken = authHeader.split(' ')[1]

	if (!refreshTokens.has(refreshToken)) {
		console.error('Refresh token is not valid or not found in set')
		return res.status(403).send('Refresh token is not valid')
	}

	try {
		const user = verifyRefreshToken(refreshToken)
		const accessToken = generateAccessToken({ id: user.id, email: user.email })
		res.json({ accessToken })
	} catch (error) {
		console.error('Ошибка при проверке refresh token:', error)
		res.status(403).send('Refresh token is not valid')
	}
}

export const logout = (req: Request, res: Response) => {
	const authHeader = req.headers.authorization
	if (!authHeader) {
		return res.status(403).send('Refresh token is not provided')
	}

	const refreshToken = authHeader.split(' ')[1]
	refreshTokens.delete(refreshToken)
	res.send('Logout successful')
}
