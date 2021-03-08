import express from 'express'
import { httpGet, httpGetById, httpPost, httpPut, httpDelete } from '../httpCallbacks/ticketSubGroup.callbacks'
import { validatorRequest, createEntity } from '../middlewares/ticketSubGroup.middlewares'

const router = express.Router()
const middlewares: any = [validatorRequest, createEntity]

router.get('/all', httpGet)
router.get('/show/:id/:ticketTypeId', httpGetById)
router.post('/save', middlewares, httpPost)
router.put('/update/:id', middlewares, httpPut)
router.delete('/delete/:id', httpDelete)

export default router
