import { Router } from 'express';

const routes = new Router();

routes.get('/', (_, res) => {
  return res.json('Hello World!');
});

export default routes;
