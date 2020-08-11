import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import Users from 'entities/Users';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password, rememberPassword } = request.body;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user)
      return response.status(401).json({
        error: 'Error',
        message: 'Invalid credentials1',
      });

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      return response.status(401).json({
        error: 'Error',
        message: 'Invalid credentials2',
      });

    const token = sign({ user_id: user.id }, 'secret_key', {
      expiresIn: rememberPassword ? '31d' : '1d',
    });

    delete user.password;

    return response.json({ user, token });
  }
}
