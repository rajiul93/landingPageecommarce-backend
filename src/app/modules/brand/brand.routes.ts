import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { brandController } from './brand.controller';
import { brandValidation } from './brand.validation';
 

const router = express.Router();

router.post(
  '/',
  validateRequest(brandValidation.createBrandSchema),
  brandController.createBrand
);

export const brandRoutes = router;
