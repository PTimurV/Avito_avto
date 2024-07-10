import React from 'react'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppDispatch } from '../../../hooks'
import { setUser } from '../../../store/userSlice'
import './Login.css'

const Login: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const onFinish = async (values: any) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/auth/login',
				values,
				{ withCredentials: true }
			)
			const userData = response.data.user
			const accessToken = response.data.accessToken
			localStorage.setItem('accessToken', accessToken)
			dispatch(setUser(userData))
			navigate('/')
		} catch (error) {
			console.error('Ошибка при входе:', error)
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className='login-form'>
			<Form
				name='login'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Email'
					name='email'
					rules={[{ required: true, message: 'Введите ваш email!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Пароль'
					name='password'
					rules={[{ required: true, message: 'Введите ваш пароль!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login
