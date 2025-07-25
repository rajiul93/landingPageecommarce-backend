import { Schema, model } from 'mongoose';
import { IUserDetails } from './userDetails.interface';


const userDetailsSchema = new Schema<IUserDetails>(
  {
    userId: { type: String, required: true, unique: true },
    phone: { type: String },
    profileImage: { type: String },
    addresses: [
      {
        label: String,
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
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
