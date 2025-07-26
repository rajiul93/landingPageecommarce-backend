import express from "express";
import validateRequest from "../../../middleware/validateRequest";

import { USER_ROLES } from "../../../../const";
import { auth } from "../../../middleware/authMiddleware";
import { userDetailsController } from "./userDetails.controller";
import { createUserDetailsZodSchema } from "./userDetails.validation";

const router = express.Router();

router.get(
  "/:userId",
  auth(USER_ROLES.ADMIN),
  userDetailsController.getUserDetails
);

router.patch(
  "/:userId",
  validateRequest(createUserDetailsZodSchema),
  userDetailsController.updateUserDetails
);

export const userDetailsRoutes = router;
