import { Router } from 'express'
import * as authController from '../controllers/authController'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/logout', authController.logout)
router.get('/me', authController.me)

export default router
