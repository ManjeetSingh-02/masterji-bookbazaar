// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';
import { Book } from '../../../models/book.models.js';
import { paginateResources } from '../../../utils/paginate.js';
import { Order } from '../../../models/order.models.js';
import { sendMail } from '../../../utils/send-mail.js';
import { orderConfirmationMailContentGenerator } from '../../../utils/genContent-mail.js';
import { User } from '../../../models/user.models.js';

// @controller POST /
export const createOrder = asyncHandler(async (req, res) => {
  // get data from request body
  const { bookId, quantity, address } = req.body;

  // check if book exists
  const existingBook = await Book.findById(bookId);
  if (!existingBook) throw new APIError(404, 'Create Order Error', 'Book not found');

  // get user details
  const existingUser = await User.findById(req.user.id);

  // create new order
  const newOrder = await Order.create({
    address,
    bookId: existingBook._id,
    quantity,
    pricePerQuantity: existingBook.price,
    userId: req.user.id,
  });
  if (!newOrder)
    throw new APIError(500, 'Create Order Error', 'Something went wrong while creating the order');

  // send order confirmation to user by email
  await sendMail({
    email: existingUser.email,
    subject: 'Order Confirmation - Book Bazaar',
    mailGenContent: orderConfirmationMailContentGenerator(
      existingUser.fullname,
      existingBook.title
    ),
  });

  // success status to user
  return res.status(201).json(new APIResponse(201, 'Order created successfully'));
});

// @controller GET /
export const getAllOrders = asyncHandler(async (req, res) => {
  // get all orders for the user
  const allOrders = await Order.find({ userId: req.user.id })
    .populate('bookId', '_id title coverImg price')
    .select('-userId -updatedAt -__v');

  // paginate orders
  const paginatedOrders = paginateResources(allOrders, 10);

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'All Orders fetched successfully', paginatedOrders));
});

// @controller GET /:orderId
export const getOrderDetailsById = asyncHandler(async (req, res) => {
  // get order details by it's id
  const existingOrder = await Order.findOne({ _id: req.params.orderId, userId: req.user.id })
    .populate('bookId', '_id title coverImg price')
    .populate('userId', '_id fullname email')
    .select('-updatedAt -__v');

  // check if order exists
  if (!existingOrder) throw new APIError(404, 'Get Order Error', 'Order not found');

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'Order details fetched successfully', existingOrder));
});
