import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone:string;
  userDetails?:Types.ObjectId;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date | null;
  role?: 'superAdmin' | 'admin' | 'user';
  status?: 'in-progress' | 'blocked' | 'active';
  isDeleted?: boolean;
}
