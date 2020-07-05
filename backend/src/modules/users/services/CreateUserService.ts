import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/Errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
export default class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const userExists = await this.usersRepository.findByEmail(email);

		if (userExists) {
			throw new AppError('Email address already used');
		}

		const passwordHash = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			name,
			email,
			password: passwordHash,
		});

		return user;
	}
}
