import viewHistoryRepository from '../repositories/viewHistoryRepository'

export const addViewHistory = async (
	userId: number,
	carId: number
): Promise<void> => {
	await viewHistoryRepository.addViewHistory(userId, carId)
}

export const getViewHistoryByUser = async (userId: number): Promise<any[]> => {
	return await viewHistoryRepository.getViewHistoryByUser(userId)
}

export default { addViewHistory, getViewHistoryByUser }
