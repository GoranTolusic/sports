import { Router } from 'express';
import ClassController from '../controllers/ClassController';
import Container from 'typedi';

export const classRoutes = Router();

const classController = Container.get(ClassController)
//prefix = user/
classRoutes.get('/:id', (req, res) => classController.getOne(req, res));
classRoutes.post('/filter', (req, res) => classController.filter(req, res));
classRoutes.post('/', (req, res) => classController.create(req, res));
classRoutes.patch('/:id', (req, res) => classController.update(req, res));
classRoutes.delete('/:id', (req, res) => classController.delete(req, res));

