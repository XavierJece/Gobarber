import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
	const appointmentRepository = getCustomRepository(AppointmentRepository);

	const appointments = await appointmentRepository.find();

	response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
	const { providerId, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentService();

	const appointment = await createAppointment.execute({
		date: parsedDate,
		providerId,
	});

	response.json(appointment);
});

export default appointmentRouter;
