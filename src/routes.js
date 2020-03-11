import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import ModalityController from './app/controllers/ModalityController';
import CardController from './app/controllers/CardController';
import TransactionController from './app/controllers/TransactionController';
import BalanceController from './app/controllers/BalanceController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', ({ res }) => res.redirect('/api-docs'));

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/modalities', ModalityController.index);

routes.get('/cards', CardController.index);

routes.get('/transactions', TransactionController.index);
routes.post('/transactions', TransactionController.store);

routes.get('/balances', BalanceController.index);

export default routes;
