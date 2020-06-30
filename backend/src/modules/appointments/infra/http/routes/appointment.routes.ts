import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { parseISO } from 'date-fns';
import { Router } from 'express';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
// 	const appointments = await appointmentRepository.find();

// 	response.json(appointments);
// });

appointmentRouter.post('/', async (request, response) => {
	const { providerId, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentService(appointmentRepository);

	const appointment = await createAppointment.execute({
		date: parsedDate,
		providerId,
	});

	return response.json(appointment);
});

export default appointmentRouter;
