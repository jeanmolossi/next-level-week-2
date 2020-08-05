import express, { Express } from 'express';

import router from './routes';

class ServerRunner {

  public app: Express;

  constructor(){
    this.app = express();

    this.app.use(express.json());

    this.middlewares();
    this.routes();

    return this;
  }

  middlewares () {
    console.log(`Middlewares applied`)
  }

  routes() {
    this.app.use(router);
  }

}

const run = new ServerRunner();
run.app.listen(3333, () => console.log(`🚀 >> Server started port@3333`))