import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: "Ian Silva Sauro",
        email: "ian123@gmail.com",
        password: "minhasenha",
        date_birth: "2001-01-01",
      },
      {
        name: "Maria Souza",
        email: "maria@gmail.com",
        password: "senha123",
        date_birth: "2000-05-10",
      },
      {
        name: "João Santos",
        email: "joao.santos@gmail.com",
        password: "senha456",
        date_birth: "1995-11-23",
      },
    ])
  }
}
