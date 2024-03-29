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

// Packing List Items

router.post('/:tripId/packinglist', checkAuth, tripsCtrl.createPackingListItem)
router.put('/:tripId/packinglist/:itemId', checkAuth, tripsCtrl.updatePackingListItem)
router.delete('/:tripId/packinglist/:itemId', checkAuth, tripsCtrl.deletePackingListItem)

// Schedule Items

router.post('/:tripId/schedule', checkAuth, tripsCtrl.createScheduleItem)
router.put('/:tripId/schedule/:itemId', checkAuth, tripsCtrl.updateScheduleItem)
router.delete('/:tripId/schedule/:itemId', checkAuth, tripsCtrl.deleteScheduleItem)

export { router }
