// routes/rating.route.ts
import express from "express";
import { USER_ROLES } from "../../../const";
import { auth } from "../../middleware/authMiddleware";
import validateRequest from "../../middleware/validateRequest";
import { ratingController } from "./rating.controller";
import { createRatingSchema } from "./rating.validation";

const router = express.Router();

/**
 * POST /api/ratings
 * Body: { productId, rating, comment? }
 * Auth: USER (or higher)
 */
router.post(
  "/",
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(createRatingSchema),
  ratingController.createRating
);

export const ratingRoutes = router;
