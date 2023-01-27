import { BadRequest, Forbidden, Unauthorized } from '@tsed/exceptions';
import { Router, Request, Response, NextFunction } from 'express';
import JWTService from '../services/JWTService';
import { validatorDto } from '../helpers/validatorDto';
import CreateUser from '../validationTypes/CreateUser';
import UpdateUser from '../validationTypes/UpdateUser';

export const userMiddleware = Router();

//prefix = user/

//global middleware for all user/ routes
userMiddleware.use((req: Request, res: Response, next) => {
    try {
        if (!req.headers.accesstoken) throw new Unauthorized('You are not logged in', 401)
        let jwtService = new JWTService()
        let loggedUser = jwtService.verifyToken(req.headers.accesstoken)
        Object.assign(req,  { loggedUser: loggedUser })
        next()
    } catch (error) {
        res.status(401).json(error)
    }
})

//Specific route middlewares
userMiddleware.post('/', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        await validatorDto(CreateUser, req.body, next, CreateUser.pickedProps())
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

userMiddleware.get('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

userMiddleware.patch('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        await validatorDto(UpdateUser, req.body, next, UpdateUser.pickedProps())
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

userMiddleware.delete('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

