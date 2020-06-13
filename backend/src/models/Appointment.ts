import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
export default class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	providerId: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'providerId' })
	provider: User;

	@Column('timestamp with time zone')
	date: Date;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
