import express from 'express'
import httpGet from '../httpCallbacks/priority.callbacks'

const router = express.Router()

router.get('/all', httpGet)

export default router
