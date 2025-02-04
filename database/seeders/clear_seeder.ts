import User from "#models/user"

export default class ClearUsersSeeder {
  public async run() {
    await User.query().delete()
    console.log('Todos os usuários foram removidos!')
  }
}
