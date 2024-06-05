import React, { useState, useEffect, useContext } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { BASE_URL } from '../../config'
import { toast } from 'react-toastify'
import { authContext } from '../../context/AuthContext'

const SidePanel = ({ doctorId, ticketPrice }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableTimes, setAvailableTimes] = useState([])
  const { token } = useContext(authContext)
  const [selectedTime, setSelectedTime] = useState('')

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/doctors/${doctorId}/available-times`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (response.ok) {
          setAvailableTimes(data)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error('Error fetching available times')
      }
    }

    fetchAvailableTimes()
  }, [doctorId, token])

  const bookingHandler = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      if (data.session.url) {
        window.location.href = data.session.url
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const isDateAvailable = (date) => {
    const day = date
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase()
    return availableTimes.some((slot) => slot.day.toLowerCase() === day)
  }

  const availableSlots = availableTimes.filter((slot) => {
    const day = selectedDate
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase()
    return slot.day.toLowerCase() === day
  })

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[20px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} RON
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Dates
        </p>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileDisabled={({ date }) => !isDateAvailable(date)}
        />
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots
        </p>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="form__input"
        >
          <option value="">Select a time</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot.time}>
              {slot.time}
            </option>
          ))}
        </select>
      </div>

      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        Book Appointment
      </button>
    </div>
  )
}

export default SidePanel

//merge pe hours
