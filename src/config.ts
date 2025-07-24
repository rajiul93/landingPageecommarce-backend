import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  db_url: process.env.DB_URL as string,
  port: process.env.PORT || 5000,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
};
