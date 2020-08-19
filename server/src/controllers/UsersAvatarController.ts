import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Users from '@entities/Users';
import upload from '@configs/upload';

export default class UsersAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(id);

    if (!user) {
      return response.status(401).json({
        erro: 'Unable to update user',
        message: 'User is invalid to update avatar',
      });
    }

    const uploadDir = upload.directory;

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

    delete user.password;

    const parsedUser = {
      ...user,
      avatar: `http://192.168.0.104:3333/files/${user.avatar}`,
    };

    return response.json(parsedUser);
  }
}
