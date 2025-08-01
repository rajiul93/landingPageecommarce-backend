import { NextFunction, Request, Response } from "express";

import config from "../../config";
import { verifyToken } from "../utils/jwtHelpers";

// main middleware
export const auth = (...requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // cookie থেকে token নাও
      const token = req.cookies?.accessToken; 

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No token provided",
        });
      }

      // token verify
      const decoded = verifyToken(token, config.jwt_secret);
      req.user = decoded; // req.user এ attach করলাম

      // role check
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have the required role",
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
  };
};
