// import local modules
import { AvailablePaymentStatuses, PaymentStatusEnum } from '../utils/constants.js';

// import external modules
import mongoose from 'mongoose';

// schema for payment
const paymentSchema = new mongoose.Schema(
  {
    razorpayOrderId: {
      type: String,
      trim: true,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      trim: true,
      default: '',
    },
    razorpaySignature: {
      type: String,
      trim: true,
      default: '',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: AvailablePaymentStatuses,
      default: PaymentStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

// export payment model
export const Payment = mongoose.model('Payment', paymentSchema);
