import { NextFunction, Request, Response } from "express";

import config from "../../config";
import { verifyToken } from "../utils/jwtHelpers";

// main middleware
export const auth = (...requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.header("authorization");
      if (!authorization) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No token provided",
        });
      }

      const token = authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No token provided",
        });
      }

      const decoded = verifyToken(token, config.jwt_secret);
      req.user = decoded;

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
