import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import CarDetail from './pages/CarDetail/CarDetail'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import './App.css'
import CreateAd from './pages/CreateAd/CreateAd'
import Settings from './pages/Settings/Settings'
import ProfileInfo from './pages/ProfileInfo/ProfileInfo'

const App: React.FC = () => {
	return (
		<Router>
			<Header />
			<div className='App'>
				<div className='main-content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/cars/:id' element={<CarDetail />} />
						<Route path='/create-ad' element={<CreateAd />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/profile/:id' element={<ProfileInfo />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	)
}

export default App
