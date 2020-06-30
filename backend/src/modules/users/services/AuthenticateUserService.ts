import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/Errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}
@injectable()
export default class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Email or password invalid', 401);
		}

		if (!(await compare(password, user.password))) {
			throw new AppError('Email or password invalid', 401);
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});

		return { user, token };
	}
}
