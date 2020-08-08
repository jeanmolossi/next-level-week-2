import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface DecodedToken {
  user_id: number;
}

export default function AuthMiddleware (request: Request, response: Response, next: NextFunction) {
  const headerToken = request.headers.authorization;

  if(!headerToken)
    return response.status(401).json({
      error: 'Authorization',
      message: 'Token is missing'
    });

  const [,token] = headerToken.split('Bearer ');

  try{
    const { user_id } = verify(token, 'secret_key') as DecodedToken;

    request.user = {
      id: user_id
    }

    return next();
  }catch{
    console.log('Invalid signature token');

    return response.status(401).json({
      error: 'Token signature',
      message: 'Invalid token'
    })
  }
}