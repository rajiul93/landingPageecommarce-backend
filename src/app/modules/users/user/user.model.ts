import { Schema, model, Types } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true,
      trim: true,
      lowercase: true
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'],
      // select: false // Never return password in queries
    },
    phone: { 
      type: String, 
      required: [true, 'Phone is required'] 
    },
    userDetails: { 
      type: Schema.Types.ObjectId, 
      ref: 'UserDetails' 
    },
    needsPasswordChange: { 
      type: Boolean, 
      default: false 
    },
    passwordChangedAt: { 
      type: Date 
    },
    role: {
      type: String,
      enum: {
        values: ['superAdmin', 'admin', 'user'],
        message: '{VALUE} is not a valid role'
      },
      default: 'user'
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked', 'active'],
        message: '{VALUE} is not a valid status'
      },
      default: 'in-progress'
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    }
  },
  { 
    timestamps: true, 
  }
);

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ status: 1 });

export const UserModel = model<IUser>('User', userSchema);