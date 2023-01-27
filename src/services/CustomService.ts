import { Service } from "typedi";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import { BadRequest, Forbidden, InternalServerError, NotFound, Unauthorized } from "@tsed/exceptions";
import { ClassUser } from "../entity/ClassUser";

@Service()
class CustomService {
  public userRepository
  public userClassRepository
  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
    this.userClassRepository = AppDataSource.getRepository(ClassUser)
  }

  async enroll(req: any) {
    return "hello"
  }

  async unenroll(req: any) {
    return "hello"
  }

  async rate(req: any) {
    return "hello"
  }

  async comment(req: any){
    return "hello"
  }

}

export default CustomService