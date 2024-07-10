import React from 'react'
import Register from '../../components/Auth/Register/Register'
import './RegisterPage.css'

const RegisterPage: React.FC = () => {
	return (
		<div className='register-page'>
			<h1>Регистрация</h1>
			<Register />
		</div>
	)
}

export default RegisterPage
