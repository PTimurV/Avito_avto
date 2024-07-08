import express from 'express'
const cors = require('cors')
const cookieParser = require('cookie-parser')
import authRoutes from './routes/authRoutes'
import carRoutes from './routes/carRoutes'
import userRoutes from './routes/userRoutes'
import brandRoutes from './routes/brandRoutes'
import modelRoutes from './routes/modelRoutes'
const bodyParser = require('body-parser')
import chatRoutes from './routes/chatRoutes'
import { Server as WebSocketServer, WebSocket } from 'ws'
import http from 'http'
import { handleMessage } from './controllers/chatController'
import { addClient, removeClient } from './services/chatService'
import favoritesRoutes from './routes/favoritesRoutes' // Добавьте этот импорт
import viewHistoryRoutes from './routes/viewHistoryRoutes'
import recommendationsRoutes from './routes/recommendationsRoutes'

const app = express()
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
const corsOptions = {
	origin: 'http://localhost:5173', // ваш фронтенд домен
	credentials: true, // разрешить отправку cookies
}

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api/view-history', viewHistoryRoutes)

app.use('/api/auth', authRoutes)
app.use('/api', carRoutes)
app.use('/api/user', userRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/models', modelRoutes)
app.use('/api/favorites', favoritesRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/recommendations', recommendationsRoutes)

wss.on('connection', (ws: WebSocket) => {
	console.log('New WebSocket connection')
	addClient(ws)

	ws.on('message', (message: string) => {
		handleMessage(ws, message)
	})

	ws.on('close', () => {
		console.log('WebSocket connection closed')
		removeClient(ws)
	})
})

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
