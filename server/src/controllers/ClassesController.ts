import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import convertHourToMinutes from '@utils/convertHourToMinutes';

import Classes from '../entities/Classes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string; 
}

export default class ClassesController {

  async show(request: Request, response: Response) {
    const repository = getRepository(Classes);
    const classesWithoutFilters = await repository.find();

    
    return response.json(classesWithoutFilters)
  }

  // async index(request: Request, response: Response) {
  //   const filters = request.query;

  //   const subject = filters.subject as string;
  //   const week_day = filters.week_day as string;
  //   const time = filters.time as string;

  //   if(!filters.week_day || !filters.subject || !filters.time) {
  //     return response.status(400).json({
  //       error: 'Missing filters to search classes'
  //     })
  //   }

  //   const timeInMinutes = convertHourToMinutes(time);

  //   const classes = await database('classes')
  //     .whereExists(function () {
  //       this.select('classes_schedule.*')
  //         .from('classes_schedule')
  //         .whereRaw('`classes_schedule`.`class_id` = `classes`.`id`')
  //         .whereRaw('`classes_schedule`.`week_day` = ??', [Number(week_day)])
  //         .whereRaw('`classes_schedule`.`from` <= ??', [timeInMinutes])
  //         .whereRaw('`classes_schedule`.`to` > ??', [timeInMinutes])
  //     })
  //     .where('classes.subject', '=', subject)
  //     .join('users', 'classes.user_id', '=', 'users.id')
  //     .leftJoin('classes_schedule', 'classes_schedule.class_id', 'classes.id')
  //     .select(['classes.*', 'users.*', 'classes_schedule.*'])

  //   return response.json({});
  // }

  // async create(request: Request, response: Response) {
  //   const {
  //     whatsapp,
  //     bio,
  //     subject,
  //     cost,
  //     schedule
  //   } = request.body;
  
  //   const transaction = await database.transaction();
  
  //   try {
  //     await transaction('users')
  //       .where('id', '=', request.user.id)
  //       .update({
  //         whatsapp,
  //         bio,
  //       });
    
  //     const [class_id] = await transaction('classes').insert({
  //       subject, 
  //       cost,
  //       user_id: request.user.id,
  //     });
    
  //     const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
  //       return {
  //         class_id,
  //         week_day: scheduleItem.week_day,
  //         from: convertHourToMinutes(scheduleItem.from),
  //         to: convertHourToMinutes(scheduleItem.to)
  //       }
  //     });
    
  //     await transaction('classes_schedule').insert(classSchedule);
    
  //     await transaction.commit();
    
  //     return response.status(201).send();
  //   }catch(err) {
  //     await transaction.rollback();
  
  //     return response.status(400).json({
  //       error: 'Unexpected error while creating class schedule'
  //     })
  //   }
  // }

}