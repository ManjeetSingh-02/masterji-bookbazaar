// import local modules
import { envConfig } from './env.js';
import { APIError } from '../api/error.api.js';
import { asyncHandler } from './async-handler.js';
import { User } from '../models/user.models.js';

// import external modules
import jwt from 'jsonwebtoken';

// function to check if user is logged in
export const isLoggedIn = asyncHandler(async (req, _, next) => {
  // get access token
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw new APIError(401, 'Security Error', 'Unauthorized');

  // decode access token
  const decodedToken = jwt.verify(accessToken, envConfig.ACCESS_TOKEN_SECRET);

  // check if user exists
  const loggedInUser = await User.findById(decodedToken?.id);
  if (!loggedInUser) throw new APIError(401, 'Security Error', 'Invalid Access Token');

  // set user in request object
  req.user = {
    id: loggedInUser._id,
    email: loggedInUser.email,
  };

  // forward request to next middleware
  next();
});

// function to check for any validation errors
export const validateSchema = zodSchema =>
  asyncHandler(async (req, _, next) => {
    // get validation result by parsing the request-body with the given zod-schema
    const validationResult = zodSchema.safeParse(req.body);

    // if validation fails, throw an error
    if (!validationResult.success)
      throw new APIError(
        400,
        'Validation Error',
        validationResult.error.issues.map(
          issue => `${issue.path.join(', ') || 'All fields'} ${issue.message}`
        )
      );

    // forward request to next middleware
    next();
  });

// function for checking if user has required role
export const hasRequiredRole = roles =>
  asyncHandler(async (req, _, next) => {
    // get user from db by it's id
    const existingMember = await User.findById(req.user.id).select('role');

    // check if user doesn't have any one of the required roles
    if (!roles.includes(existingMember.role))
      throw new APIError(
        403,
        'Security Error',
        'Access Denied for not having required role(s): ' + roles.join(', ')
      );

    // set user role in request object
    req.user.role = existingMember.role;

    // forward request to next middleware
    next();
  });
