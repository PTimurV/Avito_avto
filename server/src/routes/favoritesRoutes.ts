import { Router } from 'express'
import {
	addFavorite,
	removeFavorite,
	getUserFavorites,
} from '../controllers/favoritesController'

const router = Router()

router.post('/add', addFavorite)
router.post('/remove', removeFavorite)
router.get('/user', getUserFavorites) // Эндпоинт для получения избранных объявлений пользователя

export default router
