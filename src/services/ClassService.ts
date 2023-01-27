import { Service } from "typedi";
import { Between, In, Like, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../helpers/data-source";
import { BadRequest, Forbidden, InternalServerError, NotFound, Unauthorized } from "@tsed/exceptions";
import * as _ from "lodash"
import { Class } from "../entity/Class";
import UpdateClass from "../validationTypes/UpdateClass";
import CreateClass from "../validationTypes/CreateClass";
import { ClassUserComments } from "../entity/ClassUserComments";

@Service()
class ClassService {
  public classRepository
  public commentsRepository
  constructor() {
    this.classRepository = AppDataSource.getRepository(Class)
    this.commentsRepository = AppDataSource.getRepository(ClassUserComments)
  }

  async create(inputs: CreateClass) {
    return await this.classRepository.save(inputs)
  }

  async update(id: number, params: UpdateClass): Promise<Class> {
    //Fetch class
    let _class = await this.getOne(id)

    //Assign new values to existing class
    Object.assign(_class, params)
    return await this.classRepository.save(_class)
  }

  async delete(id: number): Promise<Class> {
    //Fetch class
    let _class = await this.getOne(id)
    await this.classRepository.delete(id)
    return _class
  }

  async filter(params: any): Promise<Class[]> {
    let { limit, ageLevel, duration, start, sportIds, page, keyword } = params
    limit = limit || 10

    //Formating where clause with filter options
    let whereClause: ObjectLiteral = {}
    if (_.isArray(ageLevel) && ageLevel.length) whereClause.ageLevel = In(ageLevel)
    if (_.isArray(duration) && duration.length) whereClause.duration = In(duration)
    if (_.isArray(sportIds) && sportIds.length) whereClause.sportId = In(sportIds)
    if (_.isArray(start) && start?.length == 2) whereClause.start = Between(start[0], start[1])
    if (keyword && keyword.length > 3) whereClause.description = Like(`%${keyword}%`)

    return await this.classRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: page ? (page - 1) * limit : 0,
      where: whereClause
    })
  }

  async getOne(id: number): Promise<Class> {
    let _class = await this.classRepository.findOneBy({ id: id })
    if (!_class) throw new NotFound('Class Not Found')
    return _class
  }

  async calculateAvg(id: number) {
    let _class = this.classRepository.createQueryBuilder('classes')
      .select(`(SELECT AVG(c.rating) FROM class_users c WHERE c.id = ${id})`, "averageRating")
      .getRawOne()
    if (!_class) throw new NotFound('Class with provided id not found')
    return _class
  }

  async getFeedbackComments(id: number, role: string): Promise<ClassUserComments[]> {
    let result = await this.commentsRepository.find({
      select: {
        userId: role == 'admin' ? true : false,
        comment: true,
        createdAt: true
      },
      relations: { user: role == 'admin' ? true : false },
      where: { classId: id },
      order: { createdAt: 'DESC' }
    })
    return result
  }
}

export default ClassService;