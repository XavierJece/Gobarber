import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new Error('JWT token is missing');
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, auth.jwt.secret);

		const { sub } = decoded as ITokenPayload;

		request.user = {
			id: sub,
		};

		return next();
	} catch {
		throw new Error('Invalid JWT token');
	}
}