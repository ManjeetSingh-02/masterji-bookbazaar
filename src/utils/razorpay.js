// import local modules
import { envConfig } from './env.js';

// import external modules
import Razorpay from 'razorpay';

// create Razorpay instance with key_id and key_secret from environment variables
export const razorpayInstance = new Razorpay({
  key_id: envConfig.RAZORPAY_KEY_ID,
  key_secret: envConfig.RAZORPAY_KEY_SECRET,
});
