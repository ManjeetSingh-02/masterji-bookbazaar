// import local modules
import { isLoggedIn, validateAPIKey, validateSchema } from '../../../utils/route-protector.js';
import { createPayment, verifyPayment } from './payments.controllers.js';
import { createPaymentSchema, verifyPaymentSchema } from './payments.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route POST /create
router.post(
  '/create',
  isLoggedIn,
  validateAPIKey,
  validateSchema(createPaymentSchema),
  createPayment
);

// @route POST /verify
router.post(
  '/verify',
  isLoggedIn,
  validateAPIKey,
  validateSchema(verifyPaymentSchema),
  verifyPayment
);

// export router
export default router;
