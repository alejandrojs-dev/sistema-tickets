import { Request, Response } from 'express'
import { priorityController } from '../inversify.config'
import { Response as JsonResponse } from '../classes/Response'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import Priority from '../entities/Priority'
import ErrorHandler from '../classes/ErrorHandler'

const httpGet = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const priorities: Priority[] = await priorityController.index()
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Data recuperada con exito',
      data: priorities,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export default httpGet
