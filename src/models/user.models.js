// import local modules
import { envConfig } from '../utils/env.js';
import { AvailableUserRoles, UserRolesEnum } from '../utils/constants.js';

// import external modules
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// schema for user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: 'String',
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
    },
    apikey: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10);
  next();
});

// method to check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// method to generateAccessToken
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, envConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: envConfig.ACCESS_TOKEN_EXPIRY,
  });
};

// method to generateRefreshToken
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, envConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: envConfig.REFRESH_TOKEN_EXPIRY,
  });
};

// export user model
export const User = mongoose.model('User', userSchema);
