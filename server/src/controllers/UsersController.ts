import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import Classes from '@entities/Classes';
import Users from '@entities/Users';
import Schedules from '@entities/Schedules';
import convertHourToMinutes from '@utils/convertHourToMinutes';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, lastname, email, password } = request.body;

    const usersRepository = getRepository(Users);

    const userWithEmail = await usersRepository.findOne({
      where: { email },
    });

    if (userWithEmail) {
      return response.status(401).json({
        error: 'Unable to create user',
        message: 'You cannot create an account with this email',
      });
    }

    const hashedPassword = await hash(password, 8);

    const newUser = usersRepository.create({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(newUser);

    delete newUser.password;

    return response.json(newUser);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      lastname,
      email,
      whatsapp,
      bio,
      subject,
      cost,
      schedules,
    } = request.body;

    const usersRepository = getRepository(Users);
    const classesRepository = getRepository(Classes);

    const user = await usersRepository.findOne(request.user.id);

    if (!user) {
      return response.status(401).json({
        error: 'User not exists',
        message: 'Unable to update unexpected user',
      });
    }

    if (user && user.email !== email) {
      const issetUser = await usersRepository.findOne({ where: { email } });
      if (issetUser) {
        return response.status(401).json({
          error: 'E-mail is already in use',
          message: 'Unable to update. This email already in use.',
        });
      }
    }

    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.whatsapp = whatsapp;
    user.bio = bio;

    const classes = await classesRepository.findOne({
      where: { user_id: request.user.id },
    });

    if (!classes) {
      return response.status(401).json({
        error: 'Class not found',
        message: 'Unable to update class. The class not exists',
      });
    }

    await getRepository(Schedules).delete({
      class_id: classes.id,
    });

    classes.subject = subject;
    classes.cost = cost;
    classes.schedules = schedules.map((schedule: any) => {
      return {
        ...schedule,
        from: convertHourToMinutes(schedule.from),
        to: convertHourToMinutes(schedule.to),
      };
    });

    await usersRepository.save(user);
    await classesRepository.save(classes);

    delete classes.user.password;

    return response.json({
      classes,
    });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const classesRepository = getRepository(Classes);

    const user = await classesRepository.findOne({
      relations: ['schedules'],
      where: { user_id: request.user.id },
    });

    delete user?.user.password;

    return response.json(user);
  }
}
