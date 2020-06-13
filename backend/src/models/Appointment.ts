import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
export default class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	providerId: string;

	@Column('timestamp with time zone')
	date: Date;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
