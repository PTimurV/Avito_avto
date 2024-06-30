import { Request, Response } from 'express'
import * as authService from '../services/authService'

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, name, surname, phone } = req.body
		await authService.register({ email, password, name, surname, phone })
		res.status(201).send('User registered successfully')
	} catch (error) {
		res.status(500).send('Error registering user')
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const token = await authService.login(email, password)
		res.json({ token })
	} catch (error) {
		res.status(401).send('Invalid email or password')
	}
}
