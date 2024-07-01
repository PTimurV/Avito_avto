import bcrypt from 'bcryptjs'
import * as userRepository from '../repositories/authRepository'
import {
	generateAccessToken,
	generateRefreshToken,
	UserPayload,
} from './tokenService'

interface RegisterParams {
	email: string
	password: string
	name: string
	surname: string
	phone: string
}

export const register = async ({
	email,
	password,
	name,
	surname,
	phone,
}: RegisterParams) => {
	const hashedPassword = await bcrypt.hash(password, 10)
	await userRepository.createUser({
		email,
		password: hashedPassword,
		name,
		surname,
		phone,
	})

	const user = await userRepository.findUserByEmail(email)
	if (!user) throw new Error('User registration failed')

	const userPayload: UserPayload = { id: user.id, email: user.email }
	const accessToken = generateAccessToken(userPayload)
	const refreshToken = generateRefreshToken(userPayload)

	return { accessToken, refreshToken, user }
}

export const login = async (email: string, password: string) => {
	const user = await userRepository.findUserByEmail(email)
	if (!user) throw new Error('Invalid email or password')

	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (!isPasswordValid) throw new Error('Invalid email or password')

	const userPayload: UserPayload = { id: user.id, email: user.email }
	const accessToken = generateAccessToken(userPayload)
	const refreshToken = generateRefreshToken(userPayload)

	return { accessToken, refreshToken, user }
}
export const getUserById = async (id: number) => {
	return await userRepository.findUserById(id)
}
