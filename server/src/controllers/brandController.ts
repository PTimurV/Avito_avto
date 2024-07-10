import { Request, Response } from 'express'
import * as brandService from '../services/brandService'

export const getAllBrands = async (req: Request, res: Response) => {
	try {
		const brands = await brandService.getAllBrands()
		res.json(brands)
	} catch (error) {
		console.error('Error fetching brands:', error)
		res.status(500).send('Error fetching brands')
	}
}
