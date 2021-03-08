import { Request, Response } from 'express'
import { userController } from '../inversify.config'
import { Response as JsonResponse } from '../classes/Response'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import User from '../entities/User'
import ErrorHandler from '../classes/ErrorHandler'

const httpGet = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const users: User[] = await userController.index()
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Data recuperada con exito',
      data: users,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const httpGetByGroup = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const { groupId } = req.params
    const usersByGroup: User[] = await userController.getUsersByGroup(Number(groupId))
    return new JsonResponse(res).giveBackJson({
      ok: true,
      statusCode: HttpStatus.OK,
      message: 'Data recuperada con exito',
      data: usersByGroup,
    })
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { httpGet, httpGetByGroup }
