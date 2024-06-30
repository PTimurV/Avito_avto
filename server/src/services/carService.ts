import * as carRepository from '../repositories/carRepository'

export const createCar = async (carData: any) => {
	await carRepository.createCar(carData)
}

export const getAllCars = async (filters: any) => {
	return await carRepository.getAllCars(filters)
}

export const getCarById = async (id: number) => {
	return await carRepository.getCarById(id)
}
