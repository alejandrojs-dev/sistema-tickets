import express from 'express'
import { httpGet, httpGetById, httpPost, httpPut, httpDelete } from '../httpCallbacks/ticketType.callbacks'
import { validatorRequest, validateExistsEntity, createEntity } from '../middlewares/ticketType.middlewares'

const router = express.Router()
const middlewares: any = [validatorRequest, validateExistsEntity, createEntity]

router.get('/all', httpGet)
router.get('/show/:id', httpGetById)
router.post('/save', middlewares, httpPost)
router.put('/update/:id', [validatorRequest, createEntity], httpPut)
router.delete('/delete/:id', httpDelete)

export default router
