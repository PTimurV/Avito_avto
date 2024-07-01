import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your_jwt_secret' // Замените на свой секретный ключ

export interface UserPayload {
	id: number
	email: string
}

export const generateAccessToken = (payload: UserPayload) => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload: UserPayload) => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyAccessToken = (token: string): UserPayload => {
	try {
		return jwt.verify(token, JWT_SECRET) as UserPayload
	} catch (error) {
		throw new Error('Invalid access token')
	}
}

export const verifyRefreshToken = (token: string): UserPayload => {
	try {
		return jwt.verify(token, JWT_SECRET) as UserPayload
	} catch (error) {
		throw new Error('Invalid refresh token')
	}
}
