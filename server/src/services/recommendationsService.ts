import recommendationsRepository from '../repositories/recommendationsRepository'

export const getRecommendations = async (userId: number): Promise<any[]> => {
	return await recommendationsRepository.getRecommendedCars(userId)
}

export default { getRecommendations }
