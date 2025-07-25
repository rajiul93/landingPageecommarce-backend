import express from "express";
import validateRequest from "../../../middleware/validateRequest";

import { userDetailsController } from "./userDetails.controller";
import { createUserDetailsZodSchema } from "./userDetails.validation";

const router = express.Router();

router.get(
  "/:userId",
  validateRequest(createUserDetailsZodSchema),
  userDetailsController.getUserDetails
);

router.patch(
  "/:userId",
  validateRequest(createUserDetailsZodSchema),
  userDetailsController.updateUserDetails
);

export const userDetailsRoutes = router;
