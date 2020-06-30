import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Router } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import multer from 'multer';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.get('/', async (request, response) => {
	// const userRepository = getCustomRepository(userRepository);

	// const users = await userRepository.find();

	return response.json('ok');
});

userRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body;
	const usersRepository = new UsersRepository();

	const createUser = new CreateUserService(usersRepository);

	const user = await createUser.execute({
		name,
		email,
		password,
	});

	delete user.password;

	return response.json(user);
});

userRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const usersRepository = new UsersRepository();

		const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

		const user = await updateUserAvatar.execute({
			userId: request.user.id,
			avatarFileName: request.file.filename,
		});

		return response.json(user);
	},
);

export default userRouter;
