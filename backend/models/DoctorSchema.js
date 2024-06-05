import mongoose from 'mongoose'

// Define the timeSlot schema
const timeSlotSchema = new mongoose.Schema({
  day: { type: String, required: true },
  startingTime: { type: String, required: true },
  endingTime: { type: String, required: true },
})

// Define the doctor schema
const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: { type: String, required: true },

  // Fields for doctors only
  specialization: { type: String },
  qualifications: { type: Array },
  experiences: { type: Array },
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: [timeSlotSchema], // Array of timeSlot schema
  reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'],
    default: 'pending',
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: 'Appointment' }],
})

export default mongoose.model('Doctor', DoctorSchema)

// merge pe hours
