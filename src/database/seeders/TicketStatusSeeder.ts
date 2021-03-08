import TicketStatus from '../../entities/TicketStatus'
import Seeder from '../../classes/Seeder'

class TicketStatusSeeder extends Seeder {
  public async run(): Promise<void> {
    try {
      const newTicketStatus: TicketStatus = new TicketStatus()
      newTicketStatus.status = 'Nuevo'
      newTicketStatus.color = 'blue'
      newTicketStatus.active = true
      await newTicketStatus.save()

      const assignedTicketStatus: TicketStatus = new TicketStatus()
      assignedTicketStatus.status = 'Asignado'
      assignedTicketStatus.color = 'lowBlue'
      assignedTicketStatus.active = true
      await assignedTicketStatus.save()

      const stoppedTicketStatus: TicketStatus = new TicketStatus()
      stoppedTicketStatus.status = 'Detenido'
      stoppedTicketStatus.color = 'orange'
      stoppedTicketStatus.active = true
      await stoppedTicketStatus.save()

      const finishedTicketStatus: TicketStatus = new TicketStatus()
      finishedTicketStatus.status = 'Finalizado'
      finishedTicketStatus.color = 'green'
      finishedTicketStatus.active = true
      await finishedTicketStatus.save()

      const reassignedTicketStatus: TicketStatus = new TicketStatus()
      reassignedTicketStatus.status = 'Reasignado'
      reassignedTicketStatus.color = 'indigo'
      reassignedTicketStatus.active = true
      await reassignedTicketStatus.save()

      const waitingTicketStatus: TicketStatus = new TicketStatus()
      waitingTicketStatus.status = 'En autorización'
      waitingTicketStatus.color = 'amber'
      waitingTicketStatus.active = true
      await waitingTicketStatus.save()

      const cancelTicketStatus: TicketStatus = new TicketStatus()
      cancelTicketStatus.status = 'Cancelado'
      cancelTicketStatus.color = 'red'
      cancelTicketStatus.active = true
      await cancelTicketStatus.save()

      const declinedTicketStatus: TicketStatus = new TicketStatus()
      declinedTicketStatus.status = 'Declinado'
      declinedTicketStatus.color = 'greyLow'
      declinedTicketStatus.active = true
      await declinedTicketStatus.save()
    } catch (error) {
      console.error(error)
    }
  }
}

export default TicketStatusSeeder
