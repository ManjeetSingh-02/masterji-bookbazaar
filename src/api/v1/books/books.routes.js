// import local modules
import { UserRolesEnum } from '../../../utils/constants.js';
import {
  hasRequiredRole,
  isLoggedIn,
  validateAPIKey,
  validateSchema,
} from '../../../utils/route-protector.js';
import {
  addBook,
  deleteBook,
  updateBook,
  getAllBooks,
  getBookDetailsById,
  searchBook,
  sortBooks,
} from './books.controllers.js';
import {
  addBookSchema,
  searchBookSchema,
  sortBooksSchema,
  updateBookSchema,
} from './books.zodschemas.js';
import { addReviewSchema } from './reviews/reviews.zodschemas.js';
import { addReview, deleteReview, getAllReviews } from './reviews/reviews.controllers.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route POST /
router.post(
  '/',
  isLoggedIn,
  hasRequiredRole([UserRolesEnum.ADMIN]),
  validateAPIKey,
  validateSchema(addBookSchema),
  addBook
);

// @route GET /
router.get('/', isLoggedIn, validateAPIKey, getAllBooks);

// @route GET /:bookId
router.get('/:bookId', isLoggedIn, validateAPIKey, getBookDetailsById);

// @route PUT /:bookId
router.put(
  '/:bookId',
  isLoggedIn,
  hasRequiredRole([UserRolesEnum.ADMIN]),
  validateAPIKey,
  validateSchema(updateBookSchema),
  updateBook
);

// @route DELETE /:bookId
router.delete(
  '/:bookId',
  isLoggedIn,
  hasRequiredRole([UserRolesEnum.ADMIN]),
  validateAPIKey,
  deleteBook
);

// @route POST /:bookId/reviews
router.post(
  '/:bookId/reviews',
  isLoggedIn,
  validateAPIKey,
  validateSchema(addReviewSchema),
  addReview
);

// @route GET /:bookId/reviews
router.get('/:bookId/reviews', isLoggedIn, validateAPIKey, getAllReviews);

// @route DELETE /:bookId/reviews/:reviewId
router.delete('/:bookId/reviews/:reviewId', isLoggedIn, validateAPIKey, deleteReview);

// @route POST /search
router.post('/search', isLoggedIn, validateAPIKey, validateSchema(searchBookSchema), searchBook);

// @route POST /sort
router.post('/sort', isLoggedIn, validateAPIKey, validateSchema(sortBooksSchema), sortBooks);

// export router
export default router;
