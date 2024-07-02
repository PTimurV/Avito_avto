export interface Car {
	id: number
	brand: string
	model: string
	release_year: number
	mileage: number
	description: string
	price: number
	photos?: [string]
}

export interface User {
	id?: number
	email: string
	name: string
	surname: string
	phone: string
}
