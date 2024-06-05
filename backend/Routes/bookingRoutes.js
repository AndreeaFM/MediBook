import express from 'express'
import stripePackage from 'stripe'
import { authenticate } from '../auth/verifyToken.js'
import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY)
const router = express.Router()

// POST route for creating a checkout session
router.post(
  '/bookings/checkout-session/:doctorId',
  authenticate,
  async (req, res) => {
    const { doctorId } = req.params
    const { date, time } = req.body

    console.log('Received booking request:', { doctorId, date, time })

    // Validate date and time
    if (!date || !time) {
      return res.status(400).json({
        message: 'Date and time are required',
      })
    }

    try {
      // Check if the time slot is already booked
      const existingBooking = await Booking.findOne({
        doctor: doctorId,
        date,
        time,
      })
      if (existingBooking) {
        return res.status(400).json({
          message: 'Time slot is already booked',
        })
      }

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'ron',
              product_data: {
                name: `Appointment with Doctor ${doctorId}`,
              },
              unit_amount: 10000, // price in minor currency units (e.g., 10000 RON cents = 100 RON)
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/checkout-success',
        cancel_url: 'http://localhost:3000/checkout-failure',
      })

      // Save the booking as pending
      const booking = new Booking({
        doctor: doctorId,
        user: req.userId,
        ticketPrice: '100', // Replace with the actual ticket price
        date,
        time,
        session: session.id,
        status: 'pending',
      })

      await booking.save()

      res.status(200).json({
        message: 'Booking successful',
        session,
      })
    } catch (error) {
      console.error('Error creating checkout session:', error)
      res.status(500).json({
        message: 'Error creating checkout session. Please try again',
      })
    }
  }
)

// GET route for fetching available time slots
router.get('/doctors/:doctorId/available-times', async (req, res) => {
  const { doctorId } = req.params

  try {
    const doctor = await Doctor.findById(doctorId)

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }

    // Get all bookings for the doctor
    const bookings = await Booking.find({ doctor: doctorId })

    // Filter out the already booked time slots
    const availableSlots = doctor.timeSlots
      .flatMap((slot) => {
        const startHour = parseInt(slot.startingTime.split(':')[0])
        const endHour = parseInt(slot.endingTime.split(':')[0])
        const times = []
        for (let hour = startHour; hour < endHour; hour++) {
          times.push({ day: slot.day, time: `${hour}:00` })
        }
        return times
      })
      .filter((slot) => {
        const isBooked = bookings.some(
          (booking) => booking.date === slot.day && booking.time === slot.time
        )
        return !isBooked
      })

    res.status(200).json(availableSlots)
  } catch (error) {
    console.error('Error fetching available times:', error)
    ///res.status(500).json({ message: 'Error fetching available times' })
  }
})

export default router

//merge pe hours

//// before doctors appointments seeing
