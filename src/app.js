import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';

import './database';

import swaggerDocument from '../swagger.json';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
