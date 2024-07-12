import { useCallback } from 'react'
import axiosInstance from './api'

const useAxios = () => {
	const get = useCallback(
		async (url: string, options = {}, useRefreshToken = false) => {
			const token = localStorage.getItem(
				useRefreshToken ? 'refreshToken' : 'accessToken'
			)
			const headers = token ? { Authorization: `Bearer ${token}` } : {}
			const response = await axiosInstance.get(url, { ...options, headers })
			return response.data
		},
		[]
	)

	const post = useCallback(
		async (url: string, data: any, options = {}, useRefreshToken = false) => {
			const token = localStorage.getItem(
				useRefreshToken ? 'refreshToken' : 'accessToken'
			)
			const headers = token ? { Authorization: `Bearer ${token}` } : {}
			const response = await axiosInstance.post(url, data, {
				...options,
				headers,
			})
			return response.data
		},
		[]
	)

	const put = useCallback(
		async (url: string, data: any, options = {}, useRefreshToken = false) => {
			const token = localStorage.getItem(
				useRefreshToken ? 'refreshToken' : 'accessToken'
			)
			const headers = token ? { Authorization: `Bearer ${token}` } : {}
			const response = await axiosInstance.put(url, data, {
				...options,
				headers,
			})
			return response.data
		},
		[]
	)

	const del = useCallback(
		async (url: string, options = {}, useRefreshToken = false) => {
			const token = localStorage.getItem(
				useRefreshToken ? 'refreshToken' : 'accessToken'
			)
			const headers = token ? { Authorization: `Bearer ${token}` } : {}
			const response = await axiosInstance.delete(url, { ...options, headers })
			return response.data
		},
		[]
	)

	return { get, post, put, del }
}

export default useAxios
