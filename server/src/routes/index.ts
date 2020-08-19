import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';

import AuthMiddleware from './AuthMiddleware';

import UsersController from '../controllers/UsersController';
import SessionsController from '../controllers/SessionsController';
import ConnectionsController from '../controllers/ConnectionsController';
import ClassesController from '../controllers/ClassesController';
import UsersAvatarController from '../controllers/UsersAvatarController';
import PasswordController from '../controllers/PasswordController';
import FavoritesController from '../controllers/FavoritesController';

const appRoutes = Router();
const upload = multer({
  storage: uploadConfig.storage,
});

const usersController = new UsersController();
const sessionsController = new SessionsController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersAvatarController = new UsersAvatarController();
const passwordController = new PasswordController();
const favoritesController = new FavoritesController();

/**
 * NÃO NECESSITAM AUTENTICAÇÃO
 */

appRoutes.post('/users', usersController.create);

appRoutes.post('/sessions', sessionsController.create);

appRoutes.post('/password/forgot', passwordController.create);
appRoutes.patch('/password/reset', passwordController.update);

/**
 * NECESSITAM AUTENTICACAO
 */
appRoutes.use(AuthMiddleware);

appRoutes.post('/classes', classesController.create);
appRoutes.get('/classes', classesController.index);
appRoutes.get('/classes/all', classesController.show);

appRoutes.get('/profile', usersController.index);
appRoutes.put('/profile/update', usersController.update);
appRoutes.patch(
  '/avatar/update',
  upload.single('avatar'),
  usersAvatarController.update,
);

appRoutes.post('/connections', connectionsController.create);
appRoutes.get('/connections', connectionsController.index);

appRoutes.post('/favorites', favoritesController.create);
appRoutes.delete('/favorites', favoritesController.delete);
appRoutes.get('/favorites', favoritesController.show);

export default appRoutes;

/**
 *
 * users // OK
 *
 * sessions // OK
 *
 * classes * GET // OK
 * classes * POST // OK
 * classes/all * GET // OK
 *
 * profile // OK
 * profile/update // OK
 * avatar/update // OK
 *
 * connections * GET // OK
 * connections * POST // OK
 *
 * favorites * POST
 * favorites * GET
 * favorites * DELETE
 *
 * password/forgot // OK
 * password/reset // OK
 *
 */
