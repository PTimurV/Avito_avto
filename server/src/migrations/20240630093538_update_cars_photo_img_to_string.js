/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
	return knex.schema.alterTable('cars_photo', table => {
		table.string('img').alter() // Изменяем тип столбца на string
	})
}

exports.down = function (knex) {
	return knex.schema.alterTable('cars_photo', table => {
		table.binary('img').alter() // Возврат к binary при откате
	})
}
