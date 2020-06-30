import { startOfHour } from 'date-fns';
import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
	providerId: string;
	date: Date;
}
@injectable()
export default class CreateAppointmentService {
	constructor(
		@inject('AppointmentRepository')
		private appointmentRepository: IAppointmentsRepository,
	) {}

	public async execute({ date, providerId }: IRequest): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw new AppError('This appointment is already booked');
		}

		const appointment = await this.appointmentRepository.create({
			providerId,
			date: appointmentDate,
		});

		return appointment;
	}
}
