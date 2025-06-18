// import local modules
import { AvailableOrderStatuses, OrderStatusEnum } from '../utils/constants.js';

// import external modules
import mongoose from 'mongoose';

// schema for shipping address
const shippingAddressSchema = new mongoose.Schema(
  {
    houseNo: {
      type: String,
      trim: true,
      required: true,
    },
    street: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    pincode: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: false,
    _id: false,
  }
);

// schema for item
const itemSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    bookTitle: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

// schema for order
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [itemSchema],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: AvailableOrderStatuses,
      default: OrderStatusEnum.ORDERED,
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      default: null,
    },
  },
  { timestamps: true }
);

// export order model
export const Order = mongoose.model('Order', orderSchema);
