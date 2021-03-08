import { Request, Response } from 'express'
import { ticketTypeController } from '../inversify.config'
import { Response as JsonResponse } from '../classes/Response'
import { UpdateResult, DeleteResult } from 'typeorm'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import ErrorHandler from '../classes/ErrorHandler'
import TicketType from '../entities/TicketType'

const httpGet = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const ticketTypes: TicketType[] = await ticketTypeController.index()
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Data recuperada con exito',
      data: ticketTypes,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetById = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const ticketType: TicketType = await ticketTypeController.show(Number(id))
    const jsonResponse: any = {}
    if (!ticketType) {
      jsonResponse.ok = false
      jsonResponse.statusCode = HttpStatus.NOT_FOUND
      jsonResponse.message = 'Tipo de ticket no encontrado'
    } else {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Tipo de ticket recuperado con éxito'
      jsonResponse.data = ticketType
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpPost = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const localTicketType: TicketType = res.locals.entity
    const savedTicketType: TicketType = await ticketTypeController.store(localTicketType)
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.CREATED,
      message: 'Tipo de ticket creado con éxito',
      data: savedTicketType,
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
    const localTicketType: TicketType = res.locals.entity
    const result: UpdateResult = await ticketTypeController.update(Number(id), localTicketType)
    const jsonResponse: any = {}
    if (result.affected > 0) {
      const updatedTicketType: TicketType = await ticketTypeController.show(Number(id))
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Tipo de ticket actualizado con éxito'
      jsonResponse.data = updatedTicketType
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
    const result: DeleteResult = await ticketTypeController.delete(Number(id))
    const jsonResponse: any = { res }
    if (result.affected > 0) {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Tipo de ticket eliminado con éxito'
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { httpGet, httpGetById, httpPost, httpPut, httpDelete }
