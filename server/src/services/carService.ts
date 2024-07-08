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

export const getAllCars = async (filters: any, page: number, limit: number) => {
	const offset = (page - 1) * limit
	const cars = await carRepository.getAllCars(filters, limit, offset)
	return cars
}

export const countAllCars = async (filters: any) => {
	const total = await carRepository.countAllCars(filters)
	return total
}

export const getCarById = async (id: number, userId: number | null) => {
	try {
		const car = await carRepository.getCarById(id)
		if (car) {
			car.owner = userId && car.user_id === userId ? 1 : 0
		}
		return car
	} catch (error) {
		console.error('Error fetching car from repository:', error)
		throw error
	}
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

export const deleteCar = async (carId: number, userId: number) => {
	return await carRepository.deleteCar(carId, userId)
}

export const getCarsByUserId = async (userId: number) => {
	return await carRepository.findCarsByUserId(userId)
}
