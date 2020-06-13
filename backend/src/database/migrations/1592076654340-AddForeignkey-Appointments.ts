import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignkeyAppointments1592076654340
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'AppointmentProvider',
				columnNames: ['providerId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
	}
}
