import express from 'express'
import { getAllReviews, createReview } from '../Controllers/reviewController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'

const router = express.Router({ mergeParams: true }) //to ensure that paramaters such as doctor id are accesible in nested route

// /doctor/doctorId/reviews use nested route

router
  .route('/')
  .get(getAllReviews)
  .post(authenticate, restrict(['patient']), createReview)

export default router
