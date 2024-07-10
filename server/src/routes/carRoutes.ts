import { Router } from 'express'
import {
	createCar,
	getAllCars,
	getCarById,
	getCarByIdWithIds,
	updateCar,
	deleteCar,
} from '../controllers/carController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.post('/cars', authMiddleware, createCar) // Проверка авторизации для создания машины
router.get('/cars', getAllCars) // Доступно всем
router.get('/cars/:id', getCarById) // Доступно всем
router.get('/cars/:id/edit', authMiddleware, getCarByIdWithIds) // Проверка авторизации для получения информации с ID
router.put('/cars/:id', authMiddleware, updateCar) // Проверка авторизации для обновления информации
router.delete('/cars/:id', authMiddleware, deleteCar) // Проверка авторизации для удаления машины

export default router
