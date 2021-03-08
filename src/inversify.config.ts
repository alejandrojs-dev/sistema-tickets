import { Container } from 'inversify'
import TYPES from './utils/types'
import TicketTypeService from './services/TicketTypeService'
import TicketTypeController from './controllers/TicketTypeController'
import TicketGroupService from './services/TicketGroupService'
import TicketGroupController from './controllers/TicketGroupController'
import TicketSubGroupService from './services/TicketSubGroupService'
import TicketSubGroupController from './controllers/TicketSubGroupController'
import TicketStatusService from './services/TicketStatusService'
import TicketStatusController from './controllers/TicketStatusController'
import TicketService from './services/TicketService'
import TicketController from './controllers/TicketController'
import UserService from './services/UserService'
import UserController from './controllers/UserController'
import PriorityService from './services/PriorityService'
import PriorityController from './controllers/PriorityController'

const container: Container = new Container()

container.bind<TicketController>(TYPES.TicketController).to(TicketController).inSingletonScope()
container.bind<TicketService>(TYPES.TicketService).to(TicketService).inSingletonScope()

container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope()
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope()

container.bind<TicketTypeController>(TYPES.TicketTypeController).to(TicketTypeController).inSingletonScope()
container.bind<TicketTypeService>(TYPES.TicketTypeService).to(TicketTypeService).inSingletonScope()

container.bind<PriorityController>(TYPES.PriorityController).to(PriorityController).inSingletonScope()
container.bind<PriorityService>(TYPES.PriorityService).to(PriorityService).inSingletonScope()

container.bind<TicketGroupController>(TYPES.TicketGroupController).to(TicketGroupController).inSingletonScope()
container.bind<TicketGroupService>(TYPES.TicketGroupService).to(TicketGroupService).inSingletonScope()

container.bind<TicketSubGroupController>(TYPES.TicketSubGroupController).to(TicketSubGroupController).inSingletonScope()
container.bind<TicketSubGroupService>(TYPES.TicketSubGroupService).to(TicketSubGroupService).inSingletonScope()

container.bind<TicketStatusController>(TYPES.TicketStatusController).to(TicketStatusController).inSingletonScope()
container.bind<TicketStatusService>(TYPES.TicketStatusService).to(TicketStatusService).inSingletonScope()

const ticketService: TicketService = container.resolve(TicketService)
const userService: UserService = container.resolve(UserService)
const ticketTypeService: TicketTypeService = container.resolve(TicketTypeService)
const priorityService: PriorityService = container.resolve(PriorityService)
const ticketGroupService: TicketGroupService = container.resolve(TicketGroupService)
const ticketSubGroupService: TicketSubGroupService = container.resolve(TicketSubGroupService)
const ticketStatusService: TicketStatusService = container.resolve(TicketStatusService)

const ticketController: TicketController = container.resolve(TicketController)
const userController: UserController = container.resolve(UserController)
const ticketTypeController: TicketTypeController = container.resolve(TicketTypeController)
const priorityController: PriorityController = container.resolve(PriorityController)
const ticketGroupController: TicketGroupController = container.resolve(TicketGroupController)
const ticketSubGroupController: TicketSubGroupController = container.resolve(TicketSubGroupController)
const ticketStatusController: TicketStatusController = container.resolve(TicketStatusController)

export {
  userService,
  userController,
  ticketService,
  ticketController,
  ticketTypeService,
  ticketTypeController,
  priorityService,
  priorityController,
  ticketGroupService,
  ticketGroupController,
  ticketSubGroupService,
  ticketSubGroupController,
  ticketStatusService,
  ticketStatusController,
}
