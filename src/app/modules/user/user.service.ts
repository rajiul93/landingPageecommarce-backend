import config from '../../../config';
import AppError from '../../error/AppError';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';
export const createUser = async (userData: IUser): Promise<string> => {
  // 1️⃣ Check if user exists
  const isExist = await UserModel.findOne({ email: userData.email });
  if (isExist) {
    throw new AppError(409, 'User already exists');
  }
  const userDataCreated: IUser = {
    name: userData.name,
    email: userData.email,
    isDeleted: false,
    needsPasswordChange: false,
    password: userData.password,
    role: 'user',
    status: 'in-progress',
  };
  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );
  userData.password = hashedPassword;

  // 3️⃣ Default fields (if missing)
  if (!userData.status) userData.status = 'in-progress';
  if (typeof userData.isDeleted !== 'boolean') userData.isDeleted = false;

  // 4️⃣ Create user
  await UserModel.create(userDataCreated);

  // 5️⃣ Remove password before returning
  return 'User create succefully';
};

export const userService = {
  createUser,
};
