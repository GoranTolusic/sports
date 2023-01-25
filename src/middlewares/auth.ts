import { Router, Request, Response, NextFunction } from 'express';

export const authMiddleware = Router();

//prefix = auth/

//global middlewre for all auth/ routes
authMiddleware.use((req, res, next) => {
    next()
})
