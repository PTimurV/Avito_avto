import { Router } from 'express'
import * as brandController from '../controllers/brandController'

const router = Router()

router.get('/', brandController.getAllBrands)

export default router
