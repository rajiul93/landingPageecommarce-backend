import express from "express";
import { USER_ROLES } from "../../../const";
import { auth } from "../../middleware/authMiddleware";
import validateRequest from "../../middleware/validateRequest";
import { brandController } from "./brand.controller";
import { brandValidation } from "./brand.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLES.ADMIN),
  validateRequest(brandValidation.createBrandSchema),
  brandController.createBrand
);
router.get(
  "/",
  auth(USER_ROLES.ADMIN), 
  brandController.getAllBrand
);
router.delete(
  "/:id",
  auth(USER_ROLES.ADMIN), 
  brandController.deleteBrand
);

export const brandRoutes = router;
