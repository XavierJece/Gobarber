import { getRepository } from 'typeorm';

import User from '../models/User';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

export default class CreateUserService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const userRepository = getRepository(User);

		const userExists = await userRepository.findOne({ where: { email } });

		if (userExists) {
			throw new Error('Email address already used');
		}
		const user = userRepository.create({
			name,
			email,
			password,
		});

		await userRepository.save(user);

		return user;
	}
}
