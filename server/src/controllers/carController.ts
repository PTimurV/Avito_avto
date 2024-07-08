import { Request, Response } from 'express'
import * as carService from '../services/carService'
import { verifyAccessToken } from '../services/tokenService'

export const createCar = async (req: Request, res: Response) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).send('Unauthorized')
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)

		const {
			car_type_id,
			color_id,
			VIN,
			state_number,
			manufacturer_id,
			brand_id,
			model_id,
			release_year,
			engine_type_id,
			drive_id,
			transmission_id,
			mileage,
			condition_id,
			owners_by_PTS,
			description,
			adress,
			price,
			photos,
		} = req.body

		const carData = {
			user_id: userPayload.id,
			car_type_id,
			color_id,
			VIN,
			state_number,
			manufacturer_id,
			brand_id,
			model_id,
			release_year,
			engine_type_id,
			drive_id,
			transmission_id,
			mileage,
			condition_id,
			owners_by_PTS,
			description,
			adress,
			price,
		}

		const car = await carService.createCar(carData, photos)

		res.status(201).json(car)
	} catch (error) {
		console.error('Error creating car:', error)
		res.status(500).send('Error creating car')
	}
}

export const getAllCars = async (req: Request, res: Response) => {
	try {
		const filters = req.query
		const page = parseInt(req.query.page as string, 10) || 1
		const limit = parseInt(req.query.limit as string, 10) || 10
		const offset = (page - 1) * limit

		const [cars, total] = await Promise.all([
			carService.getAllCars(filters, page, limit),
			carService.countAllCars(filters),
		])

		res.json({
			cars,
			total: Number(total),
			page,
			pages: Math.ceil(Number(total) / limit),
		})
	} catch (error) {
		console.error('Error fetching car:', error)
		res.status(500).send('Error fetching cars')
	}
}

export const getCarById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const authHeader = req.headers.authorization
		let userId = null

		if (authHeader) {
			const token = authHeader.split(' ')[1]
			const userPayload = verifyAccessToken(token)
			userId = userPayload.id
		}

		const car = await carService.getCarById(Number(id), userId)
		if (car) {
			res.json(car)
		} else {
			res.status(404).send('Car not found')
		}
	} catch (error) {
		console.error('Error fetching car:', error)
		res.status(500).send('Error fetching car')
	}
}

export const getCarByIdWithIds = async (req: Request, res: Response) => {
	// новый контроллер
	try {
		const { id } = req.params
		const car = await carService.getCarByIdWithIds(Number(id))
		if (car) {
			res.json(car)
		} else {
			res.status(404).send('Car not found')
		}
	} catch (error) {
		res.status(500).send('Error fetching car')
	}
}

export const updateCar = async (req: Request, res: Response) => {
	// новый контроллер
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).send('Unauthorized')
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)

		const {
			car_type_id,
			color_id,
			VIN,
			state_number,
			manufacturer_id,
			brand_id,
			model_id,
			release_year,
			engine_type_id,
			drive_id,
			transmission_id,
			mileage,
			condition_id,
			owners_by_PTS,
			description,
			adress,
			price,
			photos,
		} = req.body

		const carData = {
			user_id: userPayload.id,
			car_type_id,
			color_id,
			VIN,
			state_number,
			manufacturer_id,
			brand_id,
			model_id,
			release_year,
			engine_type_id,
			drive_id,
			transmission_id,
			mileage,
			condition_id,
			owners_by_PTS,
			description,
			adress,
			price,
		}

		await carService.updateCar(Number(req.params.id), carData, photos)

		res.status(200).send('Car updated successfully')
	} catch (error) {
		console.error('Error updating car:', error)
		res.status(500).send('Error updating car')
	}
}

export const deleteCar = async (req: Request, res: Response) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).send('Unauthorized')
		}

		const token = authHeader.split(' ')[1]
		const userPayload = verifyAccessToken(token)

		const { id } = req.params

		const deleted = await carService.deleteCar(Number(id), userPayload.id)
		if (deleted) {
			res.status(200).send('Car deleted successfully')
		} else {
			res.status(404).send('Car not found or not authorized')
		}
	} catch (error) {
		console.error('Error deleting car:', error)
		res.status(500).send('Error deleting car')
	}
}
