import { Router } from 'express';

import appointmentRouter from './appointment.routes';
import userRouter from './user.routes';

const routes = Router();

routes.get('/', (request, response) =>
	response.json({ message: 'Hello Word!!' }),
);

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);

export default routes;
