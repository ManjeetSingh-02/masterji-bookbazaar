// import local modules
import { asyncHandler } from '../../../../utils/async-handler.js';
import { APIError } from '../../../error.api.js';
import { APIResponse } from '../../../response.api.js';
import { Review } from '../../../../models/review.models.js';
import { Book } from '../../../../models/book.models.js';
import { paginateResources } from '../../../../utils/paginate.js';

// @controller POST /
export const addReview = asyncHandler(async (req, res) => {
  // get data from request body
  const { comment } = req.body;

  // check if book exists
  const existingBook = await Book.findById(req.params.bookId);
  if (!existingBook) throw new APIError(404, 'Add Review Error', 'Book not found');

  // check if a reivew already exists for the book by the user
  const existingReview = await Review.findOne({
    bookId: req.params.bookId,
    userId: req.user.id,
  });
  if (existingReview)
    throw new APIError(400, 'Add Review Error', 'You have already reviewed this book');

  // create a new review
  const newReview = await Review.create({
    bookId: req.params.bookId,
    userId: req.user.id,
    comment,
  });
  if (!newReview)
    throw new APIError(500, 'Add Review Error', 'Something went wrong while adding your review');

  // success status to user
  return res.status(201).json(
    new APIResponse(201, 'Review added successfully', {
      _id: newReview._id,
      comment: newReview.comment,
    })
  );
});

// @controller GET /
export const getAllReviews = asyncHandler(async (req, res) => {
  // check if book exists
  const existingBook = await Book.findById(req.params.bookId);
  if (!existingBook) throw new APIError(404, 'Get Reviews Error', 'Book not found');

  // get all reviews for a book
  const allReviews = await Review.find({ bookId: existingBook._id })
    .populate('userId', '_id username')
    .select('-bookId -__v');

  // paginate reviews
  const paginatedReviews = paginateResources(allReviews, 10);

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'All reviews fetched successfully', paginatedReviews));
});

// @controller DELETE /:reviewId
export const deleteReview = asyncHandler(async (req, res) => {
  // get bookId and reviewId from request params
  const { bookId, reviewId } = req.params;

  // check if book exists
  const existingBook = await Book.findById(req.params.bookId);
  if (!existingBook) throw new APIError(404, 'Delete Review Error', 'Book not found');

  // check if the review exists for the book by the user
  const existingReview = await Review.findOne({
    _id: reviewId,
    bookId,
    userId: req.user.id,
  });
  if (!existingReview) throw new APIError(404, 'Delete Review Error', 'Review not found');

  // delete the review
  await Review.deleteOne({ _id: reviewId, bookId, userId: req.user.id });

  // success status to user
  return res.status(200).json(new APIResponse(200, 'Review deleted successfully'));
});
