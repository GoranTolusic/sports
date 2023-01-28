import { Service } from "typedi";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import { InternalServerError, MethodNotAllowed } from "@tsed/exceptions";
import { ClassUser } from "../entity/ClassUser";
import ClassService from "./ClassService";
import { omit } from "lodash";
import { ClassUserComments } from "../entity/ClassUserComments";
import { Sport } from "../entity/Sport";

@Service()
class CustomService {
  public userRepository
  public userClassRepository
  public commentsRepository
  public sportsRepository
  constructor(private readonly classService: ClassService) {
    this.userRepository = AppDataSource.getRepository(User)
    this.userClassRepository = AppDataSource.getRepository(ClassUser)
    this.commentsRepository = AppDataSource.getRepository(ClassUserComments)
    this.sportsRepository = AppDataSource.getRepository(Sport)
  }

  async enroll(req: any): Promise<boolean> {
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

    //Save data to db
    await this.userClassRepository.save({
      ...req.body._validated,
      userId: req.loggedUser.id
    })

    return true
  }

  async unenroll(req: any): Promise<boolean> {
    //check if class exists and unenroll from it
    let _class = await this.classService.getOne(req.params.id)
    await this.userClassRepository.delete({
      classId: _class.id,
      userId: req.loggedUser.id
    })

    return true
  }

  async rate(req: any): Promise<boolean> {
    //check if class exists and if user is enrolled
    let _class = await this.classService.getOne(req.body.classId)
    let userClass = await this.userClassRepository.findOne({
      where: {
        classId: _class.id,
        userId: req.loggedUser.id
      }
    })
    if (!userClass) throw new MethodNotAllowed('You are not enrolled to class. Enroll to class first to be able to rate it')

    //save rating changes to database
    Object.assign(userClass, omit(req.body._validated, ['classId']))
    await this.userClassRepository.save(userClass)

    return true
  }

  async comment(req: any): Promise<boolean> {
    //check if class exists and if user is enrolled
    let _class = await this.classService.getOne(req.body.classId)
    Object.assign(req.body._validated, { userId: req.loggedUser.id })
    await this.commentsRepository.save(req.body._validated)
    return true
  }

  async getSports(): Promise<Sport[]> {
    return await this.sportsRepository.find()
  }
}

export default CustomService