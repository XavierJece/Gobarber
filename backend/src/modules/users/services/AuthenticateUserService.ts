import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../config/auth';
import AppError from '../Errors/AppError';
import User from '../models/User';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

export default class AuthenticateUserService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne({ where: { email } });

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
