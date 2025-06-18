// import external modules
import { z } from 'zod';

// zod schema for createPayment
export const createPaymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
});

// zod schema for verifyPayment
export const verifyPaymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  razorpay_payment_id: z.string().min(1, 'Razorpay Payment ID is required'),
  razorpay_order_id: z.string().min(1, 'Razorpay Order ID is required'),
  razorpay_signature: z.string().min(1, 'Razorpay Signature is required'),
});
