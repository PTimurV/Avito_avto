import * as modelRepository from '../repositories/modelRepository'

export const getModelsByBrandId = async (brandId: number) => {
	return modelRepository.findModelsByBrandId(brandId)
}
