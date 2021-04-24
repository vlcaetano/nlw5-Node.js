import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UsersRepository"


class UsersService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create(email: string) {
    // Verificar se o usuário existe
    const userExists = await this.usersRepository.findOne({
      email
    })

    // Se existir, retorna o user
    if (userExists) {
      return userExists
    }

    // Se não existir, salva no DB
    const user = this.usersRepository.create({
      email
    })

    await this.usersRepository.save(user)

    return user
  }

  async findByEmail(email) {
    return await this.usersRepository.findOne({email})
  }

  async findByID(id) {
    return await this.usersRepository.findOne({id})
  }
}

export { UsersService }