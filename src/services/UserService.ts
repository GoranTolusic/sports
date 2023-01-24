import { Service } from "typedi";
import { User } from "../entity/User";

@Service()
class UserService {
  constructor() { }
  async filter(string: string): Promise<string> {
    return string;
  }

  async getOne(string: string): Promise<string> {
    return string;
  }
}

export default UserService;