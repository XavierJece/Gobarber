// import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
	const { email, password } = request.body;
	const usersRepository = new UsersRepository();

	const sessionInit = new AuthenticateUserService(usersRepository);

	const { user, token } = await sessionInit.execute({
		email,
		password,
	});

	delete user.password;

	return response.json({ user, token });
});

export default sessionRouter;
