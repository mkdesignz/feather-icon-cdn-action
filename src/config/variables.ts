import dotenv from 'dotenv';
import { PoolConfig } from 'mysql';

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
  max: Number.parseInt(process.env.RATE_LIMIT_MAX),
  windowMs: Number.parseInt(process.env.RATE_LIMIT_TIME),
};

export const posthog: {
  public_key: string;
  person_profiles: any;
} = {
  public_key: process.env.POSTHOG_PUBLIC_KEY,
  person_profiles: process.env.POSTHOG_PERSON_PROFILES,
};
