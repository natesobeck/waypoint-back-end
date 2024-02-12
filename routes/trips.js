import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as tripsCtrl from '../controllers/trips.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

// Trips

router.get('/', checkAuth, tripsCtrl.index)
router.get('/:tripId', checkAuth, tripsCtrl.show)
router.post('/', checkAuth, tripsCtrl.create)
router.delete('/:tripId', checkAuth, tripsCtrl.delete)
router.put('/:tripId', checkAuth, tripsCtrl.update)

// Expenses

router.post('/:tripId/expenses', checkAuth, tripsCtrl.createExpense)
router.delete('/:tripId/expenses/:expenseId', checkAuth, tripsCtrl.deleteExpense)
router.put('/:tripId/expenses/:expenseId', checkAuth, tripsCtrl.updateExpense)

// ScheduleDays

// router.get('/:tripId/itineraries/:itineraryId', checkAuth, tripsCtrl.showItinerary)
// router.post('/:tripId/itineraries', checkAuth, tripsCtrl.createItinerary)
// router.delete('/:tripId/itineraries/:itineraryId', checkAuth, tripsCtrl.deleteItinerary)
// router.put('/:tripId/itineraries/:itineraryId', checkAuth, tripsCtrl.updateItinerary)

// Packing List Item
router.post('/:tripId/packinglist', checkAuth, tripsCtrl.createPackingListItem)

// Schedule Items

router.get('/:tripId/schedule', checkAuth, tripsCtrl.indexScheduleItem)
router.get('/:tripId/schedule/:scheduleItemId', checkAuth, tripsCtrl.showScheduleItem)
router.post('/:tripId/schedule', checkAuth, tripsCtrl.createScheduleItem)
router.put('/:tripId/schedule/:scheduleItemId', checkAuth, tripsCtrl.updateScheduleItem)
router.delete('/:tripId/schedule/:scheduleItemId', checkAuth, tripsCtrl.deleteScheduleItem)

export { router }
