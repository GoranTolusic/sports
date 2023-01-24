import { Service } from "typedi";
import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

@Service()
class UserService {
  private userRepository
  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }
  async filter(params: any): Promise<User[]> {
    let limit = params.limit || 10
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: params.page ? (params.page - 1) * limit : 0,
      where: {
        role: In(params.role)
      }
    })
  }

  async getOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: id })
  }
}

export default UserService;