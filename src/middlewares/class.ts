import { BadRequest, Forbidden, Unauthorized } from '@tsed/exceptions';
import { Router, Request, Response, NextFunction } from 'express';
import JWTService from '../services/JWTService';
import { validatorDto } from '../helpers/validatorDto';
import CreateUser from '../validationTypes/CreateUser';
import UpdateUser from '../validationTypes/UpdateUser';

export const classMiddleware = Router();

//prefix = class/

//global middleware for all class/ routes
classMiddleware.use((req: Request, res: Response, next) => {
    try {
        if (!req.headers.accesstoken) throw new Unauthorized('You are not logged in', 401)
        let jwtService = new JWTService()
        let loggedUser = jwtService.verifyToken(req.headers.accesstoken)
        Object.assign(req, { loggedUser: loggedUser })
        next()
    } catch (error) {
        res.status(401).json(error)
    }
})

classMiddleware.post('/', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        await validatorDto(CreateUser, req.body, next, CreateUser.pickedProps())
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

classMiddleware.patch('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        await validatorDto(UpdateUser, req.body, next, UpdateUser.pickedProps())
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

classMiddleware.delete('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

