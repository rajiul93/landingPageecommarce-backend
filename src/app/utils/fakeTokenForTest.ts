import jwt from "jsonwebtoken";
import config from "../../config";
import { USER_ROLES } from "../../const";

export const generateAdminToken = () => {
   const token = jwt.sign(
      {
        userId: "user._id",
        role: USER_ROLES.ADMIN,
      },
      config.jwt_secret,
      {
        expiresIn: '1d',
      }
    );

  return token;
};