import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('cars', table => {
		table.decimal('price', 12, 2).alter() // Изменяем тип столбца price
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('cars', table => {
		table.decimal('price').alter() // Возврат к предыдущему типу (если необходимо)
	})
}
