import { Request, Response } from 'express'
import * as modelService from '../services/modelService'

export const getModelsByBrandId = async (req: Request, res: Response) => {
	const brandId = parseInt(req.query.brandId as string, 10)

	if (isNaN(brandId)) {
		return res.status(400).json({ error: 'Invalid brand ID' })
	}

	try {
		const models = await modelService.getModelsByBrandId(brandId)
		res.json(models)
	} catch (error) {
		console.error('Error fetching models:', error)
		res.status(500).json({ error: 'Error fetching models' })
	}
}
