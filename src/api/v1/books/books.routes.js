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
} from './books.controllers.js';
import { addBookSchema, updateBookSchema } from './books.zodschemas.js';
import reviewsRouter from './reviews/reviews.routes.js';

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

// export router
export default router;
