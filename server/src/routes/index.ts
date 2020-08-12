import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import SessionsController from '../controllers/SessionsController';
import ConnectionsController from '../controllers/ConnectionsController';
import PasswordsController from '../controllers/PasswordsController';
import ClassesController from '../controllers/ClassesController';

import AuthMiddleware from './AuthMiddleware';

const appRoutes = Router();

const usersController = new UsersController();
const sessionsController = new SessionsController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const passwordsController = new PasswordsController();

appRoutes.post('/users', usersController.create);

appRoutes.post('/sessions', sessionsController.create);

appRoutes.post('/connections', connectionsController.create);
appRoutes.get('/connections', connectionsController.index);

appRoutes.post('/password/forgot', passwordsController.create);
appRoutes.put('/password/recover', passwordsController.update);

appRoutes.use(AuthMiddleware);

appRoutes.post('/classes', classesController.create);
appRoutes.get('/classes', classesController.index);
appRoutes.get('/classes/all', classesController.show);

appRoutes.get('/profile', usersController.index);
appRoutes.put('/profile/update', usersController.update);

export default appRoutes;
