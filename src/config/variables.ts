import { config } from 'dotenv';

config({
  debug: process.env.NODE_ENV !== 'production',
  encoding: 'utf8',
})

export const Server = {
  httpPort: process.env.HTTP_PORT,
  httpsPort: process.env.HTTP_PORT,
  environment: process.env.NODE_ENV,
};

export const rateLimit = {
  max: Number.parseInt(process.env.RATE_LIMIT_MAX ?? '100'),
  windowMs: Number.parseInt(process.env.RATE_LIMIT_TIME ?? `${15 * 60 * 1000}`),
};

export const posthog: {
  publicKey: string;
  personProfiles: string;
} = {
  publicKey: process.env.POSTHOG_PUBLIC_KEY as string,
  personProfiles: process.env.POSTHOG_PERSON_PROFILES as 'identified_only' ? 'identified_only' : 'always',
};
