abstract class Seeder {
  private _name: string

  constructor(name: string = '') {
    this._name = name
  }

  get name(): string {
    return this._name
  }
  set name(value: string) {
    this._name = value
  }

  public async call(seeders: Seeder[]): Promise<void> {
    try {
      for (const seeder of seeders) {
        await this.execute(seeder)
      }
    } catch (error) {
      console.log(error)
    }
  }

  private async execute(seeder: Seeder): Promise<void> {
    try {
      await seeder.run()
    } catch (error) {
      console.log(error)
    }
  }

  public abstract run(): Promise<void>
}

export default Seeder
