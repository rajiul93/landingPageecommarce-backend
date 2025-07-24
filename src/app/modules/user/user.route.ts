import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserController } from './user.controller';
import { UserZodSchema } from './user.validation';

const router = express.Router();

router.post('/', validateRequest(UserZodSchema), UserController.createUser);

export const userRoutes = router;
