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
	const cars = await carRepository.getAllCars(filters)
	return cars
}

export const getCarById = async (id: number) => {
	const car = await carRepository.getCarById(id)
	return car
}

export const getCarByIdWithIds = async (id: number) => {
	// новый сервис
	const car = await carRepository.getCarByIdWithIds(id)
	return car
}

export const updateCar = async (
	id: number,
	carData: CarData,
	photos: string[]
) => {
	// новый сервис
	await carRepository.updateCar(id, carData)
	if (photos && photos.length > 0) {
		await carRepository.updateCarPhotos(id, photos)
	}
}

export const getCarsByUserId = async (userId: number) => {
	return await carRepository.findCarsByUserId(userId)
}
