import { Router } from 'express';
import CustomController from '../controllers/CustomController';
import Container from 'typedi';

export const customRoutes = Router();

const customController = Container.get(CustomController)

//prefix = custom/
customRoutes.post('/enroll', (req, res) => customController.enroll(req, res));
customRoutes.delete('/unenroll/:id', (req, res) => customController.unenroll(req, res));
customRoutes.patch('/rate', (req, res) => customController.rate(req, res));
customRoutes.post('/comment', (req, res) => customController.comment(req, res));

