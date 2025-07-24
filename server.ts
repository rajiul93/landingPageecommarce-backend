import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import config from './src/config';
 

dotenv.config();
 

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('✅ Database connected');
    app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database', error);
  }
}

main();
