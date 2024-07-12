import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks'
import { setUser } from '../../../store/userSlice'
import './Register.css'
import useAxios from '../../../AxiosHook/useAxios'
import ErrorMessage from '../../ErrorMessage/ErrorMessage' // импортируем компонент ошибки

const Register: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { post } = useAxios()
	const [errorMessage, setErrorMessage] = useState('')

	const onFinish = async (values: any) => {
		try {
			const data = await post('/auth/register', values, {
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
			console.error('Ошибка при регистрации:', error)
			setErrorMessage('Ошибка при регистрации: ' + error.response.data)
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className='register-form'>
			<Form
				name='register'
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

				<Form.Item
					label='Имя'
					name='name'
					rules={[{ required: true, message: 'Введите ваше имя!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Фамилия'
					name='surname'
					rules={[{ required: true, message: 'Введите вашу фамилию!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Телефон'
					name='phone'
					rules={[{ required: true, message: 'Введите ваш телефон!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Регистрация
					</Button>
				</Form.Item>
			</Form>
			<ErrorMessage message={errorMessage} />
		</div>
	)
}

export default Register
