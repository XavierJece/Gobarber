import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

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
			throw new Error('Email or password invalid');
		}

		if (!(await compare(password, user.password))) {
			throw new Error('Email or password invalid');
		}

		const token = sign({}, 'testeteste', {
			subject: user.id,
			expiresIn: '1d',
		});

		return { user, token };
	}
}
