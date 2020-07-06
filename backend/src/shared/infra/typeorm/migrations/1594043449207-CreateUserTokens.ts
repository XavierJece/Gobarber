import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserTokens1594043449207
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user_tokens',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'token',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'userId',
						type: 'uuid',
						isPrimary: true,
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
				foreignKeys: [
					{
						name: 'TokenUser',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['userId'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_tokens');
	}
}
