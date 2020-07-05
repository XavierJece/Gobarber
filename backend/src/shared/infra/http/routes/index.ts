import appointmentRouter from '@modules/appointments/infra/http/routes/appointment.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import PasswordRouter from '@modules/users/infra/http/routes/password.routes';
import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
	response.json({ message: 'Hello Word!!' }),
);

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/session', sessionRouter);
routes.use('/password', PasswordRouter);

export default routes;
