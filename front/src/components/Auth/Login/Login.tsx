import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks'
import { setUser } from '../../../store/userSlice'
import './Login.css'
import useAxios from '../../../AxiosHook/useAxios'
import ErrorMessage from '../../ErrorMessage/ErrorMessage' // импортируем компонент ошибки

const Login: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { post } = useAxios()
	const [errorMessage, setErrorMessage] = useState('')

	const onFinish = async (values: any) => {
		try {
			const data = await post('/auth/login', values, {
				withCredentials: true,
			})
			const userData = data.user
			const accessToken = data.accessToken
			const refreshToken = data.refreshToken
			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', refreshToken)
			dispatch(setUser(userData))
			navigate('/')
		} catch (error) {
			console.error('Ошибка при входе:', error)
			setErrorMessage('Ошибка при входе: ' + error.response.data)
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
			<ErrorMessage message={errorMessage} />
		</div>
	)
}

export default Login
