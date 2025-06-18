// import external modules
import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      bookId: z.string().nonempty('Book ID is required'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    })
  ),
  shippingAddress: z.string().nonempty('Shipping address is required'),
});
