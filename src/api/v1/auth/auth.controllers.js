// import local modules
import { envConfig } from '../../../utils/env.js';
import { asyncHandler } from '../../../utils/async-handler.js';
import { User } from '../../../models/user.models.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';

// import external modules
import crypto from 'crypto';
import ms from 'ms';

// @controller POST /register
export const registerUser = asyncHandler(async (req, res) => {
  // get data from body
  const { username, email, password, fullname } = req.body;

  // check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser)
    throw new APIError(
      409,
      'User Registration Error',
      'User already exists with this email or username'
    );

  // create new user in db
  const newUser = await User.create({
    username,
    email,
    fullname,
    password,
  });
  if (!newUser)
    throw new APIError(
      500,
      'User Registration Error',
      'Something went wrong while registering user'
    );

  // success status to user
  return res.status(201).json(new APIResponse(201, 'User registered successfully'));
});

// @controller POST /login
export const loginUser = asyncHandler(async (req, res) => {
  // get data
  const { email, password } = req.body;

  // check if user exists with email and password is correct
  const existingUser = await User.findOne({ email });
  if (!existingUser || !(await existingUser.isPasswordCorrect(password)))
    throw new APIError(401, 'Login Error', 'Invalid credentials');

  // generate access & refresh token
  const accessToken = existingUser.generateAccessToken();
  const refreshToken = existingUser.generateRefreshToken();

  // store refresh token in db
  existingUser.refreshToken = refreshToken;

  // update user in db
  await existingUser.save({ validateBeforeSave: false });

  // success status to user, save accessToken and refreshToken into cookies and send new tokens
  return res
    .status(200)
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: envConfig.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: ms(envConfig.ACCESS_TOKEN_EXPIRY),
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: envConfig.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: ms(envConfig.REFRESH_TOKEN_EXPIRY),
    })
    .json(
      new APIResponse(200, 'Login Successful', {
        accessToken,
        refreshToken,
      })
    );
});

// @controller PATCH /api-key
export const generateNewAPIKey = asyncHandler(async (req, res) => {
  // get user from db by it's id
  const existingUser = await User.findById(req.user.id).select('apikey');

  // generate new APIKey
  existingUser.apikey = crypto.randomBytes(32).toString('hex');

  // update user in db
  await existingUser.save({ validateBeforeSave: false });

  // success status to user
  return res.status(200).json(
    new APIResponse(200, 'User profile fetched successfully', {
      newAPIKey: existingUser.apikey,
    })
  );
});

// @controller GET /me
export const getLoggedInUserProfile = asyncHandler(async (req, res) => {
  // get user from db by it's id
  const existingUser = await User.findById(req.user.id).select(
    '-password -refreshToken -updatedAt -__v'
  );

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'User profile fetched successfully', existingUser));
});
