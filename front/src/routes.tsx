import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import CarDetail from './pages/CarDetail/CarDetail'
import CreateAd from './pages/CreateAd/CreateAd'
import Settings from './pages/Settings/Settings'
import ProfileInfo from './pages/ProfileInfo/ProfileInfo'
import EditCar from './pages/EditCar/EditCar'
import ChatPage from './pages/ChatPage/ChatPage'
import ChatRoom from './components/ChatRoom/ChatRoom'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import ViewHistory from './pages/ViewHistory/ViewHistory'
import Recommendations from './pages/Recommendations/Recommendations'
import withAuth from './components/Hoc/withAuth'

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route
				path='/cars/:id'
				element={React.createElement(withAuth(CarDetail))}
			/>
			<Route
				path='/create-ad'
				element={React.createElement(withAuth(CreateAd))}
			/>
			<Route
				path='/settings'
				element={React.createElement(withAuth(Settings))}
			/>
			<Route
				path='/profile/:id'
				element={React.createElement(withAuth(ProfileInfo))}
			/>
			<Route
				path='/edit-car/:id'
				element={React.createElement(withAuth(EditCar))}
			/>
			<Route path='/chats' element={React.createElement(withAuth(ChatPage))} />
			<Route
				path='/chat/:id'
				element={React.createElement(withAuth(ChatRoom))}
			/>
			<Route
				path='/favorites'
				element={React.createElement(withAuth(FavoritesPage))}
			/>
			<Route
				path='/view-history'
				element={React.createElement(withAuth(ViewHistory))}
			/>
			<Route
				path='/recommendations'
				element={React.createElement(withAuth(Recommendations))}
			/>
		</Routes>
	)
}

export default AppRoutes
