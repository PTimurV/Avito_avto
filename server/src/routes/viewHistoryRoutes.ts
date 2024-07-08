import express from 'express'
import viewHistoryController from '../controllers/viewHistoryController'

const router = express.Router()

// Добавление записи о просмотре
router.post('/add', viewHistoryController.addViewHistory)

// Получение истории просмотров пользователя
router.get('/', viewHistoryController.getViewHistoryByUser)

export default router
