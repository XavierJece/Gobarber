import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';

import AppointmentRepository from '../repositories/AppointmentRepository';

interface IRequest {
	providerId: string;
	date: Date;
}

export default class CreateAppointmentService {
	public async execute({ date, providerId }: IRequest): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(AppointmentRepository);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}

		const appointment = appointmentRepository.create({
			providerId,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		return appointment;
	}
}
