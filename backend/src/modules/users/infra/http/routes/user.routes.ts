import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';

const userRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRouter.get('/', async (request, response) => {
	// const userRepository = getCustomRepository(userRepository);

	// const users = await userRepository.find();

	return response.json('ok');
});

userRouter.post('/', usersController.create);

userRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	userAvatarController.update,
);

export default userRouter;
