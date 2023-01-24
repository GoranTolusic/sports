import { Request, Response } from 'express';
import { Service } from "typedi";
import UserService from '../services/UserService';

@Service()
class UserController {
    constructor(private readonly userService: UserService) { }

    public async filter(req: Request, res: Response) {
        let results = await this.userService.filter('nesta iz rekvesta')
        res.status(200).json(results);
    }

    public async getOne(req: Request, res: Response) {
        let results = await this.userService.getOne('nesta iz rekvesta')
        res.status(200).json(results);
    }

    public async create(req: Request, res: Response) {
        res.send('GEt one route on things.');
    }

    public async delete(req: Request, res: Response) {
        res.send('GEt one route on things.');
    }

    public async update(req: Request, res: Response) {
        res.send('GEt one route on things.');
    }
}

export default UserController