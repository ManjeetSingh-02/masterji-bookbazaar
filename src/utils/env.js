// import package modules
import { z } from 'zod';
import dotenv from 'dotenv';

//dotenv file config
dotenv.config({ path: './.env' });

// config for environment variables
export const envConfig = {
  ORIGIN_URL: String(process.env.ORIGIN_URL),
  PORT: Number(process.env.PORT),
  MONGODB_URI: String(process.env.MONGODB_URI),
  NODE_ENV: String(process.env.NODE_ENV),
  ACCESS_TOKEN_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
  ACCESS_TOKEN_EXPIRY: String(process.env.ACCESS_TOKEN_EXPIRY),
  REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
  REFRESH_TOKEN_EXPIRY: String(process.env.REFRESH_TOKEN_EXPIRY),
  MAIL_SERVICE_HOST: String(process.env.MAIL_SERVICE_HOST),
  MAIL_SERVICE_PORT: Number(process.env.MAIL_SERVICE_PORT),
  MAIL_SERVICE_USERNAME: String(process.env.MAIL_SERVICE_USERNAME),
  MAIL_SERVICE_PASSWORD: String(process.env.MAIL_SERVICE_PASSWORD),
  MAIL_SERVICE_FROM: String(process.env.MAIL_SERVICE_FROM),
  RAZORPAY_KEY_ID: String(process.env.RAZORPAY_KEY_ID),
  RAZORPAY_KEY_SECRET: String(process.env.RAZORPAY_KEY_SECRET),
};

// zod schema for environment variables
export const envSchema = z.object({
  ORIGIN_URL: z.string().url({ message: 'ORIGIN_URL must be a valid URL' }),
  PORT: z.number().int().positive(),
  MONGODB_URI: z.string().url({ message: 'MONGO_URI must be a valid MongoDB URI' }),
  NODE_ENV: z.enum(['development', 'testing', 'production']),
  ACCESS_TOKEN_SECRET: z
    .string()
    .min(32, 'ACCESS_TOKEN_SECRET must be at least 32 characters long'),
  ACCESS_TOKEN_EXPIRY: z
    .string()
    .regex(/^\d+[smhd]$/, 'ACCESS_TOKEN_EXPIRY must be a valid duration (e.g., 15m, 1h, 1d)'),
  REFRESH_TOKEN_SECRET: z
    .string()
    .min(32, 'REFRESH_TOKEN_SECRET must be at least 32 characters long'),
  REFRESH_TOKEN_EXPIRY: z
    .string()
    .regex(/^\d+[smhd]$/, 'REFRESH_TOKEN_EXPIRY must be a valid duration (e.g., 15m, 1h, 1d)'),
  MAIL_SERVICE_HOST: z.string(),
  MAIL_SERVICE_PORT: z.number().int().positive(),
  MAIL_SERVICE_USERNAME: z.string(),
  MAIL_SERVICE_PASSWORD: z.string(),
  MAIL_SERVICE_FROM: z
    .string()
    .email({ message: 'MAIL_SERVICE_FROM must be a valid email address' }),
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string(),
});

// function to validate environment variables
export const validateEnv = () => {
  // get parsed result of environment variables
  const result = envSchema.safeParse(envConfig);

  // if validation fails, throw an error with details
  if (!result.success) {
    const errorMessages = result.error.errors
      .map(error => `${error.path.join('.')}: ${error.message}`)
      .join('\n');

    Promise.reject(`Env variables validation: ❌\n${errorMessages}`);
  }

  // if validation succeeds, return new Promise that resolves with a success message
  return new Promise(resolve => resolve(console.log('Env variables validation: ✅')));
};
