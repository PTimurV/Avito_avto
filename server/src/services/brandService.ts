import * as brandRepository from '../repositories/brandRepository'

export const getAllBrands = async () => {
	return brandRepository.getAllBrands()
}
