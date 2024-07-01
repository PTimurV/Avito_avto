import { Router } from 'express'
import * as userController from '../controllers/userController'

const router = Router()

router.get('/profile', userController.getProfile)
router.put('/profile', userController.updateProfile)
router.get('/profile/:id', userController.getProfileById)

export default router
