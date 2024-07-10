import express from 'express'
import viewHistoryController from '../controllers/viewHistoryController'
import authMiddleware from '../middleware/authMiddleware'
const router = express.Router()

// Добавление записи о просмотре
router.post('/add', authMiddleware, viewHistoryController.addViewHistory)

// Получение истории просмотров пользователя
router.get('/', authMiddleware, viewHistoryController.getViewHistoryByUser)

export default router
