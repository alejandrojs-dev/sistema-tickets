import { Request, Response } from 'express'
import { ticketSubGroupController } from '../inversify.config'
import { Response as JsonResponse } from '../classes/Response'
import { DeleteResult } from 'typeorm'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import TicketSubGroup from '../entities/TicketSubGroup'
import ErrorHandler from '../classes/ErrorHandler'

const httpGet = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const ticketSubGroups: TicketSubGroup[] = await ticketSubGroupController.index()
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Subgrupos de tickets recuperados con exito',
      data: ticketSubGroups,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetById = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id, ticketTypeId } = req.params
    const ticketSubGroup: TicketSubGroup = await ticketSubGroupController.show(Number(id), Number(ticketTypeId))
    const jsonResponse: any = {}
    if (!ticketSubGroup) {
      jsonResponse.ok = false
      jsonResponse.statusCode = HttpStatus.NOT_FOUND
      jsonResponse.message = 'Subgrupo de ticket no encontrado'
    } else {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Subgrupo de ticket recuperado con éxito'
      jsonResponse.data = ticketSubGroup
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpPost = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const localTicketSubGroup: TicketSubGroup = res.locals.entity
    const usersWhoAuthorize: number[] = req.body.usersWhoAuthorize
    const savedTicketSubGroup: TicketSubGroup = await ticketSubGroupController.store(
      localTicketSubGroup,
      usersWhoAuthorize,
    )
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.CREATED,
      message: 'Subgrupo de ticket creado con éxito',
      data: savedTicketSubGroup,
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
    const usersWhoAuthorize: number[] = req.body.usersWhoAuthorize
    const localTicketSubGroup: TicketSubGroup = res.locals.entity
    const updatedTicketSubGroup: TicketSubGroup = await ticketSubGroupController.update(
      Number(id),
      localTicketSubGroup,
      usersWhoAuthorize,
    )
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Subgrupo de ticket actualizado con éxito',
      data: updatedTicketSubGroup,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  } finally {
    delete res.locals.entity
  }
}

const httpDelete = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const result: DeleteResult = await ticketSubGroupController.delete(Number(id))
    const jsonResponse: any = {}
    if (result.affected > 0) {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Grupo de ticket eliminado con éxito'
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { httpGet, httpGetById, httpPost, httpPut, httpDelete }
