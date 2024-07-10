import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

interface User {
	email: string
	password: string
	name: string
	surname: string
	phone: string
}

export const createUser = async (user: User) => {
	await db('users').insert(user)
}

export const findUserByEmail = async (email: string) => {
	return db('users').where({ email }).first()
}
export const findUserById = async (id: number): Promise<User | undefined> => {
	return db('users').where({ id }).first()
}
