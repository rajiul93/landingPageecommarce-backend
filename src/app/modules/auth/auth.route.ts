import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { loginZodSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginZodSchema),
  AuthController.loginUser
);

export const authRoutes = router;
