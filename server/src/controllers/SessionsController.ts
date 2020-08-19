import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import Users from '../entities/Users';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password, rememberMe } = request.body;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({
        error: 'Unable to login',
        message: 'Invalid credentials',
      });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return response.status(400).json({
        error: 'Unable to login',
        message: 'Invalid credentials',
      });
    }

    const token = sign({ user_id: user.id }, 'secret_key', {
      expiresIn: rememberMe ? '31d' : '1d',
    });

    delete user.password;

    return response.json({
      user,
      token,
    });
  }
}
