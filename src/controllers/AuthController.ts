import { Request, Response } from 'express';
import { Service } from "typedi";
import UserService from '../services/UserService';

@Service()
class AuthController {
    constructor(private readonly userService: UserService) { }

    public async register(req: Request, res: Response) {
        res.send('Get one route on things.');
    }

    public async login(req: Request, res: Response) {
        res.send('GEt one route on things.');
    }

    public async verifyToken(req: Request, res: Response) {
        res.send('GEt one route on things.');
    }
}

export default AuthController