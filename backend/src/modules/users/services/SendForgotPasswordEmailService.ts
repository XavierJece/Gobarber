import { inject, injectable } from 'tsyringe';
import AppError from '@shared/Errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
	email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,
	) {}

	public async execute({ email }: IRequest): Promise<void> {
		const userExists = await this.usersRepository.findByEmail(email);

		if (!userExists) {
			throw new AppError('User does not exist.');
		}

		const { token } = await this.userTokensRepository.generate(userExists.id);

		await this.mailProvider.sendMail(
			email,
			`Pedido de recuperação de senha recebido ${token}`,
		);
	}
}
