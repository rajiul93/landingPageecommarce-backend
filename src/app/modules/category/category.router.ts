import express from 'express';
import { USER_ROLES } from '../../../const';
import { auth } from '../../middleware/authMiddleware';
import validateRequest from '../../middleware/validateRequest';
import { categoryController } from './category.controller';
import { categoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.ADMIN),
  validateRequest(categoryValidation.createCategorySchema),
  categoryController.createCategory
);
router.get(
  '/',
  auth(USER_ROLES.ADMIN),
  categoryController.getAllCategory
);

export const categoryRoutes = router;
