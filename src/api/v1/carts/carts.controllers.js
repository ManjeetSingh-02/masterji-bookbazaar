// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';
import { Cart } from '../../../models/cart.models.js';
import { Book } from '../../../models/book.models.js';

// @controller POST /
export const createCart = asyncHandler(async (req, res) => {
  // check if cart already exists for the user
  const existingCart = await Cart.findOne({ userId: req.user.id });
  if (existingCart)
    throw new APIError(400, 'Create Cart Error', 'Cart already exists for this user');

  // create a new cart
  const newCart = await Cart.create({ userId: req.user.id });
  if (!newCart)
    throw new APIError(500, 'Create Cart Error', 'Something went wrong while creating the cart');

  // success status to user
  return res.status(201).json(
    new APIResponse(201, 'Cart created successfully', {
      _id: newCart._id,
      items: newCart.items,
      totalQuantity: newCart.totalQuantity,
      totalPrice: newCart.totalPrice,
    })
  );
});

// @controller GET /
export const getCart = asyncHandler(async (req, res) => {
  // get cart by userId
  const existingCart = await Cart.findOne({ userId: req.user.id }).select(
    '_id items totalQuantity totalPrice'
  );
  if (!existingCart) throw new APIError(404, 'Get Cart Error', 'Cart Not Found');

  // success status to user
  return res.status(200).json(
    new APIResponse(200, 'Cart retrieved successfully', {
      _id: existingCart._id,
      items: existingCart.items,
      totalQuantity: existingCart.totalQuantity,
      totalPrice: existingCart.totalPrice,
    })
  );
});

// @controller PUT /add
export const addItemToCart = asyncHandler(async (req, res) => {
  // get data from request body
  const { bookId } = req.body;

  // check if book exists
  const existingBook = await Book.findById(bookId);
  if (!existingBook) throw new APIError(404, 'Add Item Error', 'Book Not Found');

  // check if cart exists for the user
  const existingCart = await Cart.findOne({ userId: req.user.id }).select(
    '_id items totalQuantity totalPrice'
  );
  if (!existingCart) throw new APIError(404, 'Add Item Error', 'Cart Not Found');

  // update cart with new items
  existingCart.items.push({
    bookId: existingBook._id,
    bookTitle: existingBook.title,
    price: existingBook.price,
    quantity: 1,
  });

  // update total quantity
  existingCart.totalQuantity += 1;

  // update total price
  existingCart.totalPrice += existingBook.price;

  // save updated cart
  await existingCart.save();

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'Item added to cart successfully', existingCart));
});

// @controller PUT /remove
export const removeItemFromCart = asyncHandler(async (req, res) => {
  // get data from request body
  const { bookId } = req.body;

  // check if cart exists for the user
  const existingCart = await Cart.findOne({ userId: req.user.id }).select(
    '_id items totalQuantity totalPrice'
  );
  if (!existingCart) throw new APIError(404, 'Add Item Error', 'Cart Not Found');

  // check if book exists in the cart
  const itemIndex = existingCart.items.findIndex(item => item.bookId.toString() === bookId);
  if (itemIndex === -1) throw new APIError(404, 'Remove Item Error', 'Book not found in cart');

  // get the book price
  const bookPrice = existingCart.items[itemIndex].price;

  // remove the item from the cart
  existingCart.items.splice(itemIndex, 1);

  // update total quantity
  existingCart.totalQuantity -= 1;

  // update total price
  existingCart.totalPrice -= bookPrice;

  // save updated cart
  await existingCart.save();

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'Item removed from cart successfully', existingCart));
});
