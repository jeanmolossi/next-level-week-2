import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';

import upload from '@configs/upload';

import '@database/connections';

import router from './routes';

class ServerRunner {
  public app: Express;

  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();

    return this;
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use('/files', express.static(upload.directory));
    this.app.use(cors());
  }

  routes() {
    this.app.use(router);
  }
}

const run = new ServerRunner();
run.app.listen(3333, () => console.log(`🚀 >> Server started port@3333`));
