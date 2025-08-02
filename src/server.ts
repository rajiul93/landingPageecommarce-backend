// src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './app/database';
import config from './config';

const main = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`🚀 Server running at http://localhost:${config.port}`);
  });
};

main();
