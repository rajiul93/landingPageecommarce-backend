import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../../../../config";
import AppError from "../../../error/AppError";
import { UserDetails } from "../userDetails/userDetails.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

export const createUser = async (userData: IUser): Promise<string> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Check if user exists
    const isExist = await UserModel.findOne({ email: userData.email }).session(
      session
    );
    if (isExist) {
      throw new AppError(409, "User already exists");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds)
    );

    // 3. Create user
    const createdUser = await UserModel.create(
      [
        {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          isDeleted: false,
          needsPasswordChange: false,
          role: "user",
          status: "active",
        },
      ],
      { session }
    );

    // 4. Create userDetails with default empty fields
    await UserDetails.create(
      [
        {
          userId: createdUser[0]._id.toString(),
          phone: "",
          profileImage: "",
          addresses: [],
          wishlist: [],
          cart: [],
        },
      ],
      { session }
    );

    // 5. Commit transaction
    await session.commitTransaction();
    session.endSession();

    return "User created successfully";
  } catch (error) {
    // 6. Rollback transaction on error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const userService = {
  createUser,
};
