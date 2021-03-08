import { Request, Response } from 'express'
import { ticketController } from '../inversify.config'
import { Response as JsonResponse } from '../classes/Response'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import { Notification } from '../classes/Notification'
import Ticket from '../entities/Ticket'
import ErrorHandler from '../classes/ErrorHandler'

const httpGet = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { userId } = req.params
    const tickets: any[] = await ticketController.index(parseInt(userId))
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Tickets recuperados con éxito',
      data: tickets,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetTicketsToAuthorizeByUser = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { userId } = req.params
    console.log(userId)
    const tickets: any[] = await ticketController.getTicketsToAuthorizeByUser(parseInt(userId))
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Tickets recuperados con éxito',
      data: tickets,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetById = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const ticket: Ticket = await ticketController.show(parseInt(id))
    const jsonResponse: any = {}
    if (!ticket) {
      jsonResponse.ok = false
      jsonResponse.statusCode = HttpStatus.NOT_FOUND
      jsonResponse.message = 'Ticket no encontrado'
    } else {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Ticket recuperado con éxito'
      jsonResponse.data = ticket
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetAuthorizedTicket = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id, userId } = req.params
    const ticket: Ticket = await ticketController.showAuthorizedTicket(parseInt(id), parseInt(userId))
    const jsonResponse: any = {}
    if (!ticket) {
      jsonResponse.ok = false
      jsonResponse.statusCode = HttpStatus.NOT_FOUND
      jsonResponse.message = 'Ticket no encontrado'
    } else {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Ticket recuperado con éxito'
      jsonResponse.data = ticket
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetAuthorizeUsersByTicket = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const authorizeUsers: any[] = await ticketController.getAuthorizeUsersByTicket(parseInt(id))
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'usuarios recuperados con éxito',
      data: authorizeUsers,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetNotificationsByUser = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { userId } = req.params

    const result: any = await Notification.getGeneralNotificationsData(parseInt(userId))

    const notifications = result.notifications
    const notificationsCount = result.notificationsCount
    const authTicketsCount = result.authTicketsCount
    const ticketsTrayCount = result.ticketsTrayCount

    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      notifications,
      notificationsCount,
      authTicketsCount,
      ticketsTrayCount,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpPostTSTicket = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const localTicket: Ticket = res.locals.entity
    const savedTicket: Ticket = await ticketController.storeTSTicket(localTicket)
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Ticket creado con éxito',
      data: savedTicket,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  } finally {
    delete res.locals.entity
  }
}

const httpPostTACTicket = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const localTicket: Ticket = res.locals.entity
    const usersWhoAuthorize: number[] = req.body.usersWhoAuthorize
    const savedTicket: Ticket = await ticketController.storeTACTicket(localTicket, usersWhoAuthorize)
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Ticket creado con éxito',
      data: savedTicket,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  } finally {
    delete res.locals.entity
  }
}

const httpPut = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const localTicket: Ticket = res.locals.entity
    const result: UpdateResult = await ticketController.update(parseInt(id), localTicket)
    const jsonResponse: any = {}
    if (result.affected > 0) {
      const updatedTicket: Ticket = await ticketController.show(parseInt(id))
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Ticket actualizado con éxito'
      jsonResponse.data = updatedTicket
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  } finally {
    delete res.locals.entity
  }
}

const httpDelete = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const result: DeleteResult = await ticketController.delete(parseInt(id))
    const jsonResponse: any = {}
    if (result.affected > 0) {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Ticket eliminado con éxito'
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpTake = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { status, userTakeTicketId, semaphoreColor, isViewed } = req.body
    const jsonResponse: any = {}

    const response: any = await ticketController.take(parseInt(id), status, userTakeTicketId, semaphoreColor, isViewed)

    jsonResponse.ok = true
    jsonResponse.statusCode = HttpStatus.OK
    jsonResponse.message = 'Ticket tomado'
    jsonResponse.taken = response.taken
    jsonResponse.ticket = response.ticket

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpReassign = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { userIdToAssign, userIdWhoAssign, status, isViewed } = req.body
    const jsonResponse: any = {}

    const response: any = await ticketController.reassign(
      parseInt(id),
      userIdWhoAssign,
      userIdToAssign,
      status,
      isViewed,
    )

    jsonResponse.ok = true
    jsonResponse.statusCode = HttpStatus.OK
    jsonResponse.message = 'Ticket tomado'
    jsonResponse.reassigned = response.reassigned
    jsonResponse.ticket = response.ticket

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpCancel = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { status, userCancelTicketId, cancelComment, expired } = req.body
    const jsonResponse: any = {}

    const response: any = await ticketController.cancel(
      parseInt(id),
      status,
      userCancelTicketId,
      cancelComment,
      expired,
    )

    jsonResponse.ok = true
    jsonResponse.statusCode = HttpStatus.OK
    jsonResponse.message = 'Ticket cancelado'
    jsonResponse.canceled = response.canceled
    jsonResponse.ticket = response.ticket

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpPause = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { status, userPauseTicketId, pauseComment } = req.body
    const jsonResponse: any = {}

    const response: any = await ticketController.pause(parseInt(id), status, userPauseTicketId, pauseComment)

    jsonResponse.ok = true
    jsonResponse.statusCode = HttpStatus.OK
    jsonResponse.message = 'Ticket pausado'
    jsonResponse.paused = response.paused
    jsonResponse.ticket = response.ticket

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpResume = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { userResumeTicketId } = req.body
    const jsonResponse: any = {}

    const response: any = await ticketController.resume(parseInt(id), userResumeTicketId)

    jsonResponse.ok = true
    jsonResponse.statusCode = HttpStatus.OK
    jsonResponse.message = 'Ticket reanudado'
    jsonResponse.resumed = response.resumed
    jsonResponse.ticket = response.ticket

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpAuthorize = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { status, userAuthorizeId, subGroupId } = req.body
    const jsonResponse: any = {}

    const response: any = await ticketController.authorize(parseInt(id), status, userAuthorizeId, subGroupId)

    jsonResponse.ok = true
    jsonResponse.statusCode = HttpStatus.OK
    jsonResponse.message = response.isCompletelyAuthorized ? 'Ticket autorizado' : 'Autorización concedida'
    jsonResponse.isCompletelyAuthorized = response.isCompletelyAuthorized
    jsonResponse.ticket = response.ticket

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpDecline = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { status, userDeclineId, declineComment } = req.body
    const jsonResponse: any = {}

    const response: any = await ticketController.decline(parseInt(id), status, userDeclineId, declineComment)

    jsonResponse.ok = true
    jsonResponse.statusCode = HttpStatus.OK
    jsonResponse.message = 'Ticket declinado'
    jsonResponse.declined = response.declined
    jsonResponse.ticket = response.ticket

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpUpdateSemaphoreColor = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { semaphoreColor, expired } = req.body

    const result: UpdateResult = await ticketController.updateSemaphoreColor(Number(id), semaphoreColor, expired)
    const jsonResponse: any = {}

    if (result.affected > 0) {
      const updatedTicket: Ticket = await ticketController.show(Number(id))
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Ticket actualizado con éxito'
      jsonResponse.data = updatedTicket
    }

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpUpdateViewedStatus = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const { isViewed } = req.body

    const response: any = await ticketController.updateViewedStatus(Number(id), isViewed)
    const jsonResponse: any = {}

    jsonResponse.ok = true
    jsonResponse.statusCode = HttpStatus.OK
    jsonResponse.message = 'Notificación vista'
    jsonResponse.ticket = response

    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetSumDeadTimesTicket = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const sumDeadTimesTicket: number = await ticketController.getSumDeadTimesTicket(Number(id))
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      sumDeadTimesTicket,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export {
  httpGet,
  httpGetTicketsToAuthorizeByUser,
  httpGetAuthorizedTicket,
  httpGetAuthorizeUsersByTicket,
  httpGetById,
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
}
