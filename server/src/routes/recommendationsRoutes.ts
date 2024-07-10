import express from 'express'
import recommendationsController from '../controllers/recommendationsController'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', authMiddleware, recommendationsController.getRecommendations)

export default router
