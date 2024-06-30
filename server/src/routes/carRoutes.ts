import { Router } from 'express'
import { createCar, getAllCars, getCarById } from '../controllers/carController'

const router = Router()

router.post('/cars', createCar)
router.get('/cars', getAllCars)
router.get('/cars/:id', getCarById)

export default router
