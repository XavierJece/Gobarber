import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
	// const appointments = await appointmentRepository.find();

	response.json({ ok: true });
});

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
