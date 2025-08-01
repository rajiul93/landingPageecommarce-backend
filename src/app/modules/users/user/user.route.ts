import express from "express";
import validateRequest from "../../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserZodSchema } from "./user.validation";
import { auth } from "../../../middleware/authMiddleware";
import { USER_ROLES } from "../../../../const";

const router = express.Router();

router.post("/", validateRequest(UserZodSchema), UserController.createUser);
router.post("/all-user", auth(USER_ROLES.ADMIN), UserController.getAllUsers);
router.post('/:userId', auth(USER_ROLES.ADMIN), UserController.getSingleUser); 
export const userRoutes = router;
