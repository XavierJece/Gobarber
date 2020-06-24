import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
	const appointmentRepository = getCustomRepository(AppointmentRepository);

	const appointments = await appointmentRepository.find();

	response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
	try {
		const { providerId, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointment = new CreateAppointmentService();

		const appointment = await createAppointment.execute({
			date: parsedDate,
			providerId,
		});

		return response.json(appointment);
	} catch (error) {
		return response.json({ error: error.message });
	}
});

export default appointmentRouter;
