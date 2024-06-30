import express from 'express'
const cors = require('cors')
import authRoutes from './routes/authRoutes'
import carRoutes from './routes/carRoutes'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api', carRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
