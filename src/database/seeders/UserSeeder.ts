import Seeder from '../../classes/Seeder'
import User from '../../entities/User'

class UserSeeder extends Seeder {
  public async run(): Promise<void> {
    try {
      const oscarCortesUser: User = new User()
      oscarCortesUser.user_id = 1
      oscarCortesUser.username = 'oscar.cortes'
      oscarCortesUser.roomName = 'SD'
      await oscarCortesUser.save()

      const alejandroLoeraUser: User = new User()
      alejandroLoeraUser.user_id = 2
      alejandroLoeraUser.username = 'alejandro.loera'
      alejandroLoeraUser.roomName = 'SD'
      await alejandroLoeraUser.save()

      const danielJimenezUser: User = new User()
      danielJimenezUser.user_id = 3
      danielJimenezUser.username = 'daniel.jimenez'
      danielJimenezUser.roomName = 'IT'
      await danielJimenezUser.save()
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserSeeder
