// import local modules
import { AvailableOrderStatuses, OrderStatusEnum } from '../utils/constants.js';

// import external modules
import mongoose from 'mongoose';

// schema for order
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [
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
      ],
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
      type: String,
      trim: true,
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
