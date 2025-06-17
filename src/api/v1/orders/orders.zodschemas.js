// import external modules
import { z } from 'zod';

export const createOrderSchema = z.object({
  quantity: z
    .number()
    .positive('Quantity must be a greater than 0')
    .min(1, 'Quantity must be at least 1')
    .max(100, 'Quantity cannot exceed 100'),
  address: z.string(),
});
