/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
	return knex.schema
		.createTable('users', table => {
			table.increments('id').primary()
			table.string('phone')
			table.string('name')
			table.string('surname')
			table.string('email').unique().notNullable()
			table.string('password').notNullable()
		})
		.createTable('color', table => {
			table.increments('id').primary()
			table.string('name')
		})
		.createTable('brand', table => {
			table.increments('id').primary()
			table.string('name')
		})
		.createTable('engine_type', table => {
			table.increments('id').primary()
			table.string('name')
		})
		.createTable('transmission', table => {
			table.increments('id').primary()
			table.string('name')
		})
		.createTable('condition', table => {
			table.increments('id').primary()
			table.string('name')
		})
		.createTable('car_type', table => {
			table.increments('id').primary()
			table.string('type')
		})
		.createTable('manufacturer', table => {
			table.increments('id').primary()
			table.string('name')
		})
		.createTable('model', table => {
			table.increments('id').primary()
			table.string('name')
			table.integer('brand_id').unsigned().references('id').inTable('brand')
		})
		.createTable('drive', table => {
			table.increments('id').primary()
			table.string('name')
		})
		.createTable('cars', table => {
			table.increments('id').primary()
			table.integer('user_id').unsigned().references('id').inTable('users')
			table
				.integer('car_type_id')
				.unsigned()
				.references('id')
				.inTable('car_type')
			table.integer('color_id').unsigned().references('id').inTable('color')
			table.string('VIN')
			table.string('state_number')
			table
				.integer('manufacturer_id')
				.unsigned()
				.references('id')
				.inTable('manufacturer')
			table.integer('brand_id').unsigned().references('id').inTable('brand')
			table.integer('model_id').unsigned().references('id').inTable('model')
			table.integer('release_year')
			table
				.integer('engine_type_id')
				.unsigned()
				.references('id')
				.inTable('engine_type')
			table.integer('drive_id').unsigned().references('id').inTable('drive')
			table
				.integer('transmission_id')
				.unsigned()
				.references('id')
				.inTable('transmission')
			table.integer('mileage')
			table
				.integer('condition_id')
				.unsigned()
				.references('id')
				.inTable('condition')
			table.integer('owners_by_PTS')
			table.string('description')
			table.string('adress')
			table.decimal('price')
		})
		.createTable('cars_photo', table => {
			table.increments('id').primary()
			table.integer('cars_id').unsigned().references('id').inTable('cars')
			table.string('img')
		})
}

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('cars_photo')
		.dropTableIfExists('cars')
		.dropTableIfExists('drive')
		.dropTableIfExists('model')
		.dropTableIfExists('manufacturer')
		.dropTableIfExists('car_type')
		.dropTableIfExists('condition')
		.dropTableIfExists('transmission')
		.dropTableIfExists('engine_type')
		.dropTableIfExists('brand')
		.dropTableIfExists('color')
		.dropTableIfExists('users')
}
