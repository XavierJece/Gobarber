import { Router } from 'express';

import appointmentRouter from './appointment.routes';
import sessionRouter from './session.routes';
import userRouter from './user.routes';

const routes = Router();

routes.get('/', (request, response) =>
	response.json({ message: 'Hello Word!!' }),
);

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/session', sessionRouter);

export default routes;
