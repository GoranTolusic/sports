import { BadRequest, Forbidden } from '@tsed/exceptions';
import { Router, Response, NextFunction } from 'express';
import { validatorDto } from '../helpers/validatorDto';
import CreateClass from '../validationTypes/CreateClass';
import UpdateClass from '../validationTypes/UpdateClass';
import { authenticateUser } from '../helpers/authenticateUser';

export const classMiddleware = Router();

//prefix = class/

//global middleware for all class/ routes
classMiddleware.use(authenticateUser)

classMiddleware.get('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

classMiddleware.post('/', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        await validatorDto(CreateClass, req.body, CreateClass.pickedProps())
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

classMiddleware.patch('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        await validatorDto(UpdateClass, req.body, UpdateClass.pickedProps())
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

classMiddleware.delete('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

