import { Service } from "typedi";
import { In, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import CreateUser from "../validationTypes/CreateUser";
import { Response } from "express";
import { BadRequest, Forbidden, InternalServerError, NotFound, Unauthorized } from "@tsed/exceptions";
import HashService from "./HashService";
import AuthService from "./AuthService";
import * as _ from "lodash"
const nodemailer = require('nodemailer')


@Service()
class UserService {
  public userRepository
  constructor(private hashService: HashService,
    private authService: AuthService) {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async create(inputs: CreateUser) {
    //check if user with same email exists
    let findIfExists = await this.userRepository.findOneBy({ email: inputs.email })
    if (findIfExists) throw new Forbidden('Email already exists')

    //hash password
    inputs.password = await this.hashService.hash(inputs.password)

    //insert user
    let created = await this.userRepository.save(inputs)

    //TODO send email for verifying
    await this.authService.sendMail(created).catch(console.error);

    //return user without password information
    return _.omit(created, ['password'])
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