import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
export default class AppointmentRepository extends Repository<Appointment> {
	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = await this.findOne({
			where: { date },
		});

		return findAppointment;
	}
}
