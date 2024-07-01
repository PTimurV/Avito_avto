import knex from 'knex'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

interface Model {
	id: number
	brand_id: number
	name: string
}

export const findModelsByBrandId = async (
	brandId: number
): Promise<Model[]> => {
	return db('model').where({ brand_id: brandId })
}
