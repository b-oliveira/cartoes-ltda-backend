import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import ModalityController from './app/controllers/ModalityController';
import CardController from './app/controllers/CardController';
import TransactionController from './app/controllers/TransactionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/modalities', ModalityController.index);

routes.get('/cards', CardController.index);

routes.post('/transactions', TransactionController.store);

export default routes;
