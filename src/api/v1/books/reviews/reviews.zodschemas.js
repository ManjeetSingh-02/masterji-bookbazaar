// import external modules
import { z } from 'zod';

// zod schema for addReview
export const addReviewSchema = z.object({
  comment: z
    .string()
    .trim()
    .nonempty({ message: 'Review Comment is required' })
    .min(10, { message: 'Review Comment must be at least 10 characters long' })
    .max(200, { message: 'Review Comment must be at most 200 characters long' }),
});
