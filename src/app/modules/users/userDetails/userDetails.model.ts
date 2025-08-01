import { Schema, model } from 'mongoose';
import { IUserDetails } from './userDetails.interface';
import { boolean } from 'zod';


const userDetailsSchema = new Schema<IUserDetails>(
  {
    profileImage: { type: String },
    addresses: [
      {
        label: String,
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        isDefault:Boolean
      },
    ],
    wishlist: [{ type: String }],
    cart: [
      {
        productId: String,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export const UserDetails = model<IUserDetails>('UserDetails', userDetailsSchema);
