import { Router } from 'express';

import appointmentRouter from './appointment.routes';

const routes = Router();

routes.get('/', (request, response) =>
	response.json({ message: 'Hello Word!!' }),
);

routes.use('/appointments', appointmentRouter);

export default routes;
