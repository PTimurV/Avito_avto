import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

interface User {
	id: number
	email: string
	password: string
	name: string
	surname: string
	phone: string
}

export const createUser = async (user: Omit<User, 'id'>) => {
	await db('users').insert(user)
}

export const findUserByEmail = async (
	email: string
): Promise<User | undefined> => {
	return db('users').where({ email }).first()
}

export const findUserById = async (id: number): Promise<User | undefined> => {
	return db('users').where({ id }).first()
}

export const updateUser = async (
	id: number,
	userData: Partial<User>
): Promise<User | undefined> => {
	const [updatedUser] = await db('users')
		.where({ id })
		.update(userData)
		.returning('*')
	return updatedUser
}
