// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';
import { Book } from '../../../models/book.models.js';

// @controller POST /
export const addBook = asyncHandler(async (req, res) => {
  // get data from request body
  const { title, description, authors, publisher, publishedDate, pageCount, coverImg } = req.body;

  // check if a book with the same title already exists
  const existingBook = await Book.findOne({ title });
  if (existingBook)
    throw new APIError(409, 'Add Book Error', 'Book with this title already exists');

  // create a new book
  const newBook = await Book.create({
    title,
    description,
    authors,
    publisher,
    publishedDate,
    pageCount,
    coverImg,
    addedBy: req.user.id,
  });
  if (!newBook)
    throw new APIError(500, 'Add Book Error', 'Something went wrong while adding the book');

  // success status to user
  return res.status(201).json(new APIResponse(201, 'Book added successfully'));
});

// @controller GET /
export const getAllBooks = asyncHandler(async (req, res) => {
  // get user from db by it's id
  const allBooks = await Book.find()
    .populate('addedBy', '_id username role')
    .select('-createdAt -updatedAt -__v');

  // success status to user
  return res.status(200).json(new APIResponse(200, 'All Books fetched successfully', allBooks));
});

// @controller GET /:bookId
export const getBookDetailsById = asyncHandler(async (req, res) => {
  // get book details by it's id
  const existingBook = await Book.findById(req.params.bookId)
    .populate('addedBy', '_id username role')
    .select('-createdAt -updatedAt -__v');

  // if book not found, throw error
  if (!existingBook) throw new APIError(404, 'Get Book Details Error', 'Book not found');

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'Book Details fetched successfully', existingBook));
});
