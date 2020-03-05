import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import ModalityController from './app/controllers/ModalityController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/modalities', ModalityController.index);

export default routes;
