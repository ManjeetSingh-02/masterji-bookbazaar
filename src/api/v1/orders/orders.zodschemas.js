// import external modules
import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      bookId: z.string().nonempty('Book ID is required'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    })
  ),
  shippingAddress: z.object({
    houseNo: z.string().nonempty('House number is required'),
    street: z.string().nonempty('Street is required'),
    city: z.string().nonempty('City is required'),
    state: z.string().nonempty('State is required'),
    country: z.string().nonempty('Country is required'),
    pincode: z.string().nonempty('Pincode is required'),
  }),
});
