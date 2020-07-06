import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ReseatPasswordController from '../controllers/ReseatPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const reseatPasswordController = new ReseatPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', reseatPasswordController.create);

export default passwordRouter;
