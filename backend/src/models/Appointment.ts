import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export default class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	providerId: string;

	@Column('timestamp with time zone')
	date: Date;

	@Column('timestamp with time zone')
	createAt: Date;

	@Column('timestamp with time zone')
	updateAt: Date;
}
