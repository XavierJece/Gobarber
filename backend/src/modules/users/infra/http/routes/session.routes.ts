// import { getCustomRepository } from 'typeorm';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
	const { email, password } = request.body;

	const sessionInit = new AuthenticateUserService();

	const { user, token } = await sessionInit.execute({
		email,
		password,
	});

	delete user.password;

	return response.json({ user, token });
});

export default sessionRouter;
