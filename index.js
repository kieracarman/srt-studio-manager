import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

import 'dotenv/config'
import connectDB from './config/connectDB.js'
import corsOptions from './config/corsOptions.js'
import errorHandler from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import assetRoutes from './routes/assetRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

// Initialize app and service port
const app = express()
const port = process.env.PORT || 4000

// Connect to database
connectDB()

// Middlewares
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// If we're on production, force TLS and serve static files
if (process.env.NODE_ENV === 'production') {
  // Force TLS/HTTPS
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next()
    }
  })

  // Serve static files
  const __dirname = new URL('.', import.meta.url).pathname
  console.log(__dirname)
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'client/build') })
  })
}

// Routes that should handle requests
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/assets', assetRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/bookings', bookingRoutes)

// Apply errorHandler middleware
app.use(errorHandler)

// Once database is connected, log to console and start listening for requests
mongoose.connection.once('open', () => {
  console.log('Database Connected')
  app.listen(port, () => console.log(`Server is running on port: ${port}`))
})

// On mongoose error, log to console
mongoose.connection.on('error', (err) => {
  console.log(err)
})
