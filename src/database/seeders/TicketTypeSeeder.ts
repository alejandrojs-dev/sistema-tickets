import TicketType from '../../entities/TicketType'
import Seeder from '../../classes/Seeder'

class TicketTypeSeeder extends Seeder {
  public async run(): Promise<void> {
    try {
      const TACticketType: TicketType = new TicketType()
      TACticketType.type = 'TAC'
      TACticketType.active = true
      await TACticketType.save()

      const TSticketType: TicketType = new TicketType()
      TSticketType.type = 'TS'
      TSticketType.active = true
      await TSticketType.save()
    } catch (error) {
      console.error(error)
    }
  }
}

export default TicketTypeSeeder
