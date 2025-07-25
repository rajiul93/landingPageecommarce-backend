import express from "express";

import validateRequest from "../../middleware/validateRequest";
import { authController } from "./auth.controller";
import { loginZodSchema } from "./auth.validation";

const router = express.Router();

router.post("/login", validateRequest(loginZodSchema), authController.login);

export const authRoutes = router;
