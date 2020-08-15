import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import uploadConfig from '@configs/upload';

import Users from '../entities/Users';

export default class UsersAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const usersRepository = getRepository(Users);
    const user = await usersRepository.findOne(id);

    if (!user)
      return response.status(401).json({
        error: 'Unable to update user',
        message: 'User is invalid to update user',
      });

    const uploadDir = uploadConfig.directory;

    if (user.avatar) {
      const avatarFile = path.join(uploadDir, user.avatar);
      try {
        const avatarFileStatus = fs.statSync(avatarFile);

        if (avatarFileStatus) {
          fs.unlink(avatarFile, _err => {
            if (_err) console.log(`Error on unlink file ${avatarFile}`);
          });
        }
      } catch {
        console.log('Avatar file status failed');
      }
    }

    const { filename } = request.file;
    user.avatar = filename;

    await usersRepository.save(user);

    const parsedUser = {
      ...user,
      avatar: `http://localhost:3333/files/${user.avatar}`,
    };

    return response.json(parsedUser);
  }
}
