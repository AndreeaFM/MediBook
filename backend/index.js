import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRoute from './Routes/booking.js' // Existing booking route
import bookingRoutesWithCalendar from './Routes/bookingRoutes.js' // New booking route with date and time

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
  origin: true,
}

app.get('/', (req, res) => {
  res.send('Api is working')
})

// Database connection
mongoose.set('strictQuery', false)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB database is connected')
  } catch (err) {
    console.log('MongoDB database connection failed')
  }
}

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute) // domain/api/v1/auth/register
app.use('/api/v1/users', userRoute)
app.use('/api/v1/doctors', doctorRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/bookings', bookingRoute) // Existing booking route
app.use('/api/v1', bookingRoutesWithCalendar) // New booking route with date and time

app.listen(port, () => {
  connectDB()
  console.log('Server is running on port ' + port)
})

// until here it works
//before matchmaking
