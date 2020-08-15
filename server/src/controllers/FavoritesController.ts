import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Classes from 'entities/Classes';
import Favorites from '../entities/Favorites';
import Users from '../entities/Users';

export default class FavoritesController {
  async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { favorite_user_id } = request.body;

    if (userId === favorite_user_id) {
      return response.status(400).json({
        error: 'Unable to finish the action',
        message: 'You cannot make yourself an favorite',
      });
    }

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      return response.status(400).json({
        error: 'User not exists',
        message: 'Unable to add favorite to user id',
      });
    }

    const userToFav = await usersRepository.findOne(favorite_user_id);

    if (!userToFav) {
      return response.status(400).json({
        error: 'User not exists',
        message: 'Unable to add this user like favorite',
      });
    }

    const favoritesRepository = getRepository(Favorites);

    const alreadyHasFavorite = await favoritesRepository.find({
      where: { favorite_user_id },
    });

    if (alreadyHasFavorite.length > 0) {
      return response.status(400).json({
        error: 'User already favorite',
        message: 'Unable to add again that user like favorite',
      });
    }

    const favorite = favoritesRepository.create({
      user_id: user.id,
      favorite_user_id,
    });

    await favoritesRepository.save(favorite);

    return response.json(favorite);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { fav_id } = request.query;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(id);

    if (!user) {
      return response.status(400).json({
        error: 'User not exists',
        message: 'Unable to change unexists user',
      });
    }

    const favoritesRepository = getRepository(Favorites);

    await favoritesRepository.delete({
      favorite_user_id: Number(fav_id),
    });

    return response.status(201).json();
  }

  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const favoritesRepository = getRepository(Favorites);

    const favList = await favoritesRepository.find({
      where: { user_id },
    });

    const favIds = favList.map(favUser => favUser.favorite_user_id);

    const classesRepository = getRepository(Classes);

    const usersFav = await classesRepository.findByIds(favIds, {
      relations: ['schedules'],
    });

    return response.json(usersFav);
  }
}
