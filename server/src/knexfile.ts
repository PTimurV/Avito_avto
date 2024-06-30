import type { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: 'postgres',
			password: 'postgres',
			database: 'esoft',
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './migrations',
		},
	},
}

export default config
