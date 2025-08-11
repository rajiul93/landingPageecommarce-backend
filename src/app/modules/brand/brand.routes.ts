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

export const brandRoutes = router;
