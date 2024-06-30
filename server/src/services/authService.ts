import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as userRepository from '../repositories/userRepository'

const JWT_SECRET = 'your_jwt_secret' // Замените на свой секретный ключ

export const register = async ({
	email,
	password,
	name,
	surname,
	phone,
}: any) => {
	const hashedPassword = await bcrypt.hash(password, 10)
	await userRepository.createUser({
		email,
		password: hashedPassword,
		name,
		surname,
		phone,
	})
}

export const login = async (email: string, password: string) => {
	const user = await userRepository.findUserByEmail(email)
	if (!user) throw new Error('Invalid email or password')

	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (!isPasswordValid) throw new Error('Invalid email or password')

	const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })
	return token
}
