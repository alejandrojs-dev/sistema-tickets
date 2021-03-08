import { Request, Response } from 'express'
import { ticketGroupController } from '../inversify.config'
import { Response as JsonResponse } from '../classes/Response'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import { DeleteResult } from 'typeorm'
import { MulterRequest } from '../interfaces/MulterRequest.interface'
import { getFileImageData, findAndDeleteImage } from '../utils/generalFunctions'
import ErrorHandler from '../classes/ErrorHandler'
import TicketGroup from '../entities/TicketGroup'

const httpGet = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const ticketGroups: TicketGroup[] = await ticketGroupController.index()
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Grupos de ticket recuperados con éxito',
      data: ticketGroups,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetWithRelationShips = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const ticketGroups: TicketGroup[] = await ticketGroupController.indexWithRelationShips()
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Grupos de ticket recuperados con éxito',
      data: ticketGroups,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetById = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { id } = req.params
    const ticketGroup: TicketGroup = await ticketGroupController.show(Number(id))
    const jsonResponse: any = {}
    if (!ticketGroup) {
      jsonResponse.ok = false
      jsonResponse.statusCode = HttpStatus.NOT_FOUND
      jsonResponse.message = 'Grupo de ticket no encontrado'
    } else {
      jsonResponse.ok = true
      jsonResponse.statusCode = HttpStatus.OK
      jsonResponse.message = 'Grupo de ticket recuperado con éxito'
      jsonResponse.data = ticketGroup
      //jsonResponse.file = await getFileImageData(ticketGroup.img)
    }
    return new JsonResponse(res).giveBackJson(jsonResponse)
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpPost = async (req: MulterRequest, res: Response, next): Promise<any> => {
  try {
    const localTicketGroup: TicketGroup = res.locals.entity
    const assignedUsers: number[] = req.body.assignedUsers
    const savedTicketGroup: TicketGroup = await ticketGroupController.store(localTicketGroup, assignedUsers)
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: 201,
      message: 'Grupo de ticket creado con éxito',
      data: savedTicketGroup,
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
    const localTicketGroup: TicketGroup = res.locals.entity
    const assignedUsers: number[] = req.body.assignedUsers
    const updatedTicketGroup: TicketGroup = await ticketGroupController.update(
      Number(id),
      localTicketGroup,
      assignedUsers,
    )
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: 201,
      message: 'Grupo de ticket actualizado con éxito',
      data: updatedTicketGroup,
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
    const ticketGroup: TicketGroup = await TicketGroup.findOne(id)
    // const imgPath = path.join(__dirname, `../assets/uploads`)
    // findAndDeleteImage(imgPath, ticketGroup.img)
    const result: DeleteResult = await ticketGroupController.delete(Number(id))
    let jsonResponse: any = {}
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

export { httpGet, httpGetWithRelationShips, httpGetById, httpPost, httpPut, httpDelete }
