import { Router } from 'express';
import multer from 'multer';

import uploadConfigs from '@configs/upload';

import UsersController from '../controllers/UsersController';
import SessionsController from '../controllers/SessionsController';
import ConnectionsController from '../controllers/ConnectionsController';
import PasswordsController from '../controllers/PasswordsController';
import ClassesController from '../controllers/ClassesController';
import ProffysController from '../controllers/ProffysController';
import UsersAvatarController from '../controllers/UsersAvatarController';
import FavoritesController from '../controllers/FavoritesController';

import AuthMiddleware from './AuthMiddleware';

const appRoutes = Router();
const upload = multer({
  storage: uploadConfigs.storage,
});

const usersController = new UsersController();
const sessionsController = new SessionsController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const passwordsController = new PasswordsController();
const proffysController = new ProffysController();
const usersAvatarController = new UsersAvatarController();
const favoritesController = new FavoritesController();

appRoutes.post('/users', usersController.create);

appRoutes.post('/sessions', sessionsController.create);

appRoutes.post('/password/forgot', passwordsController.create);
appRoutes.put('/password/recover', passwordsController.update);

appRoutes.use(AuthMiddleware);

appRoutes.post('/classes', classesController.create);
appRoutes.get('/classes', classesController.index);
appRoutes.get('/classes/all', classesController.show);

appRoutes.get('/profile', usersController.index);
appRoutes.put('/profile/update', usersController.update);
appRoutes.patch(
  '/avatar/update',
  upload.single('avatar'),
  usersAvatarController.update
);

appRoutes.post('/connections', connectionsController.create);
appRoutes.get('/connections', connectionsController.index);

appRoutes.get('/proffys', proffysController.show);

appRoutes.post('/favorites', favoritesController.create);
appRoutes.delete('/favorites', favoritesController.delete);
appRoutes.get('/favorites', favoritesController.show);

export default appRoutes;
