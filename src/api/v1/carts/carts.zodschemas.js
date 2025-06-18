// import external modules
import { z } from 'zod';

// zod schema for updateCart
export const updateCartSchema = z.object({
  bookId: z.string().nonempty('Book ID is required'),
});
