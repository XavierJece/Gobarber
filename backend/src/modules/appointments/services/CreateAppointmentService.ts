import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/Errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
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
			throw new AppError('This appointment is already booked');
		}

		const appointment = appointmentRepository.create({
			providerId,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		return appointment;
	}
}
