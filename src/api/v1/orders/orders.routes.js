// import local modules
import { isLoggedIn, validateAPIKey, validateSchema } from '../../../utils/route-protector.js';
import { createOrder, getAllOrders, getOrderDetailsById } from './orders.controllers.js';
import { createOrderSchema } from './orders.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route POST /
router.post('/', isLoggedIn, validateAPIKey, validateSchema(createOrderSchema), createOrder);

// @route GET /
router.get('/', isLoggedIn, validateAPIKey, getAllOrders);

// @route GET /:orderId
router.get('/:orderId', isLoggedIn, validateAPIKey, getOrderDetailsById);

// export router
export default router;
