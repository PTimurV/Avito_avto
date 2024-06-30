import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import './Header.css'

const Header: React.FC = () => {
	return (
		<header className='header'>
			<div className='logo'>MyApp</div>
			<div className='nav-buttons'>
				<Link to='/login'>
					<Button type='primary'>Авторизация</Button>
				</Link>
				<Link to='/register'>
					<Button type='default'>Регистрация</Button>
				</Link>
			</div>
		</header>
	)
}

export default Header
