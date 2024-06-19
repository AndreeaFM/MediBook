import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader.js'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [doctors, setDoctors] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await res.json()
      setUsers(data)
    }

    const fetchDoctors = async () => {
      const res = await fetch(`${BASE_URL}/admin/doctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await res.json()
      setDoctors(data)
    }

    fetchUsers()
    fetchDoctors()
  }, [])

  const approveDoctor = async (id) => {
    setLoading(true)
    const res = await fetch(`${BASE_URL}/admin/doctors/approve/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (res.ok) {
      toast.success('Doctor approved')
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === id ? { ...doc, isApproved: 'approved' } : doc
        )
      )
    } else {
      toast.error('Failed to approve doctor')
    }
    setLoading(false)
  }

  const deleteUser = async (id) => {
    setLoading(true)
    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (res.ok) {
      toast.success('User deleted')
      setUsers((prev) => prev.filter((user) => user._id !== id))
    } else {
      toast.error('Failed to delete user')
    }
    setLoading(false)
  }

  const deleteDoctor = async (id) => {
    setLoading(true)
    const res = await fetch(`${BASE_URL}/admin/doctors/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (res.ok) {
      toast.success('Doctor deleted')
      setDoctors((prev) => prev.filter((doctor) => doctor._id !== id))
    } else {
      toast.error('Failed to delete doctor')
    }
    setLoading(false)
  }

  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/login')
    toast.success('Logged out successfully')
  }

  const toggleUserDetails = (userId) => {
    setSelectedUserId((prev) => (prev === userId ? null : userId))
  }

  const toggleDoctorDetails = (doctorId) => {
    setSelectedDoctorId((prev) => (prev === doctorId ? null : doctorId))
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-headingColor text-[22px] leading-9 font-bold">
          Admin Dashboard
        </h1>
        <button
          onClick={logoutHandler}
          className="bg-primaryColor text-white text-[14px] leading-5 rounded-lg px-4 py-2"
        >
          Logout
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-headingColor text-[18px] leading-7 font-bold mb-5">
          Users
        </h2>
        <ul className="list-none">
          {users.map((user) => (
            <li
              key={user._id}
              className="mb-5 border-b border-solid border-[#0066ff61] py-2"
            >
              <div className="flex justify-between items-center">
                <span>
                  {user.name} - {user.email}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleUserDetails(user._id)}
                    className="bg-primaryColor text-white text-[14px] leading-5 rounded-lg px-4 py-2"
                  >
                    {selectedUserId === user._id
                      ? 'Hide Details'
                      : 'View Details'}
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white text-[14px] leading-5 rounded-lg px-4 py-2"
                  >
                    {loading ? (
                      <HashLoader size={15} color="#ffffff" />
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
              {selectedUserId === user._id && (
                <div className="bg-gray-100 p-5 rounded-lg shadow-md mt-5">
                  <h3 className="text-headingColor text-[20px] leading-7 font-bold mb-3">
                    User Details
                  </h3>
                  <div className="flex items-center">
                    {user.photo && (
                      <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center mr-5">
                        <img
                          src={user.photo}
                          alt="User"
                          className="w-full rounded-full"
                        />
                      </figure>
                    )}
                    <div>
                      <p>
                        <strong>Name:</strong> {user.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {user.phone}
                      </p>
                      <p>
                        <strong>Gender:</strong> {user.gender}
                      </p>
                      <p>
                        <strong>Blood Type:</strong> {user.bloodType}
                      </p>
                      <p>
                        <strong>Role:</strong> {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-headingColor text-[18px] leading-7 font-bold mb-5">
          Doctors
        </h2>
        <ul className="list-none">
          {doctors.map((doctor) => (
            <li
              key={doctor._id}
              className="mb-5 border-b border-solid border-[#0066ff61] py-2"
            >
              <div className="flex justify-between items-center">
                <span>
                  {doctor.name} - {doctor.email} - {doctor.isApproved}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleDoctorDetails(doctor._id)}
                    className="bg-primaryColor text-white text-[14px] leading-5 rounded-lg px-4 py-2"
                  >
                    {selectedDoctorId === doctor._id
                      ? 'Hide Details'
                      : 'View Details'}
                  </button>
                  {doctor.isApproved === 'pending' && (
                    <button
                      onClick={() => approveDoctor(doctor._id)}
                      className="bg-green-500 text-white text-[14px] leading-5 rounded-lg px-4 py-2"
                    >
                      {loading ? (
                        <HashLoader size={15} color="#ffffff" />
                      ) : (
                        'Approve'
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    className="bg-red-500 text-white text-[14px] leading-5 rounded-lg px-4 py-2"
                  >
                    {loading ? (
                      <HashLoader size={15} color="#ffffff" />
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
              {selectedDoctorId === doctor._id && (
                <div className="bg-gray-100 p-5 rounded-lg shadow-md mt-5">
                  <h3 className="text-headingColor text-[20px] leading-7 font-bold mb-3">
                    Doctor Details
                  </h3>
                  <div className="flex items-center">
                    {doctor.photo && (
                      <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center mr-5">
                        <img
                          src={doctor.photo}
                          alt="Doctor"
                          className="w-full rounded-full"
                        />
                      </figure>
                    )}
                    <div>
                      <p>
                        <strong>Name:</strong> {doctor.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {doctor.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {doctor.phone}
                      </p>
                      <p>
                        <strong>Specialization:</strong> {doctor.specialization}
                      </p>
                      <p>
                        <strong>Bio:</strong> {doctor.bio}
                      </p>
                      <p>
                        <strong>Qualifications:</strong>
                        <ul>
                          {doctor.qualifications.map((qualification, index) => (
                            <li key={index}>
                              {qualification.degree} from{' '}
                              {qualification.university} (
                              {qualification.startingDate} -{' '}
                              {qualification.endingDate})
                            </li>
                          ))}
                        </ul>
                      </p>
                      <p>
                        <strong>Experiences:</strong>
                        <ul>
                          {doctor.experiences.map((experience, index) => (
                            <li key={index}>
                              {experience.position} at {experience.hospital} (
                              {experience.startingDate} -{' '}
                              {experience.endingDate})
                            </li>
                          ))}
                        </ul>
                      </p>
                      <p>
                        <strong>Rating:</strong> {doctor.averageRating}
                      </p>
                      <p>
                        <strong>Approved:</strong> {doctor.isApproved}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard
