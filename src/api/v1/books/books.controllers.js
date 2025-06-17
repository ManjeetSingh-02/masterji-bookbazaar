// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';
import { Book } from '../../../models/book.models.js';

// @controller GET /
export const getAllBooks = asyncHandler(async (req, res) => {
  // get user from db by it's id
  const allBooks = await Book.find();

  // success status to user
  return res.status(200).json(new APIResponse(200, 'All Books fetched successfully', allBooks));
});

// @controller GET /:bookId
export const getBookDetailsById = asyncHandler(async (req, res) => {
  // get book details by it's id
  const existingBook = await Book.findById(req.params.bookId);

  // if book not found, throw error
  if (!existingBook) throw new APIError(404, 'Get Book Details Error', 'Book not found');

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'Book Details fetched successfully', existingBook));
});

