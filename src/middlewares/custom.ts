import { BadRequest } from '@tsed/exceptions';
import { Router, Request, Response, NextFunction } from 'express';
import { validatorDto } from '../helpers/validatorDto';

export const customMiddleware = Router();

//prefix = custom/

//global middlewre for all custom/ routes
customMiddleware.use((req, res, next) => {
    next()
})

//Specificic endpoints middlewares
customMiddleware.post('/enroll', async (req: Request, res: Response, next: NextFunction) => {
    try {

        next()
    } catch (error) {
        res.status(400).json(error)
    }
});

customMiddleware.delete('/unenroll/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        next()
    } catch (error) {
        res.status(400).json(error)
    }
});

customMiddleware.patch('/rate', async (req: Request, res: Response, next: NextFunction) => {
    try {

        next()
    } catch (error) {
        res.status(400).json(error)
    }
});

customMiddleware.post('/comment', async (req: Request, res: Response, next: NextFunction) => {
    try {

        next()
    } catch (error) {
        res.status(400).json(error)
    }
});
