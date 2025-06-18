// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';
import { Cart } from '../../../models/cart.models.js';

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

// @controller PUT /
export const updateCart = asyncHandler(async (req, res) => {});
