import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import { hash } from 'bcrypt';

import sendMail from '@utils/sendMail';

import Users from '../entities/Users';

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
  sub: string;
}

export default class PasswordsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({
        error: 'User is not found!',
        message: 'Unable to recover user password, user not exists',
      });
    }

    const token = sign({ id: user.id }, 'secret_key_recover_password', {
      subject: user.email,
      expiresIn: 60 * 15,
    });

    await sendMail(user.email, token);

    return response.status(201).json();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    if (!token) {
      return response.status(400).json({
        error: 'Provide a validation token',
        message: 'Token validation not provided',
      });
    }

    try {
      const { exp, sub: email } = verify(
        token,
        'secret_key_recover_password'
      ) as DecodedToken;

      const isValid = Math.floor(Date.now() / 1000);

      if (isValid > exp) {
        return response.status(400).json({
          error: 'Token expired',
          message: 'Try recover again',
        });
      }

      const usersRepository = getRepository(Users);
      const user = await usersRepository.findOne({ where: { email } });

      if (!user) {
        return response.status(400).json({
          error: 'User not found',
          message: 'User not exists or invalid',
        });
      }

      const hashedPassword = await hash(password, 8);
      user.password = hashedPassword;

      await usersRepository.save(user);

      return response
        .status(201)
        .json({ success: 'Password successful updated' });
    } catch {
      return response.status(400).json({
        error: 'Invalid token',
        message: 'Invalid signature token provided',
      });
    }
  }
}
