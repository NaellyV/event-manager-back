import Event from '#models/event'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run() {
    await Event.createMany([
      {
        name: "Workshop de Programação",
        date: "2025-01-20",
        hour: "14:00",
        longitude: -46.633308,
        latitude: -23.550520,
        description: "Aprenda programação com especialistas.",
        userId: 2, 
        idAdmin: 1,
      },
      {
        name: "Palestra de IA",
        date: "2025-02-15",
        hour: "10:00",
        longitude: -46.638900,
        latitude: -23.548000,
        description: "Descubra o impacto da IA na tecnologia.",
        userId: 3, 
        idAdmin: 2, 
      },
    ])
  }
}
