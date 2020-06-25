import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '@shared/Errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

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
			throw new AppError('Email address already used');
		}

		const passwordHash = await hash(password, 8);

		const user = userRepository.create({
			name,
			email,
			password: passwordHash,
		});

		await userRepository.save(user);

		return user;
	}
}
