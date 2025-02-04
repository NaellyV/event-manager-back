import { BaseSeeder } from '@adonisjs/lucid/seeders'
import History from '#models/history'

export default class extends BaseSeeder {
  public async run() {
    await History.createMany([
      {
        date: "2025-01-10",
        event_id: 1,
      },
      {
        date: "2025-01-15",
        event_id: 2,
      },
      {
        date: "2025-01-18",
        event_id: 1,
      },
    ])
  }
}
