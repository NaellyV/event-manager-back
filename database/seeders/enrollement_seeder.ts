import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Enrollement from '#models/enrollement'

export default class extends BaseSeeder {
  public async run() {
    await Enrollement.createMany([
      {
        date: new Date(),
        userId: 1,
        event_id: 1,
      },
      {
        date: new Date(),
        userId: 2,
        event_id: 2,
      },
    ])
  }
}
