import { Request, Response } from 'express'
import { ticketTypesRules, ticketTypesMessages } from '../rulesValidations/ticketType.rules'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import { ticketTypeService } from '../inversify.config'
import Validator from 'validatorjs'
import ErrorHandler from '../classes/ErrorHandler'
import TicketType from '../entities/TicketType'

const trim = (str: string): string => {
  const trimString = str.replace(/\s\s+/g, ' ').trim()
  return trimString
}

const validatorRequest = (req: Request, res: Response, next): any => {
  const validator = new Validator(req.body, ticketTypesRules, ticketTypesMessages)
  if (validator.fails()) {
    res.locals.validationErrors = validator.errors.all()
    next(new ErrorHandler(HttpStatus.UNPROCESSABLE_ENTITY, 'Errores de validación'))
  } else if (validator.passes()) {
    next()
  }
}

const validateExistsEntity = async (req: Request, res: Response, next): Promise<void> => {
  try {
    const criteria = req.params.id ? Number(req.params.id) : trim(req.body.type)
    const exists: boolean = await ticketTypeService.validateEntityExists(criteria)
    if (exists) {
      next(
        new ErrorHandler(HttpStatus.CONFLICT, 'El tipo de ticket que quieres registrar ya se encuentra en existencia'),
      )
    } else next()
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const createEntity = async (req: Request, res: Response, next): Promise<void> => {
  try {
    const { type, active } = req.body
    const ticketType: TicketType = await TicketType.create()
    ticketType.type = trim(type)
    ticketType.active = active
    res.locals.entity = ticketType
    next()
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { validatorRequest, validateExistsEntity, createEntity }
