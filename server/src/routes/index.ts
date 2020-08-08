import { Router, Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

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

appRoutes.use((request: Request, response: Response, next: NextFunction) => {
  const headerToken = request.headers.authorization;
  if(!headerToken)
    return response.status(401).json({
      error: 'Authorization',
      message: 'Token is missing'
    });

  const [,token] = headerToken.split('Bearer ');

  const tokenDecoded = verify(token, 'secret_key')

  console.log(tokenDecoded);
  
});

appRoutes.post('/classes', classesController.create)
appRoutes.get('/classes', classesController.index)

appRoutes.post('/connections', connectionsController.create)
appRoutes.get('/connections', connectionsController.index)

export default appRoutes;