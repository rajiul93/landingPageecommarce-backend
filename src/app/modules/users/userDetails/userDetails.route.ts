import express from "express";
import validateRequest from "../../../middleware/validateRequest";

import { USER_ROLES } from "../../../../const";
import { auth } from "../../../middleware/authMiddleware";
import { userDetailsController } from "./userDetails.controller"; 
import { userZodValidation } from "./userDetails.validation";

const router = express.Router();

 
router.patch(
  '/:userId/details',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),
  validateRequest(userZodValidation.ProfileUpdateSchema),
  userDetailsController.updateProfileDetails
);
export const userDetailsRoutes = router;
