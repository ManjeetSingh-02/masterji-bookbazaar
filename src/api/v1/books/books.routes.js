// import local modules
import { isLoggedIn, validateAPIKey } from '../../../utils/route-protector.js';
import { getAllBooks, getBookDetailsById } from './books.controllers.js';
import reviewsRouter from './reviews/reviews.routes.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route GET /
router.get('/', isLoggedIn, validateAPIKey, getAllBooks);

// @route GET /:bookId
router.get('/:bookId', isLoggedIn, validateAPIKey, getBookDetailsById);

// export router
export default router;
