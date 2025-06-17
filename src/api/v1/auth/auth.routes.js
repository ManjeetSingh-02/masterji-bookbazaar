// import local modules
import { isLoggedIn, validateSchema } from '../../../utils/route-protector.js';
import {
  generateNewAPIKey,
  getLoggedInUserProfile,
  loginUser,
  registerUser,
} from './auth.controllers.js';
import { apiKeyGenerationSchema, loginUserSchema, registerUserSchema } from './auth.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route POST /register
router.post('/register', validateSchema(registerUserSchema), registerUser);

// @route POST /login
router.post('/login', validateSchema(loginUserSchema), loginUser);

// @route PATCH /api-key
router.patch('/api-key', isLoggedIn, validateSchema(apiKeyGenerationSchema), generateNewAPIKey);

// @route GET /me
router.get('/me', isLoggedIn, getLoggedInUserProfile);

// export router
export default router;
