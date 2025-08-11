import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../config";
import { USER_ROLES } from "../../const";

export const generateAdminToken = () => {
   const token = jwt.sign(
      {
        userId:  new mongoose.Types.ObjectId(),
        role: USER_ROLES.ADMIN,
      },
      config.jwt_secret,
      {
        expiresIn: '1d',
      }
    );

  return token;
};
export const generateUserToken = () => {
   const token = jwt.sign(
      {
        userId: "user._id",
        role: USER_ROLES.USER,
      },
      config.jwt_secret,
      {
        expiresIn: '1d',
      }
    );

  return token;
};