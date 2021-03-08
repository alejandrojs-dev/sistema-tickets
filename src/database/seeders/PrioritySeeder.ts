import Seeder from '../../classes/Seeder'
import Priority from '../../entities/Priority'

class PrioritySeeder extends Seeder {
  public async run(): Promise<void> {
    try {
      const highPriority: Priority = new Priority()
      highPriority.description = 'Alta'
      highPriority.color = 'red'
      highPriority.active = true
      await highPriority.save()

      const mediumPriority: Priority = new Priority()
      mediumPriority.description = 'Media'
      mediumPriority.color = 'orange'
      mediumPriority.active = true
      await mediumPriority.save()

      const lowPriority: Priority = new Priority()
      lowPriority.description = 'Baja'
      lowPriority.color = 'green'
      lowPriority.active = true
      await lowPriority.save()
    } catch (error) {
      console.log(error)
    }
  }
}

export default PrioritySeeder
