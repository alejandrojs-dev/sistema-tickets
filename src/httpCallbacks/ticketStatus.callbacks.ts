import { Request, Response } from 'express'
import { ticketStatusController } from '../inversify.config'
import { Response as JsonResponse } from '../classes/Response'
import { UpdateResult, DeleteResult } from 'typeorm'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import TicketStatus from '../entities/TicketStatus'
import ErrorHandler from '../classes/ErrorHandler'

const httpGet = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const ticketStatuses: TicketStatus[] = await ticketStatusController.index()
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Data recuperada con exito',
      data: ticketStatuses,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetById = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const ticketStatus: TicketStatus = await ticketStatusController.show(Number(id))
    const jsonResponse: any = {}
    if (!ticketStatus) {
      jsonResponse.ok = false
      jsonResponse.statusCode = HttpStatus.NOT_FOUND
      jsonResponse.message = 'Estatus de ticket no encontrado'
    } else {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Estatus de ticket recuperado con éxito'
      jsonResponse.data = ticketStatus
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpPost = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const localTicketStatus: TicketStatus = res.locals.entity
    const savedTicketStatus: TicketStatus = await ticketStatusController.store(localTicketStatus)
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.CREATED,
      message: 'Estatus de ticket creado con éxito',
      data: savedTicketStatus,
    })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  } finally {
    delete res.locals.entity
  }
}

const httpPut = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const localTicketStatus: TicketStatus = res.locals.entity
    const result: UpdateResult = await ticketStatusController.update(Number(id), localTicketStatus)
    const jsonResponse: any = {}
    if (result.affected > 0) {
      const updatedTicketStatus: TicketStatus = await ticketStatusController.show(Number(id))
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Estatus de ticket actualizado con éxito'
      jsonResponse.data = updatedTicketStatus
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
    const result: DeleteResult = await ticketStatusController.delete(Number(id))
    let jsonResponse: any = {}
    if (result.affected > 0) {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Estatus de ticket eliminado con éxito'
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { httpGet, httpGetById, httpPost, httpPut, httpDelete }
