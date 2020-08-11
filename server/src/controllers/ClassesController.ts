import { Request, Response } from 'express';
import { getRepository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

import convertHourToMinutes from '@utils/convertHourToMinutes';

import Schedules from 'entities/Schedules';
import Users from '../entities/Users';
import Classes from '../entities/Classes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async show(request: Request, response: Response) {
    const classesRepository = getRepository(Classes);

    const classesWithoutFilters = await classesRepository.find({
      relations: ['user', 'schedules'],
    });

    return response.json(classesWithoutFilters);
  }

  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes',
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const schedulesRepository = getRepository(Schedules);
    const schedulesFiltered = await schedulesRepository.find({
      relations: ['classes'],
      where: {
        week_day: Number(week_day),
        from: LessThanOrEqual(timeInMinutes),
        to: MoreThanOrEqual(timeInMinutes),
      },
    });

    const classesSubject = schedulesFiltered.filter(
      schedule => schedule.classes.subject === subject
    );

    return response.json(classesSubject);
  }

  async create(request: Request, response: Response) {
    const { whatsapp, bio, subject, cost, schedule } = request.body;

    const classesRepository = getRepository(Classes);
    const usersRepository = getRepository(Users);

    try {
      const userLogged = await usersRepository.findOne(request.user.id);

      if (!userLogged) {
        return response.status(401).json({
          error: 'User unauthorized',
          message: 'User has not authorization',
        });
      }

      userLogged.whatsapp = whatsapp;
      userLogged.bio = bio;

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      const newclass = classesRepository.create({
        subject,
        cost,
        schedules: classSchedule,
        user_id: request.user.id,
      });

      await usersRepository.save(userLogged);
      await classesRepository.save(newclass);

      return response.status(201).json({
        user: userLogged,
        class: newclass,
      });
    } catch (err) {
      return response.status(400).json({
        error: 'Unexpected error while creating class schedule',
      });
    }
  }
}
