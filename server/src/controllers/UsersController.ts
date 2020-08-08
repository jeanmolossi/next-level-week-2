import { Request, Response } from 'express';
import { hash } from 'bcrypt';

import database from '@database/connections';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, lastname, email, password } = request.body;

    const issetUser = await database('users').where('users.email', '=', email);
    if(issetUser.length > 0) {
      return response.status(401).json({
        error: 'Error',
        message: 'User already exists'
      });
    }

    const hashedPassword = await hash(password, 8);

    const [user_id] = await database('users').insert({
      name,
      lastname,
      email,
      password: hashedPassword
    });

    console.log(user_id)

    return response.json(user_id);
  }
}