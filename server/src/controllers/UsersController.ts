import { Request, Response } from 'express';
import { getRepository, IsNull } from 'typeorm';
import { hash } from 'bcrypt';

import convertHourToMinutes from '@utils/convertHourToMinutes';

import Schedules from '../entities/Schedules';
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

    const classesRepository = getRepository(Classes);
    const usersRepository = getRepository(Users);

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
          message: 'Unable to update. This email already in use',
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
        message: 'Unable update class. The class not exists or not found',
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

    return response.json({ classes, schedules: classes.schedules });
  }
}
