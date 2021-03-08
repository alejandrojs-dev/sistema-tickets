import Validator from 'validatorjs'
import ErrorHandler from '../classes/ErrorHandler'
import { ticketSubGroupRules, ticketSubGroupMessages } from '../rulesValidations/ticketSubGroup.rules'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import { Request, Response } from 'express'
import TicketSubGroup from '../entities/TicketSubGroup'

const trim = (str: string): string => {
  const trimString = str.replace(/\s\s+/g, ' ').trim()
  return trimString
}

const validatorRequest = (req: Request, res: Response, next): any => {
  const validator = new Validator(req.body.ticketSubGroup, ticketSubGroupRules, ticketSubGroupMessages)
  if (validator.fails()) {
    res.locals.validationErrors = validator.errors.all()
    next(new ErrorHandler(HttpStatus.UNPROCESSABLE_ENTITY, 'Errores de validación'))
  } else if (validator.passes()) {
    next()
  }
}

const createEntity = async (req: Request, res: Response, next): Promise<void> => {
  try {
    const { ticketGroupId, ticketTypeId, name, serviceLevel, numberAuth, active, icon } = req.body.ticketSubGroup
    const ticketSubGroup: TicketSubGroup = await TicketSubGroup.create()
    ticketSubGroup.group_ticket_id = ticketGroupId
    ticketSubGroup.ticket_type_id = ticketTypeId
    ticketSubGroup.name = trim(name)
    ticketSubGroup.service_level = serviceLevel
    ticketSubGroup.number_auth = numberAuth
    ticketSubGroup.icon = icon
    ticketSubGroup.active = active
    res.locals.entity = ticketSubGroup
    next()
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { validatorRequest, createEntity }
