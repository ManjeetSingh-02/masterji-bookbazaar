// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';
import { Book } from '../../../models/book.models.js';
import { paginateResources } from '../../../utils/paginate.js';
import { Order } from '../../../models/order.models.js';

// @controller POST /
export const createOrder = asyncHandler(async (req, res) => {
  // get data from request body
  const { items, shippingAddress } = req.body;

  // array to store validated items
  const validatedItems = [];

  try {
    // validate each item and calculate price
    for (const item of items) {
      // check if book exists
      const existingBook = await Book.findById(item.bookId);
      if (!existingBook)
        throw new APIError(404, 'Create Order Error', `Book with ID ${item.bookId} not found`);

      // push validated item to the array
      validatedItems.push({
        bookId: existingBook._id,
        bookTitle: existingBook.title,
        quantity: item.quantity,
        price: existingBook.price * item.quantity,
      });
    }
  } catch (error) {
    throw error;
  }

  // create new order
  const newOrder = await Order.create({
    items: validatedItems,
    shippingAddress,
    userId: req.user.id,
    totalPrice: validatedItems.reduce((total, item) => total + item.price, 0),
  });
  if (!newOrder)
    throw new APIError(500, 'Create Order Error', 'Something went wrong while creating the order');

  // success status to user
  return res.status(201).json(
    new APIResponse(201, 'Order created successfully', {
      _id: newOrder._id,
      totalPrice: newOrder.totalPrice,
      userId: newOrder.userId,
    })
  );
});

// @controller GET /
export const getAllOrders = asyncHandler(async (req, res) => {
  // get all orders for the user
  const allOrders = await Order.find({ userId: req.user.id }).select('-userId -updatedAt -__v');

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
    .populate('userId', '_id fullname email')
    .select('-updatedAt -__v');

  // check if order exists
  if (!existingOrder) throw new APIError(404, 'Get Order Error', 'Order not found');

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'Order details fetched successfully', existingOrder));
});
