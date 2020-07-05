import { inject, injectable } from 'tsyringe';
import AppError from '@shared/Errors/AppError';
import { addHours, isAfter } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
	token: string;
	password: string;
}

@injectable()
export default class ReseatPasswordService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token, password }: IRequest): Promise<void> {
		const userTokenExists = await this.userTokensRepository.findByToken(token);

		if (!userTokenExists) {
			throw new AppError('User token does not exists');
		}

		const userExists = await this.usersRepository.findByEmail(
			userTokenExists.id,
		);

		if (!userExists) {
			throw new AppError('User does not exists');
		}

		const tokenCreatedAt = userTokenExists.createAt;
		const compareDate = addHours(tokenCreatedAt, 2);

		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('Token expired.');
		}

		userExists.password = await this.hashProvider.generateHash(password);

		await this.usersRepository.save(userExists);
	}
}
