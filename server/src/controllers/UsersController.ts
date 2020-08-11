import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import Users from '../entities/Users';
import Classes from '../entities/Classes';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, lastname, email, password } = request.body;

    const usersRepository = getRepository(Users);

    const issetUser = await usersRepository.findOne({ where: { email } });

    if (issetUser) {
      return response.status(401).json({
        error: 'Error',
        message: 'User already exists',
      });
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return response.json(user);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const classesRepository = getRepository(Classes);
    const user = await classesRepository.findOne({
      relations: ['schedules'],
      where: { user_id: request.user.id },
    });

    return response.json(user);
  }
}
