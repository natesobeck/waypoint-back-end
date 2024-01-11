import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as tripsCtrl from '../controllers/trips.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

// trips
router.get('/', checkAuth, tripsCtrl.index)
router.get('/:tripId', checkAuth, tripsCtrl.show)
router.post('/', checkAuth, tripsCtrl.create)
router.delete('/:tripId', checkAuth, tripsCtrl.delete)
router.put('/:tripId', checkAuth, tripsCtrl.update)

// expenses
router.post('/:tripId/expenses', checkAuth, tripsCtrl.createExpense)
router.delete('/:tripId/expenses/:expenseId', checkAuth, tripsCtrl.deleteExpense)
router.put('/:tripId/expenses/:expenseId', checkAuth, tripsCtrl.updateExpense)

// itineraries
router.get('/:tripId/itineraries/:itineraryId', checkAuth, tripsCtrl.showItinerary)
router.post('/:tripId/itineraries', checkAuth, tripsCtrl.createItinerary)

export { router }
