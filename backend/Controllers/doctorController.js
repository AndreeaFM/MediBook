import BookingSchema from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const updateDoctor = async (req, res) => {
  const id = req.params.id

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedDoctor,
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update' })
  }
}

export const deleteDoctor = async (req, res) => {
  const id = req.params.id

  try {
    await Doctor.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: 'Successfully deleted',
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete' })
  }
}

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id

  try {
    const doctor = await Doctor.findById(id)
      .populate('reviews')
      .select('-password')

    res.status(200).json({
      success: true,
      message: 'Doctor found',
      data: doctor,
    })
  } catch (err) {
    res.status(404).json({ success: false, message: 'No Doctor found' })
  }
}

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query //used to filter data based on specific criteria
    let doctors

    if (query) {
      doctors = await Doctor.find({
        isApproved: 'approved',
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { specialization: { $regex: query, $options: 'i' } },
        ], //use for find doctors by name or specialization, i means case insensitive searching
      }).select('-password')
    } else {
      doctors = await Doctor.find({ isApproved: 'approved' }).select(
        '-password'
      ) //exlude the password field for sensitive data
      // by using isApproved: 'approved' you cannot see all the data in postman
    }

    res.status(200).json({
      success: true,
      message: 'Doctors found',
      data: doctors,
    })
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not found' })
  }
}

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId

  try {
    const doctor = await Doctor.findById(doctorId)

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: 'Doctor not found' })
    }

    const { password, ...rest } = doctor._doc
    const appointments = await BookingSchema.find({ doctor: doctorId })

    res.status(200).json({
      success: true,
      message: 'Profile info is getting',
      data: { ...rest, appointments },
    })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong, cannot get' })
  }
}

///////// dupa matchmaking timeslots

export const getAvailableTimes = async (req, res) => {
  const { doctorId } = req.params

  try {
    const doctor = await Doctor.findById(doctorId)

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }

    res.status(200).json(doctor.timeSlots) // Assuming timeSlots is part of the doctor model
  } catch (error) {
    console.error('Error fetching available times:', error)
    //res.status(500).json({ message: 'Error fetching available times' })
  }
}
//aici am facut modifcari

// until here it works
