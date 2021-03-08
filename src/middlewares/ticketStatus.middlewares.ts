import Validator from 'validatorjs'
import ErrorHandler from '../classes/ErrorHandler'
import { Request, Response } from 'express'
import { ticketTypesRules, ticketTypesMessages } from '../rulesValidations/ticketType.rules'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import { ticketStatusService } from '../inversify.config'
import TicketStatus from '../entities/TicketStatus'

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
    const criteria = req.params.id ? Number(req.params.id) : trim(req.body.status)
    const exists: boolean = await ticketStatusService.validateEntityExists(criteria)
    if (exists) {
      next(
        new ErrorHandler(
          HttpStatus.CONFLICT,
          'El estatus de ticket que quieres registrar ya se encuentra en existencia',
        ),
      )
    } else next()
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

const createEntity = async (req: Request, res: Response, next): Promise<void> => {
  try {
    const { status, active } = req.body
    const ticketStatus: TicketStatus = await TicketStatus.create()
    ticketStatus.status = trim(status)
    ticketStatus.active = active
    res.locals.entity = ticketStatus
    next()
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { validatorRequest, validateExistsEntity, createEntity }
