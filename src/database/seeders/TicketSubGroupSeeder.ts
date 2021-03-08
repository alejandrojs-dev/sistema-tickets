import TicketSubGroup from '../../entities/TicketSubGroup'
import Seeder from '../../classes/Seeder'
import Environment from '../../utils/Enviroment'

class TicketSubGroupSeeder extends Seeder {
  public async run(): Promise<void> {
    try {
      const {
        server: {
          app: {
            constants: { serviceLevel, numberAuth },
          },
        },
      } = Environment.local()

      const telLineExtensionFailures: TicketSubGroup = new TicketSubGroup()
      telLineExtensionFailures.group_ticket_id = 1
      telLineExtensionFailures.ticket_type_id = 2
      telLineExtensionFailures.name = 'Fallas en extensión de líneas telefónicas'
      telLineExtensionFailures.service_level = serviceLevel
      telLineExtensionFailures.number_auth = numberAuth
      telLineExtensionFailures.active = true
      telLineExtensionFailures.icon = 'mdi-phone-in-talk'
      await telLineExtensionFailures.save()

      const hardwareDevicesFailures: TicketSubGroup = new TicketSubGroup()
      hardwareDevicesFailures.group_ticket_id = 1
      hardwareDevicesFailures.ticket_type_id = 2
      hardwareDevicesFailures.name = 'Fallas en hardware de dispositivos'
      hardwareDevicesFailures.service_level = serviceLevel
      hardwareDevicesFailures.number_auth = numberAuth
      hardwareDevicesFailures.active = true
      hardwareDevicesFailures.icon = 'mdi-devices'
      await hardwareDevicesFailures.save()

      const hardwareRequests: TicketSubGroup = new TicketSubGroup()
      hardwareRequests.group_ticket_id = 1
      hardwareRequests.ticket_type_id = 2
      hardwareRequests.name = 'Solicitudes de hardware'
      hardwareRequests.service_level = serviceLevel
      hardwareRequests.number_auth = numberAuth
      hardwareRequests.active = true
      hardwareRequests.icon = 'mdi-cog-transfer'
      await hardwareRequests.save()

      const networkServiceFailures: TicketSubGroup = new TicketSubGroup()
      networkServiceFailures.group_ticket_id = 1
      networkServiceFailures.ticket_type_id = 2
      networkServiceFailures.name = 'Fallas en servicio de red'
      networkServiceFailures.service_level = serviceLevel
      networkServiceFailures.number_auth = numberAuth
      networkServiceFailures.active = true
      networkServiceFailures.icon = 'mdi-wan'
      await networkServiceFailures.save()

      const projectsCreation: TicketSubGroup = new TicketSubGroup()
      projectsCreation.group_ticket_id = 1
      projectsCreation.ticket_type_id = 2
      projectsCreation.name = 'Creación de proyectos'
      projectsCreation.service_level = serviceLevel
      projectsCreation.number_auth = numberAuth
      projectsCreation.active = true
      projectsCreation.icon = 'mdi-briefcase-plus'
      await projectsCreation.save()

      const applicationSoftwareFailures: TicketSubGroup = new TicketSubGroup()
      applicationSoftwareFailures.group_ticket_id = 2
      applicationSoftwareFailures.ticket_type_id = 2
      applicationSoftwareFailures.name = 'Fallas en software de aplicaciones'
      applicationSoftwareFailures.service_level = serviceLevel
      applicationSoftwareFailures.number_auth = numberAuth
      applicationSoftwareFailures.active = true
      applicationSoftwareFailures.icon = 'mdi-application-cog'
      await applicationSoftwareFailures.save()
    } catch (error) {
      console.log(error)
    }
  }
}

export default TicketSubGroupSeeder
