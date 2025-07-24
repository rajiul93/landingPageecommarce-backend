export interface IUser {
  name: string;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date | null;
  role?: 'superAdmin' | 'admin' | 'user';
  status?: 'in-progress' | 'blocked';
  isDeleted?: boolean;
}
