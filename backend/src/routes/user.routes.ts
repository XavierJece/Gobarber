import { Router } from 'express';

// import { getCustomRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
	// const userRepository = getCustomRepository(userRepository);

	// const users = await userRepository.find();

	return response.json('ok');
});

userRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		delete user.password;

		return response.json(user);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default userRouter;
