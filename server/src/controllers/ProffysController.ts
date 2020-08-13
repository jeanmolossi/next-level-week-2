import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Classes from '../entities/Classes';

export default class ProffysController {
  async show(request: Request, response: Response): Promise<Response> {
    const classesRepository = getRepository(Classes);

    const classes = await classesRepository.find({
      loadEagerRelations: false,
    });

    return response.json({ count: classes.length, classes });
  }
}
