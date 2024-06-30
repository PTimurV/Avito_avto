import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

export const createUser = async (user: any) => {
	await db('users').insert(user)
}

export const findUserByEmail = async (email: string) => {
	return db('users').where({ email }).first()
}
