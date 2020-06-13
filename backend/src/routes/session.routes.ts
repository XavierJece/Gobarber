import { Router } from 'express';

// import { getCustomRepository } from 'typeorm';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
	try {
		const { email, password } = request.body;

		const sessionInit = new AuthenticateUserService();

		const { user, token } = await sessionInit.execute({
			email,
			password,
		});

		delete user.password;

		return response.json({ user, token });
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default sessionRouter;
