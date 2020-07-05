import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Generated,
} from 'typeorm';

@Entity('user_tokens')
export default class UserToken {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Generated('uuid')
	token: string;

	@Column()
	userId: string;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
