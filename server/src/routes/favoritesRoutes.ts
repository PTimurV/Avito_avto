import { Router } from 'express'
import {
	addFavorite,
	removeFavorite,
	getUserFavorites,
} from '../controllers/favoritesController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.post('/add', authMiddleware, addFavorite)
router.post('/remove', authMiddleware, removeFavorite)
router.get('/user', authMiddleware, getUserFavorites) // Эндпоинт для получения избранных объявлений пользователя

export default router
