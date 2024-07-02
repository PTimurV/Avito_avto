import { Router } from 'express'
import {
	createCar,
	getAllCars,
	getCarById,
	getCarByIdWithIds,
	updateCar,
} from '../controllers/carController'

const router = Router()

router.post('/cars', createCar)
router.get('/cars', getAllCars)
router.get('/cars/:id', getCarById)
router.get('/cars/:id/edit', getCarByIdWithIds) // новый маршрут для получения информации с ID
router.put('/cars/:id', updateCar) // новый маршрут для обновления информации

export default router
