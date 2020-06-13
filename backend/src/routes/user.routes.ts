import { Router } from 'express';

// import { getCustomRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
	// const appointmentRepository = getCustomRepository(userRepository);

	// const appointments = await appointmentRepository.find();

	return response.json('ok');
});

appointmentRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		return response.json(user);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default appointmentRouter;
