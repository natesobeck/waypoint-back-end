import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as tripsCtrl from '../controllers/trips.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, tripsCtrl.index)
router.get('/:tripId', checkAuth, tripsCtrl.show)
router.post('/', checkAuth, tripsCtrl.create)
router.delete('/:tripId', checkAuth, tripsCtrl.delete)
router.put('/:tripId', checkAuth, tripsCtrl.update)

export { router }
