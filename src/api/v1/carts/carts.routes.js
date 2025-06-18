// import local modules
import { isLoggedIn, validateAPIKey, validateSchema } from '../../../utils/route-protector.js';
import { createCart, updateCart, getCart } from './carts.controllers.js';
import { createCartSchema, updateCartSchema } from './carts.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route POST /
router.post('/', isLoggedIn, validateAPIKey, validateSchema(createCartSchema), createCart);

// @route GET /
router.get('/', isLoggedIn, validateAPIKey, getCart);

// @route PUT /
router.put('/', isLoggedIn, validateAPIKey, validateSchema(updateCartSchema), updateCart);

// export router
export default router;
