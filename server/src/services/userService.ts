import * as userRepository from '../repositories/userRepository'

export const getUserById = async (id: number) => {
	const user = await userRepository.findUserById(id)
	if (user) {
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	}
	return null
}

export const updateUser = async (id: number, userData: any) => {
	const user = await userRepository.updateUser(id, userData)
	if (user) {
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	}
	return null
}
