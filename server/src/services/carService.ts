import * as carRepository from '../repositories/carRepository'

interface CarData {
	user_id: number
	car_type_id: number
	color_id: number
	VIN: string
	state_number: string
	manufacturer_id: number
	brand_id: number
	model_id: number
	release_year: number
	engine_type_id: number
	drive_id: number
	transmission_id: number
	mileage: number
	condition_id: number
	owners_by_PTS: number
	description: string
	adress: string
	price: number
}

export const createCar = async (carData: CarData, photos: string[]) => {
	const car = await carRepository.createCar(carData)
	if (photos && photos.length > 0) {
		await carRepository.addCarPhotos(car.id, photos)
	}
	return car
}

export const getAllCars = async (filters: any) => {
	return await carRepository.getAllCars(filters)
}

export const getCarById = async (id: number) => {
	return await carRepository.getCarById(id)
}

export const getCarsByUserId = async (userId: number) => {
	return await carRepository.findCarsByUserId(userId)
}
