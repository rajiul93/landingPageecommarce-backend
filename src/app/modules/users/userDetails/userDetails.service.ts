import { UserDetails } from "./userDetails.model";

export const getUserDetailsByUserId = async (userId: string) => {
  const result = await UserDetails.findOne({ userId });
  return result;
};

export const updateUserDetails = async (userId: string, payload: any) => {
  const result = await UserDetails.findOneAndUpdate({ userId }, payload, {
    new: true,
  });
  return result;
};
