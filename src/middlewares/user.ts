import { Router, Request, Response, NextFunction } from 'express';

export const userMiddleware = Router();

//prefix = user/

//global middlewre for all user/ routes
userMiddleware.use((req, res, next) => {
    next()
})

//Specificic endpoints middlewares
userMiddleware.post('/filter', (req: Request, res: Response, next: NextFunction) => {
    next()
});


//Specificic endpoints middlewares
userMiddleware.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    next()
});

