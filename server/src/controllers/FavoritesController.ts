import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Favorites from '@entities/Favorites';
import Users from '@entities/Users';
import Classes from '@entities/Classes';

export default class FavoriteController {
  async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { favorite_user_id } = request.body;

    if (user_id === favorite_user_id) {
      return response.status(400).json({
        error: 'Unable to finish the action',
        message: 'You cannot make yourself an favorite',
      });
    }

    const usersRespository = getRepository(Users);

    const user = await usersRespository.findOne(user_id);

    if (!user) {
      return response.status(400).json({
        error: 'User not exists',
        message: 'Unable to add favorite to user id',
      });
    }

    const userToFavorite = await usersRespository.findOne(favorite_user_id);

    if (!userToFavorite) {
      return response.status(400).json({
        error: 'User not exists',
        message: 'Unable to add user like an favorite',
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
      user_id,
      favorite_user_id,
    });

    await favoritesRepository.save(favorite);

    return response.json(favorite);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { favorite_user_id } = request.query;

    const usersRespository = getRepository(Users);

    const user = await usersRespository.findOne(id);

    if (!user) {
      return response.status(400).json({
        error: 'User not exists',
        message: 'Unable to add favorite to user id',
      });
    }

    const favoritesRepository = getRepository(Favorites);

    await favoritesRepository.delete({
      favorite_user_id: Number(favorite_user_id),
    });

    return response.status(201).json();
  }

  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const favoritesRepository = getRepository(Favorites);

    const favoritesList = await favoritesRepository.find({
      where: { user_id },
    });

    const favoritesIds = favoritesList.map(
      favoriteUser => favoriteUser.favorite_user_id,
    );

    const classesRepository = getRepository(Classes);

    const usersFavoritedsClasses = await classesRepository.findByIds(
      favoritesIds,
      {
        relations: ['schedules'],
      },
    );

    const usersWithoutPassword = usersFavoritedsClasses.map(f => {
      delete f.user.password;
      return f;
    });

    return response.json(usersWithoutPassword);
  }
}
