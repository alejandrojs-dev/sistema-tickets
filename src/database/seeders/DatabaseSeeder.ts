import Seeder from '../../classes/Seeder'
import TicketTypeSeeder from './TicketTypeSeeder'
import TicketGroupSeeder from './TicketGroupSeeder'
import TicketSubGroupSeeder from './TicketSubGroupSeeder'
import TicketStatusSeeder from './TicketStatusSeeder'
import PrioritySeeder from './PrioritySeeder'
import UserSeeder from './UserSeeder'

class DataBaseSeeder extends Seeder {
  public async run(): Promise<void> {
    await this.call([
      new UserSeeder('UserSeeder'),
      new TicketTypeSeeder('TicketTypeSeeder'),
      new TicketGroupSeeder('TicketGroupSeeder'),
      new TicketSubGroupSeeder('TicketSubGroupSeeder'),
      new TicketStatusSeeder('TicketStatusSeeder'),
      new PrioritySeeder('PrioritySeeder'),
    ])
  }
}

export default DataBaseSeeder
