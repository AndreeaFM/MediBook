{
  /*
import React, { useState, useEffect, useContext } from 'react'
import { BASE_URL } from '../../config'
import { toast } from 'react-toastify'
import { authContext } from '../../context/AuthContext'
import Loading from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'

const DoctorAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useContext(authContext)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/doctors/${doctorId}/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (response.ok) {
          setAppointments(data.data)
        } else {
          toast.error(data.message)
          setError(data.message)
        }
      } catch (error) {
        toast.error('Error fetching appointments')
        setError('Error fetching appointments')
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [doctorId, token])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error errMessage={error} />
  }

  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
              <p>Time: {appointment.time}</p>
              <p>Patient: {appointment.user.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DoctorAppointments
*/
}
