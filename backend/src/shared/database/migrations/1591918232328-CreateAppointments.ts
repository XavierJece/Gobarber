import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1591918232328
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'providerId',
						type: 'uuid',
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
					},
					{
						name: 'createAt',
						type: 'timestamp with time zone',
						default: 'now()',
					},
					{
						name: 'updateAt',
						type: 'timestamp with time zone',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('appointments');
	}
}
