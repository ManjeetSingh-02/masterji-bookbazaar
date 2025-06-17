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
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    pricePerQuantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: AvailableOrderStatuses,
      default: OrderStatusEnum.ORDERED,
    },
    estimatedDeliveryDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

// export order model
export const Order = mongoose.model('Order', orderSchema);
