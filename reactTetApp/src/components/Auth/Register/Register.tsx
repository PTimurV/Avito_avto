import React from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from 'axios'
import './Register.css'

const Register: React.FC = () => {
	const onFinish = async (values: any) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/auth/register',
				values
			)
			message.success('Пользователь успешно зарегистрирован!')
			// Перенаправление на страницу авторизации
			window.location.href = '/login'
		} catch (error) {
			message.error('Ошибка регистрации!')
			console.error(error)
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
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Register
