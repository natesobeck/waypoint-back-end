import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as itinerariesCtrl from '../controllers/itineraries.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:itineraryId', checkAuth, itinerariesCtrl.show)
router.post('/', checkAuth, itinerariesCtrl.create)

export { router }