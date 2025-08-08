import express from "express";

import validateRequest from "../../middleware/validateRequest";
import { authController } from "./auth.controller";
import { loginZodSchema } from "./auth.validation";

const router = express.Router();

router.post("/login", validateRequest(loginZodSchema), authController.loginUser);
router.post("/login-admin", validateRequest(loginZodSchema), authController.loginAdmin);

export const authRoutes = router;
