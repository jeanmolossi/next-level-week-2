import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Connections from '@entities/Connections';

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    const connectionsRepository = getRepository(Connections);

    const [, total] = await connectionsRepository.findAndCount();

    return response.json({ total });
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    const connectionsRepository = getRepository(Connections);

    const newConnection = connectionsRepository.create({
      user_id,
    });

    await connectionsRepository.save(newConnection);

    return response.status(201).send();
  }
}
