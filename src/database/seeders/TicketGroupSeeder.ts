import Seeder from '../../classes/Seeder'
import fileSystem from 'fs'
import path from 'path'
import TicketGroup from '../../entities/TicketGroup'
import User from '../../entities/User'

class TicketGroupSeeder extends Seeder {
  public generateImgIdentifier(filename): string {
    const uniqueSuffix: string = `${Date.now()}${Math.round(Math.random() * 1e9)}`
    const identifier: string = `${uniqueSuffix}-${filename}`
    return identifier
  }

  public renameImgFiles(filenames: string[]): void {
    for (let i = 0; i < filenames.length; i++) {
      const oldPath: string = path.join(__dirname, `../../assets/uploads/${filenames[i]}`)
      const newPath: string = path.join(__dirname, `../../assets/uploads/${this.generateImgIdentifier(filenames[i])}`)
      fileSystem.renameSync(oldPath, newPath)
    }
  }

  public async run(): Promise<void> {
    try {
      const userOscarCortes: User = await User.findOne({ user_id: 1 })
      const userAlejandroLoera: User = await User.findOne({ user_id: 2 })
      const userDanielJimenez: User = await User.findOne({ user_id: 3 })

      const ITGroup: TicketGroup = new TicketGroup()
      ITGroup.name = 'IT'
      ITGroup.active = true
      ITGroup.description = 'Tecnologías de la información'
      ITGroup.icon = 'mdi-access-point'
      ITGroup.users = [userDanielJimenez, userOscarCortes]
      await ITGroup.save()

      const SDGroup: TicketGroup = new TicketGroup()
      SDGroup.name = 'SD'
      SDGroup.active = true
      SDGroup.description = 'Software Development'
      SDGroup.icon = 'mdi-monitor'
      SDGroup.users = [userAlejandroLoera, userOscarCortes]
      await SDGroup.save()

      const SACGroup: TicketGroup = new TicketGroup()
      SACGroup.name = 'SAC'
      SACGroup.active = true
      SACGroup.description = 'Servicio al cliente'
      SACGroup.icon = 'mdi-account-group'
      await SACGroup.save()

      const ADMINGroup: TicketGroup = new TicketGroup()
      ADMINGroup.name = 'ADMIN'
      ADMINGroup.active = false
      ADMINGroup.description = 'Administración'
      ADMINGroup.icon = 'mdi-briefcase'
      await ADMINGroup.save()

      const RHGroup: TicketGroup = new TicketGroup()
      RHGroup.name = 'RH'
      RHGroup.active = false
      RHGroup.description = 'Recursos Humanos'
      RHGroup.icon = 'mdi-account-multiple'
      await RHGroup.save()

      // const filenames: string[] = []
      // filenames.push(ITGroup.img, SDGroup.img, SACGroup.img, ADMINGroup.img, RHGroup.img)
      // this.renameImgFiles(filenames)
    } catch (error) {
      console.error(error)
    }
  }
}

export default TicketGroupSeeder
