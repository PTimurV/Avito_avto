import express from 'express'
const cors = require('cors')
const cookieParser = require('cookie-parser')
import authRoutes from './routes/authRoutes'
import carRoutes from './routes/carRoutes'
import userRoutes from './routes/userRoutes'
import brandRoutes from './routes/brandRoutes'
import modelRoutes from './routes/modelRoutes'

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
	origin: 'http://localhost:5173', // ваш фронтенд домен
	credentials: true, // разрешить отправку cookies
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api', carRoutes)
app.use('/api/user', userRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/models', modelRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
