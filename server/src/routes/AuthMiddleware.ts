import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface DecodedToken {
  user_id: number;
}

export default function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const headerToken = request.headers.authorization;

  if (!headerToken) {
    return response.status(401).json({
      error: 'Authorization',
      message: 'Authentication token is missing',
    });
  }

  const [, token] = headerToken.split('Bearer ');

  const { user_id } = verify(token, 'secret_key') as DecodedToken;

  request.user = {
    id: user_id,
  };

  return next();
}
