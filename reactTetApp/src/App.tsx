import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import CarDetail from './pages/CarDetail/CarDetail'
import Header from './components/Layout/Header/Header'
import './App.css'

const App: React.FC = () => {
	return (
		<Router>
			<Header />
			<div className='App' style={{ paddingTop: '50px' }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/cars/:id' element={<CarDetail />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
