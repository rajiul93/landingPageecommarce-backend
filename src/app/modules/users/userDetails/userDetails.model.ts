import { Schema, model } from 'mongoose'; 
import { boolean } from 'zod';
import { IUserDetails } from './userDetails.interface';


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
