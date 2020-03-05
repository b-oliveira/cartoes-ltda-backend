import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import ModalityController from './app/controllers/ModalityController';
import CardController from './app/controllers/CardController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/modalities', ModalityController.index);

routes.get('/cards', CardController.index);

export default routes;
