import { Router } from 'express'
import * as userController from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware'
const router = Router()

router.get('/profile', userController.getProfile)
router.put('/profile', authMiddleware, userController.updateProfile)
router.get('/profile/:id', authMiddleware, userController.getProfileById)

export default router
