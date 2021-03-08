import npm from 'npm'
import { getConnectionManager } from 'typeorm'

// npm.load(() => {
//   const migrations = getConnectionManager().get('ticketsConnection').migrations
//   console.log(migrations)
//   if (migrations.length > 0) console.log('Si hay migraciones')
//   else console.log('no hay migraciones')
// })

const migrations = getConnectionManager().connections
console.log(migrations)
