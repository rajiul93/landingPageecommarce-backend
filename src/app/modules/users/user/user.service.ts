import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../../../../config";
import AppError from "../../../error/AppError";
import { UserDetails } from "../userDetails/userDetails.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import httpStatus from "http-status";

const createUser = async (userData: IUser): Promise<string> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Check if user exists
    const isExist = await UserModel.findOne({ email: userData.email }).session(session);
    if (isExist) {
      throw new AppError(409, "User already exists");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds)
    );

    // 3. Create user (without userDetails initially)
    const createdUser = await UserModel.create(
      [
        {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: hashedPassword,
          isDeleted: false,
          needsPasswordChange: false,
          role: "user",
          status: "active",
        },
      ],
      { session }
    );

    // 4. Create UserDetails referencing userId
    await UserDetails.create(
      {
        userId: createdUser[0]._id,    // এখানে দিতে হবে
        profileImage: "",
        addresses: [],
        wishlist: [],
        cart: [],
      },
      { session }
    );

    // 5. Commit
    await session.commitTransaction();
    return "User created successfully";
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
// Get all users
const getAllUsers = async () => {
  const users = await UserModel.find()
    .select('_id name email phone userDetails') // Only include these fields
    .lean(); // Convert to plain JS object
  
  return users;
};

const getSingleUser = async (userId: string) => {
  const user = await UserModel.findById(userId).select('-password'); // Exclude password

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};
export const userService = {
  createUser,
  getAllUsers,
  getSingleUser
};
