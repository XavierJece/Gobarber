import { Router } from 'express';
// import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();
const upload = multer(uploadConfig);

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

userRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		return response.json({ ok: true });
	},
);

export default userRouter;
