// import local modules
import {
  AvailableSearchTypes,
  AvailableSortTypes,
  AvailableSortOrders,
} from '../../../utils/constants.js';

// import external modules
import { z } from 'zod';

// zod schema for title
const titleSchema = z
  .string()
  .trim()
  .nonempty({ message: 'Book Title is required' })
  .min(3, { message: 'Book Title must be at least 3 characters long' })
  .max(30, { message: 'Book Title must be at most 30 characters long' });

// zod schema for description
const descriptionSchema = z
  .string()
  .trim()
  .nonempty({ message: 'Book Description is required' })
  .min(10, { message: 'Book Description must be at least 10 characters long' })
  .max(200, { message: 'Book Description must be at most 200 characters long' });

// zod schema for authors
const authorsSchema = z
  .array(z.string().trim().nonempty({ message: 'Author Name is required' }))
  .min(1, { message: 'At least one author is required' });

// zod schema for publisher
const publisherSchema = z.string().trim().nonempty({ message: 'Book Publisher name is required' });

// zod schema for publishedYear
const publishedYearSchema = z
  .number()
  .int()
  .positive({ message: 'Published Year must be a positive integer' })
  .min(1000, { message: 'Published Year must be at least 1000' })
  .max(new Date().getFullYear(), { message: `Published Year cannot be in the future` });

// zod schema for pageCount
const pageCountSchema = z
  .number()
  .int()
  .positive({ message: 'Page Count must be a positive integer' })
  .min(1, { message: 'Page Count must be at least 1' });

// zod schema for coverImg
const coverImgSchema = z.string().trim().url({ message: 'Thumbnail must be a valid URL' });

// zod schema for price
const priceSchema = z
  .number()
  .positive({ message: 'Price must be a positive number' })
  .min(1, { message: 'Price must be at least 1' });

// zod schema for addBook
export const addBookSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  authors: authorsSchema,
  publisher: publisherSchema,
  publishedYear: publishedYearSchema,
  pageCount: pageCountSchema,
  coverImg: coverImgSchema,
  price: priceSchema,
});

// zod schema for updateBook
export const updateBookSchema = z.object({
  description: descriptionSchema,
  publisher: publisherSchema,
  publishedYear: publishedYearSchema,
  coverImg: coverImgSchema,
  price: priceSchema,
});

// zod schema for searchBook
export const searchBookSchema = z.object({
  searchType: z.enum(AvailableSearchTypes),
  searchQuery: z.string().trim().nonempty({ message: 'Search query is required' }),
});

// zod schema for sortBooks
export const sortBooksSchema = z.object({
  sortType: z.enum(AvailableSortTypes),
  sortOrder: z.enum(AvailableSortOrders),
});
