import express from 'express'
import {
  httpGet,
  httpGetWithRelationShips,
  httpGetById,
  httpPost,
  httpPut,
  httpDelete,
} from '../httpCallbacks/ticketGroup.callbacks'
import { validatorRequest, createEntity } from '../middlewares/ticketGroups.middlewares'
import uploadMulter from '../middlewares/multer.middleware'

const router = express.Router()
const middlewares: any = [uploadMulter, validatorRequest, createEntity]

router.get('/all', httpGet)
router.get('/allWithRelationShips', httpGetWithRelationShips)
router.get('/show/:id', httpGetById)
router.post('/save', middlewares, httpPost)
router.put('/update/:id', middlewares, httpPut)
router.delete('/delete/:id', httpDelete)

export default router
