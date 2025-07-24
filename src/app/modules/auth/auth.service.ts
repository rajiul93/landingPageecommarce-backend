import { User } from '../user/user.model';

export const AuthService = {
  loginUser: async ({ email, password }: { email: string; password: string }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // এখানে সরলভাবে password মেলাচ্ছি (production এ অবশ্যই bcrypt/hash check করবে)
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }

    // এখানে চাইলে JWT token generate করতে পারো
    return user;
  },
};
