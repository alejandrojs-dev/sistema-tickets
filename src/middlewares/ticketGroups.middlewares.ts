import express from 'express'
import { Request, Response } from 'express'
import { ticketGroupRules, ticketGroupMessages } from '../rulesValidations/ticketGroup.rules'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import { ticketGroupService } from '../inversify.config'
import { MulterRequest } from '../interfaces/MulterRequest.interface'
import { trim } from '../utils/generalFunctions'
import Validator from 'validatorjs'
import ErrorHandler from '../classes/ErrorHandler'
import TicketGroup from '../entities/TicketGroup'

const validatorRequest = (req: Request, res: Response, next): any => {
  const validator = new Validator(req.body.ticketGroup, ticketGroupRules, ticketGroupMessages)
  if (validator.fails()) {
    res.locals.validationErrors = validator.errors.all()
    next(new ErrorHandler(HttpStatus.UNPROCESSABLE_ENTITY, 'Errores de validación'))
  } else if (validator.passes()) {
    next()
  }
}

const validateExistsEntity = async (req: Request, res: Response, next): Promise<void> => {
  try {
    const criteria = req.params.id ? Number(req.params.id) : trim(req.body.name)
    const exists: boolean = await ticketGroupService.validateEntityExists(criteria)
    if (exists) {
      next(
        new ErrorHandler(HttpStatus.CONFLICT, 'El grupo de ticket que quieres registrar ya se encuentra en existencia'),
      )
    } else next()
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

// const createEntity = async (req: MulterRequest, res: express.Response, next): Promise<void> => {
//     try {
//         //console.log(req.body.ticketGroup)
//         const { name, description, active, assignedUsers } = req.body
//         const { filename } = req.file
//         const ticketGroup: TicketGroup = await TicketGroup.create()
//         ticketGroup.name = trim(name)
//         ticketGroup.description = description
//         ticketGroup.img = filename
//         ticketGroup.active = Boolean(active) //convertir entero a booleano
//         res.locals.entity = ticketGroup
//         res.locals.assignedUsers = assignedUsers.split(',')
//         next()
//     } catch (error) {
//         next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
//     }
// }

const createEntity = async (req: Request, res: Response, next): Promise<void> => {
  try {
    const { name, description, icon, active } = req.body.ticketGroup
    const ticketGroup: TicketGroup = await TicketGroup.create()
    ticketGroup.name = trim(name)
    ticketGroup.description = description
    ticketGroup.icon = icon ? icon : 'mdi-cog'
    ticketGroup.active = Boolean(active) //convertir entero a booleano
    res.locals.entity = ticketGroup
    next()
  } catch (error) {
    next(new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
  }
}

export { validatorRequest, validateExistsEntity, createEntity }
