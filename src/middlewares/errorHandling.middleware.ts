import { Request, Response } from 'express'
import { Response as JsonResponse } from '../classes/Response'
import ErrorHandler from '../classes/ErrorHandler'

const errorHandling = (error: ErrorHandler, req: Request, res: Response, next): any => {
  if (error) {
    let response: any = { ok: false, statusCode: error.statusCode, message: error.message }

    if (error.statusCode === 422) {
      response.errors = res.locals.validationErrors
      delete res.locals.validationErrors
    }
    return new JsonResponse(res).giveBackJson(response)
  }
}

export default errorHandling
