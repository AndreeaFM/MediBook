import { useState, useContext } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../config'
import HashLoader from 'react-spinners/HashLoader'
import { toast } from 'react-toastify'
import { authContext } from '../../context/AuthContext' // Added this line to import authContext

const FeedbackForm = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const { token, role } = useContext(authContext) // Added this line to get token and role from authContext

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Authorization check
      if (role !== 'patient') {
        // Added this block for authorization check
        setLoading(false)
        return toast.error("You're not authorized")
      }

      // Validation check
      if (!rating || !reviewText) {
        // This block was already present for validation
        setLoading(false)
        return toast.error('Rating & Review Fields are required')
      }

      const response = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Added this line to include the token in the request headers
        },
        body: JSON.stringify({ rating, reviewText }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message)
      }

      toast.success('Review submitted successfully')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }

  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? 'text-yellowColor'
                    : 'text-gray-400'
                } bg-transparent border-none outline-none text-[22px] cursor-pointer  `}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0)
                  setRating(0)
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions*
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your message"
          onChange={(e) => setReviewText(e.target.value)} // Fixed this line to include 'e' parameter
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmitReview} className="btn">
        {loading ? <HashLoader size={25} color="#fff" /> : 'Submit Feedback'}
      </button>
    </form>
  )
}

export default FeedbackForm
