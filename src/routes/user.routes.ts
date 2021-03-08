import express from 'express'
import { httpGet, httpGetByGroup } from '../httpCallbacks/user.callbacks'

const router = express.Router()

router.get('/all', httpGet)
router.get('/byGroup/:groupId', httpGetByGroup)

export default router
