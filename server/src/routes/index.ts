import { Router } from 'express';

import ClassesController from '../controllers/ClassesController';
import ConnectionsController from 'controllers/ConnectionsController';
import UsersController from 'controllers/UsersController';

const appRoutes = Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();

appRoutes.post('/users', usersController.create);

appRoutes.post('/classes', classesController.create)
appRoutes.get('/classes', classesController.index)

appRoutes.post('/connections', connectionsController.create)
appRoutes.get('/connections', connectionsController.index)

export default appRoutes;