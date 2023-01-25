import { Unauthorized } from '@tsed/exceptions';
import { Router, Request, Response, NextFunction } from 'express';
import JWTService from '../services/JWTService';
import UserService from '../services/UserService';

export const userMiddleware = Router();

//prefix = user/

//global middlewre for all user/ routes
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

//Specificic endpoints middlewares
userMiddleware.post('/filter', (req: Request, res: Response, next: NextFunction) => {
    next()
});

//Specificic endpoints middlewares
userMiddleware.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    next()
});

