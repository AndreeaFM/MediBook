import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'

const router = express.Router()

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Middleware to verify admin role
const verifyAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}

// Controller functions
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'patient' })
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
    res.status(200).json(doctors)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    doctor.isApproved = 'approved'
    await doctor.save()
    res.status(200).json({ message: 'Doctor approved' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id)
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    res.status(200).json({ message: 'Doctor deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Admin routes
router.get('/users', verifyToken, verifyAdmin, getAllUsers)
router.get('/doctors', verifyToken, verifyAdmin, getAllDoctors)
router.put('/doctors/approve/:id', verifyToken, verifyAdmin, approveDoctor)
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser)
router.delete('/doctors/:id', verifyToken, verifyAdmin, deleteDoctor)

export default router
