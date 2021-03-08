import express from 'express'
import {
  httpGet,
  httpGetTicketsToAuthorizeByUser,
  httpGetById,
  httpGetAuthorizedTicket,
  httpGetAuthorizeUsersByTicket,
  httpGetNotificationsByUser,
  httpPostTSTicket,
  httpPostTACTicket,
  httpPut,
  httpDelete,
  httpTake,
  httpReassign,
  httpCancel,
  httpPause,
  httpResume,
  httpAuthorize,
  httpDecline,
  httpUpdateSemaphoreColor,
  httpUpdateViewedStatus,
  httpGetSumDeadTimesTicket,
} from '../httpCallbacks/ticket.callbacks'
import { validatorRequestTAC, createEntityTAC } from '../middlewares/TACticket.middleware'
import { validatorRequestTS, createEntityTS } from '../middlewares/TSticket.middleware'

const router = express.Router()
const middlewaresTS: any = [validatorRequestTS, createEntityTS]
const middlewaresTAC: any = [validatorRequestTAC, createEntityTAC]

router.get('/allByUserId/:userId', httpGet)
router.get('/toAuthorizeByUser/:userId', httpGetTicketsToAuthorizeByUser)
router.get('/authorizeUsersByTicket/:id', httpGetAuthorizeUsersByTicket)
router.get('/show/:id', httpGetById)
router.get('/showAuthorizedTicket/:id/:userId', httpGetAuthorizedTicket)
router.get('/notificationsByUser/:userId', httpGetNotificationsByUser)
router.get('/sumDeadTimesTicket/:id', httpGetSumDeadTimesTicket)
router.post('/saveTSTicket', middlewaresTS, httpPostTSTicket)
router.post('/saveTACTicket', middlewaresTAC, httpPostTACTicket)
router.put('/update/:id', httpPut)
router.put('/updateSemaphoreColor/:id', httpUpdateSemaphoreColor)
router.put('/updateViewedStatus/:id', httpUpdateViewedStatus)
router.put('/take/:id', httpTake)
router.put('/reassign/:id', httpReassign)
router.put('/cancel/:id', httpCancel)
router.put('/pause/:id', httpPause)
router.put('/resume/:id', httpResume)
router.put('/authorize/:id', httpAuthorize)
router.put('/decline/:id', httpDecline)
router.delete('/delete/:id', httpDelete)

export default router
