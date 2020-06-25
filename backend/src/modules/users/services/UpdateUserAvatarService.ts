import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/Errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
	userId: string;
	avatarFileName: string;
}

export default class UpdateUserAvatarService {
	public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne(userId);

		if (!user) {
			throw new AppError('Only authenticated users can change avatar.', 401);
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatarFileName;

		await usersRepository.save(user);

		return user;
	}
}
