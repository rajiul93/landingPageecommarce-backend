// src/database.ts
import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Failed to connect to database', error);
    throw error;
  }
};
