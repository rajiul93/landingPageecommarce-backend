import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { categoryController } from './category.controller';
import { categoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidation.createCategorySchema),
  categoryController.createCategory
);

export const categoryRoutes = router;
