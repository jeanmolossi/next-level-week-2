import { Request, Response } from 'express';
import { hash } from 'bcrypt';
import Users from 'entities/Users';
import { getRepository } from 'typeorm';

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
}
