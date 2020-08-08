import { Router } from 'express';

import ClassesController from '../controllers/ClassesController';
import ConnectionsController from 'controllers/ConnectionsController';
import UsersController from 'controllers/UsersController';
import SessionsController from 'controllers/SessionsController';

const appRoutes = Router();

const usersController = new UsersController();
const sessionsController = new SessionsController()
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

appRoutes.post('/users', usersController.create);

appRoutes.post('/sessions', sessionsController.create);

appRoutes.post('/classes', classesController.create)
appRoutes.get('/classes', classesController.index)

appRoutes.post('/connections', connectionsController.create)
appRoutes.get('/connections', connectionsController.index)

export default appRoutes;