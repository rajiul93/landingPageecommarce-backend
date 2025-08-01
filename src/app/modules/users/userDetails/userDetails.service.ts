import { UserDetails } from "./userDetails.model";
import { IAddress } from "./userDetails.interface";
import AppError from "../../../error/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";

const updateProfileDetails = async (
  detailsID: string,
  data: { profileImage?: string; address?: IAddress }
) => {
  const addressId = new mongoose.Types.ObjectId(data?.address?.id);
  if (data.profileImage) {
    await UserDetails.findByIdAndUpdate(detailsID, {
      $set: { profileImage: data.profileImage },
    });
    return "Image update succecssfulley";
  }
  if (!data?.address?.id) {
    await UserDetails.updateOne(
      { _id: detailsID },
      {
        $push: {
          addresses: data.address,
        },
      }
    );
    return "New address is added";
  } else if (data?.address?.id) {
   const result =  await UserDetails.updateOne(
      { _id: detailsID, "addresses._id": addressId },
      { $set: { "addresses.$": data.address } }
    );
    return result
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Address id is required");
  }
};
export const userDetailsServer = {
  updateProfileDetails,
};
