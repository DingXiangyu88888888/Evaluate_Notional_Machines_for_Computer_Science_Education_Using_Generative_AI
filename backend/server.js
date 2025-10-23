import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import evaluationRoutes from './routes/evaluation.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

// Stricter rate limiting for evaluation endpoint
const evaluationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 evaluations per hour
    message: 'Too many evaluation requests, please try again later.'
})

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? ['https://nveval.web.app', 'https://nmeval.com', "https://nveval.firebaseapp.com", process.env.FRONTEND_URL].filter(Boolean)
    : ['http://localhost:3000']

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notional-machine', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err)
})

// Routes
app.use('/api/evaluate', evaluationLimiter, evaluationRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
}) 