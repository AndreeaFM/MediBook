// file created for adminimport Admin from '../models/AdminSchema.js';
import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'

const User = require('../models/User')

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'patient' })
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
    res.status(200).json(doctors)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const approveDoctor = async (req, res) => {
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

export const deleteUser = async (req, res) => {
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
