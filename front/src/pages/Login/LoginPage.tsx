import React from 'react'
import Login from '../../components/Auth/Login/Login'
import './LoginPage.css'

const LoginPage: React.FC = () => {
	return (
		<div className='login-page'>
			<h1>Авторизация</h1>
			<Login />
		</div>
	)
}

export default LoginPage
