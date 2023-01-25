import { Forbidden, NotFound, Unauthorized } from "@tsed/exceptions";
import { Service } from "typedi";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import UserService from '../services/UserService';
import HashService from "./HashService";
import JWTService from "./JWTService";
import * as _ from "lodash"
const nodemailer = require('nodemailer')

@Service()
class AuthService {
  private userRepository
  constructor(private readonly userService: UserService,
    private hashService: HashService,
    private jwtService: JWTService) {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async login(body: any): Promise<string> {
    //get user with Password
    let user = await this.getUserWithPasswordAndVerified({ email: body.email }, 'email')
    //check if password matches with hashed one
    let matches = await this.hashService.comparePasswords(body.password, user?.password || '')
    if (!matches) throw new Unauthorized('Incorrect password. Try Again!')
    if (!user?.verified) throw new Forbidden('You are not verified yet, please verify your email')
    //return accessToken 
    let result = this.jwtService.generateToken(_.omit(user, ['password']))
    return result
  }

  async getUserWithPasswordAndVerified(param: any, columnName: string) {
    let user = this.userRepository.createQueryBuilder('users')
      .addSelect('users.password')
      .where(`users.${columnName} = :${columnName}`, param)
      .getOne()
    if (!user) throw new NotFound('User with provided email not found')
    return user
  }

  async verifyToken(params: any) {
    let user = await this.userRepository.findOneBy({
      verifyToken: params.verifyToken,
      id: params.userId,
      verified: false
    })
    if (!user) throw new NotFound('Invalid verify Token')
    user.verified = true
    await this.userRepository.save(user)
    return true
  }

  async sendMail(created: User) {
    // Generate test SMTP service account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Sport Classes " <sports.company@example.com>',
      to: `${created.email}`,
      subject: "Verify your email", // Subject line
      text: "Hello world?", // plain text body
      html: `<b><a href="http://localhost:3000/auth/verifyEmail?verifyToken=${created.verifyToken}&userId=${created.id}">Click to Verify</a></b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

export default AuthService;