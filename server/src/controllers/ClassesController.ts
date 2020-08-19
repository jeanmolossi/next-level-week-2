import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Classes from '@entities/Classes';
import Users from '@entities/Users';
import convertHourToMinutes from '@utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response): Promise<Response> {
    const filters = request.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search a class',
      });
    }

    const classesRepository = getRepository(Classes);

    const timeInMinutes = convertHourToMinutes(time);

    const classesFiltered = await classesRepository.find({
      relations: ['schedules'],
      join: { alias: 'classes', innerJoin: { schedules: 'classes.schedules' } },
      where: (query: any) => {
        query
          .where({
            subject,
          })
          .andWhere('schedules.week_day = :week_day', { week_day })
          .andWhere('schedules.from <= :from', { from: timeInMinutes })
          .andWhere('schedules.to >= :to', { to: timeInMinutes });
      },
    });

    const parsedClasses = classesFiltered.map(singleClass => {
      delete singleClass.user.password;

      return singleClass;
    });

    return response.json(parsedClasses);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const classesRepository = getRepository(Classes);

    const classes = await classesRepository.find({
      relations: ['schedules'],
    });

    const parsedClasses = classes.map(singleClass => {
      delete singleClass.user.password;

      return singleClass;
    });

    return response.json(parsedClasses);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { whatsapp, bio, subject, cost, schedule } = request.body;

    const classRepository = getRepository(Classes);
    const usersRepository = getRepository(Users);

    try {
      const userLogged = await usersRepository.findOne(request.user.id);

      if (!userLogged) {
        return response.status(401).json({
          error: 'Unable to create a class',
          message: 'You must be a valid user to create a class',
        });
      }

      delete userLogged.password;

      const userHasClasses = await classRepository.find({
        user_id: request.user.id,
      });

      if (userHasClasses.length > 0) {
        return response.status(401).json({
          error: 'Unable to create a class',
          message: 'You already give classes',
        });
      }

      userLogged.whatsapp = whatsapp;
      userLogged.bio = bio;

      console.log('ok');

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      console.log(classSchedule);

      const newClass = classRepository.create({
        subject,
        cost,
        schedules: classSchedule,
        user_id: request.user.id,
      });

      console.log(newClass);

      await usersRepository.save(userLogged);
      await classRepository.save(newClass);

      return response.status(201).json({
        user: userLogged,
        class: newClass,
      });
    } catch (err) {
      return response.status(500).json({
        error: 'Error ocurred',
        message: 'Internal server error',
        stack: err,
      });
    }
  }
}
