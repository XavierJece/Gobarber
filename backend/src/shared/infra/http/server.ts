import upload from '@config/upload';
import AppError from '@shared/Errors/AppError';
import express, { NextFunction, Request, Response } from 'express';

import routes from './routes';

import '@shared/infra/typeorm';
import 'express-async-errors';
import 'reflect-metadata';

const app = express();

app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);

app.use(
	(error: Error, request: Request, response: Response, _: NextFunction) => {
		if (error instanceof AppError) {
			return response.status(error.statusCode).json({
				status: 'error',
				message: error.message,
			});
		}

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	},
);

app.listen(3333, () => {
	// eslint-disable-next-line no-console
	console.log('...... Started on port 3333!');
});
