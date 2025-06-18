// import local modules
import { isLoggedIn, validateAPIKey, validateSchema } from '../../../utils/route-protector.js';
import { addItemToCart, createCart, getCart, removeItemFromCart } from './carts.controllers.js';
import { updateCartSchema } from './carts.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route POST /
router.post('/', isLoggedIn, validateAPIKey, createCart);

// @route GET /
router.get('/', isLoggedIn, validateAPIKey, getCart);

// @route PUT /add-item
router.put(
  '/add-item',
  isLoggedIn,
  validateAPIKey,
  validateSchema(updateCartSchema),
  addItemToCart
);

// @route PUT /remove-item
router.put(
  '/remove-item',
  isLoggedIn,
  validateAPIKey,
  validateSchema(updateCartSchema),
  removeItemFromCart
);

// export router
export default router;
