// routes/product.routes.ts
import express from 'express';
import { USER_ROLES } from '../../../const';
import { auth } from '../../middleware/authMiddleware';
import validateRequest from '../../middleware/validateRequest';
import { productController } from './product.controller';
import { createProductSchema } from './product.validation';
 

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), // কেবল admin/super admin
  validateRequest(createProductSchema),
  productController.createProduct
);

export const productRoutes = router;
