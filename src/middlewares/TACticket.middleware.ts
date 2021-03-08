import { Request, Response } from 'express'
import { ticketRules, ticketMessages } from '../rulesValidations/ticket.rules'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import Ticket from '../entities/Ticket'
import Validator from 'validatorjs'
import ErrorHandler from '../classes/ErrorHandler'

const validatorRequestTAC = (req: Request, res: Response, next): any => {
  const validator = new Validator(req.body.ticket, ticketRules, ticketMessages)
  if (validator.fails()) {
    res.locals.validationErrors = validator.errors.all()
    next(new ErrorHandler(HttpStatus.UNPROCESSABLE_ENTITY, 'Errores de validación'))
  } else if (validator.passes()) {
    next()
  }
}

const createEntityTAC = async (req: Request, res: Response, next): Promise<void> => {
  try {
    const {
      ticketGroupId,
      ticketSubGroupId,
      ticketTypeId,
      priorityId,
      description,
      userTicketCreate,
      ticketStatus,
    } = req.body.ticket

    const ticket = await Ticket.create()
    ticket.ticket_group_id = ticketGroupId
    ticket.ticket_subgroup_id = ticketSubGroupId
    ticket.ticket_type_id = ticketTypeId
    ticket.priority_id = priorityId
    ticket.description = description
    ticket.userTicketCreate = userTicketCreate
    ticket.ticket_status_id = ticketStatus
    res.locals.entity = ticket
    next()
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { validatorRequestTAC, createEntityTAC }
