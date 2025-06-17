// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';
import { Book } from '../../../models/book.models.js';
import { Review } from '../../../models/review.models.js';
import { paginateResources } from '../../../utils/paginate.js';

// @controller POST /
export const addBook = asyncHandler(async (req, res) => {
  // get data from request body
  const { title, description, authors, publisher, publishedYear, pageCount, coverImg, price } =
    req.body;

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
    publishedYear,
    pageCount,
    coverImg,
    price,
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

  // paginate books
  const paginatedBooks = paginateResources(allBooks, 10);

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'All Books fetched successfully', paginatedBooks));
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

// @controller PUT /:bookId
export const updateBook = asyncHandler(async (req, res) => {
  // get data from request body
  const { description, publisher, publishedYear, coverImg, price } = req.body;

  // get book by it's id
  const existingBook = await Book.findById(req.params.bookId).select(
    '_id description publisher publishedYear coverImg'
  );
  if (!existingBook) throw new APIError(404, 'Update Book Error', 'Book not found');

  // update book
  existingBook.description = description;
  existingBook.publisher = publisher;
  existingBook.publishedYear = publishedYear;
  existingBook.coverImg = coverImg;
  existingBook.price = price;

  // save updated book
  await existingBook.save();

  // success status to user
  return res.status(200).json(new APIResponse(200, 'Book updated successfully', existingBook));
});

// @controller DELETE /:bookId
export const deleteBook = asyncHandler(async (req, res) => {
  // get book by it's id
  const existingBook = await Book.findById(req.params.bookId);
  if (!existingBook) throw new APIError(404, 'Delete Book Error', 'Book not found');

  // delete all the reviews associated with the book
  await Review.deleteMany({ bookId: existingBook._id });

  // delete book
  await Book.deleteOne({ _id: req.params.bookId });

  // success status to user
  return res.status(200).json(new APIResponse(200, 'Book deleted successfully'));
});
