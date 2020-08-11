import { Router } from 'express';

import UsersController from 'controllers/UsersController';
import SessionsController from 'controllers/SessionsController';
import ConnectionsController from 'controllers/ConnectionsController';
import ClassesController from '../controllers/ClassesController';

import AuthMiddleware from './AuthMiddleware';

const appRoutes = Router();

const usersController = new UsersController();
const sessionsController = new SessionsController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

appRoutes.post('/users', usersController.create);

appRoutes.post('/sessions', sessionsController.create);

appRoutes.post('/connections', connectionsController.create);
appRoutes.get('/connections', connectionsController.index);

appRoutes.use(AuthMiddleware);

appRoutes.post('/classes', classesController.create);
appRoutes.get('/classes', classesController.index);
appRoutes.get('/classes/all', classesController.show);

export default appRoutes;
