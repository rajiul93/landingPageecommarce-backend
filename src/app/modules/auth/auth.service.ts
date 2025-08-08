import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { USER_ROLES } from "../../../const";
import AppError from "../../error/AppError";
import { UserModel } from "../users/user/user.model";

export const AuthService = {
  loginUser: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // 1️⃣ Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // 2️⃣ Check if user is deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
    }

    // 3️⃣ Check if user status is active
    if (user.status !== "active") {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Cannot login, user status is ${user.status}`
      );
    } 

    // 4️⃣ Validate password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }

    // 5️⃣ Optional: Check needsPasswordChange
    // if (user.needsPasswordChange) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'User needs to change password first');
    // }

    // 6️⃣ Generate JWT token

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      config.jwt_secret,
      {
        expiresIn: '1d',
      }
    );
// expiresIn: config.jwt_expires_in
    // 7️⃣ Return safe data (never return password)
    return {
      token,
      user: { 
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };
  },
  loginAdmin: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // 1️⃣ Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // 2️⃣ Check if user is deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
    }

    // 3️⃣ Check if user status is active
    if (user.status !== "active") {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Cannot login, user status is ${user.status}`
      );
    } 
    if (user.role !== USER_ROLES.ADMIN) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Cannot login, user status is ${user.role}`
      );
    } 

    // 4️⃣ Validate password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }

    // 5️⃣ Optional: Check needsPasswordChange
    // if (user.needsPasswordChange) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'User needs to change password first');
    // }

    // 6️⃣ Generate JWT token

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      config.jwt_secret,
      {
        expiresIn: '1d',
      }
    );
// expiresIn: config.jwt_expires_in
    // 7️⃣ Return safe data (never return password)
    return {
      token,
      user: { 
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };
  },
};
