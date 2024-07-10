// App.tsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import './App.css'
import AppRoutes from './routes'

const App: React.FC = () => {
	return (
		<Router>
			<Header />
			<div className='App'>
				<div className='main-content'>
					<AppRoutes />
				</div>
				<Footer />
			</div>
		</Router>
	)
}

export default App
