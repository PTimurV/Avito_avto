import { Request, Response } from 'express'
import * as carService from '../services/carService'

export const createCar = async (req: Request, res: Response) => {
	try {
		const carData = req.body
		console.log('Repository: inserting car data:', carData)
		await carService.createCar(carData)
		res.status(201).send('Car created successfully')
	} catch (error) {
		console.error('Error creating car:', error)
		res.status(500).send('Error creating car')
	}
}

export const getAllCars = async (req: Request, res: Response) => {
	try {
		const filters = req.query
		const cars = await carService.getAllCars(filters)
		res.json(cars)
	} catch (error) {
		console.error('Error fetching car:', error)
		res.status(500).send('Error fetching cars')
	}
}

export const getCarById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const car = await carService.getCarById(Number(id))
		if (car) {
			res.json(car)
		} else {
			res.status(404).send('Car not found')
		}
	} catch (error) {
		res.status(500).send('Error fetching car')
	}
}
