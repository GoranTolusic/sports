import { Router, Request, Response, NextFunction } from 'express';

export const userMiddleware = Router();

//prefix = user/

userMiddleware.use((req, res, next) => {
    console.log('ovo je za sve user/rute middleware')
    next()
})

userMiddleware.use('/:id', (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.query.id !== 'number') throw new Error('Error! Wrong id')
    console.log('ovo je middleware za sve rute koji imaju id')
    next()
});

//
userMiddleware.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    console.log('ovo je middleware samo za get user/id rutu')
    next()
});

