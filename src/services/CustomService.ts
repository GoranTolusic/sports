import { Service } from "typedi";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import { MethodNotAllowed } from "@tsed/exceptions";
import { ClassUser } from "../entity/ClassUser";
import ClassService from "./ClassService";

@Service()
class CustomService {
  public userRepository
  public userClassRepository
  constructor(private readonly classService: ClassService) {
    this.userRepository = AppDataSource.getRepository(User)
    this.userClassRepository = AppDataSource.getRepository(ClassUser)
  }

  async enroll(req: any) {
    //check if class exists
    let _class = await this.classService.getOne(req.body.classId)

    //check conditions and business logic if user is able to participate in class
    if (Date.now() > _class.start) throw new MethodNotAllowed('Unable to enroll in past classes')
    if ((await this.userClassRepository.count({ where: { userId: req.loggedUser.id } })) >= 2) throw new MethodNotAllowed('You are already enrolled in two classes')

    let userClassMeta = await this.userClassRepository.find({
      where: {
        classId: _class.id
      },
      take: 10
    })

    if (userClassMeta.length >= 10) throw new MethodNotAllowed('Class is full. Maximum of 10 users is allowed per one class course')
    if (userClassMeta.find(item => item.userId == req.loggedUser.id)) throw new MethodNotAllowed('You are alreay enrolled in current class')

    await this.userClassRepository.save({
      ...req.body._validated,
      userId: req.loggedUser.id
    })

    return
  }

  async unenroll(req: any) {
    return "hello"
  }

  async rate(req: any) {
    return "hello"
  }

  async comment(req: any) {
    return "hello"
  }

}

export default CustomService