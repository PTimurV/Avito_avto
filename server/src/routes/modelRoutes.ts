import express from 'express'
import * as modelController from '../controllers/modelController'

const router = express.Router()

router.get('/', modelController.getModelsByBrandId)

export default router
