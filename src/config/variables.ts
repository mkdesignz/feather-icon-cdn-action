import dotenv from 'dotenv';
import { PoolConfig } from 'mysql';
import { Options as RateLimitOptions } from 'express-rate-limit';

dotenv.config();

export const Server = {
  httpPort: process.env.HTTP_PORT,
  httpsPort: process.env.HTTP_PORT,
  environment: process.env.NODE_ENV,
};

export const DataBase: PoolConfig = {
  host: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  debug: false,
};
export const rateLimit = {
  max: process.env.RATE_LIMIT_MAX as unknown as number,
  windowMs: process.env.RATE_LIMIT_TIME as unknown as number,

}
