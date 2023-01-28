import { BadRequest } from '@tsed/exceptions';
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateUser } from '../helpers/authenticateUser';
import { validatorDto } from '../helpers/validatorDto';
import Comment from '../validationTypes/Comment';
import Enroll from '../validationTypes/Enroll';
import Rate from '../validationTypes/Rate';

export const customMiddleware = Router();

//prefix = custom/

//global middlewre for all custom/ routes
customMiddleware.use(authenticateUser)

//Specificic endpoints middlewares
customMiddleware.post('/enroll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validatorDto(Enroll, req.body, Enroll.pickedProps())
        next()
    } catch (error) {
        res.status(400).json(error)
    }
});

customMiddleware.delete('/unenroll/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        next()
    } catch (error) {
        res.status(400).json(error)
    }
});

customMiddleware.patch('/rate', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validatorDto(Rate, req.body, Rate.pickedProps())
        next()
    } catch (error) {
        res.status(400).json(error)
    }
});

customMiddleware.post('/comment', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validatorDto(Comment, req.body, Comment.pickedProps())
        next()
    } catch (error) {
        res.status(400).json(error)
    }
});
