import { APITickets } from './APITickets'
import Enviroment from './utils/Enviroment'

const {
  server: { port },
} = Enviroment.local()

let api: APITickets = null

if (process.env.NODE_ENV === 'production') {
  console.log('App running in production mode')
} else {
  api = new APITickets(port)
}

export default api
