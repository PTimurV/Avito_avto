import express from 'express'
import recommendationsController from '../controllers/recommendationsController'

const router = express.Router()

router.get('/', recommendationsController.getRecommendations)

export default router
