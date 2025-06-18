// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIError } from '../../error.api.js';
import { APIResponse } from '../../response.api.js';
import { razorpayInstance } from '../../../utils/razorpay.js';
import { Order } from '../../../models/order.models.js';
import { Payment } from '../../../models/payment.models.js';
import { envConfig } from '../../../utils/env.js';
import { PaymentStatusEnum } from '../../../utils/constants.js';
import { sendMail } from '../../../utils/send-mail.js';
import { orderConfirmationMailContentGenerator } from '../../../utils/genContent-mail.js';

// import external modules
import crypto from 'crypto';

// @controller POST /create
export const createPayment = asyncHandler(async (req, res) => {
  // get data from request body
  const { orderId } = req.body;

  // find order by id
  const existingOrder = await Order.findById(orderId);
  if (!existingOrder) throw new APIError(404, 'Create Payment Error', 'Order not found');

  // create a new razorpay order
  const razorpayOrder = await razorpayInstance.orders.create({
    amount: existingOrder.totalPrice * 100,
    currency: 'INR',
    receipt: `order_${existingOrder._id.toString()}`,
    notes: {
      orderId: existingOrder._id.toString(),
      userId: req.user.id.toString(),
    },
  });

  // create a new payment record in the database
  const newPayment = await Payment.create({
    razorpayOrderId: razorpayOrder.id,
    userId: req.user.id,
  });
  if (!newPayment)
    throw new APIError(500, 'Create Payment Error', 'Something went wrong while creating payment');

  // update the order with the razorpay order id
  existingOrder.paymentId = newPayment._id;
  await existingOrder.save();

  // success status to user
  return res.status(200).json(new APIResponse(200, 'Payment created successfully', newPayment));
});

// @controller POST /verify
export const verifyPayment = asyncHandler(async (req, res) => {
  // get data from request body
  const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  // find order by id
  const existingOrder = await Order.findById(orderId)
    .select('userId')
    .populate('userId', '_id fullname email');
  if (!existingOrder) throw new APIError(404, 'Verify Payment Error', 'Order not found');

  // find payment by razorpay order id
  const existingPayment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
  if (!existingPayment) throw new APIError(404, 'Verify Payment Error', 'Payment not found');

  // prepare HMAC hex
  const hmac_hex = orderId + '|' + razorpay_payment_id;

  // create a expected signature
  const expectedSignature = crypto
    .createHmac('sha256', envConfig.RAZORPAY_KEY_SECRET)
    .update(hmac_hex.toString())
    .digest('hex');

  // check if the recieved signature matches the expected signature
  if (expectedSignature !== razorpay_signature) {
    // update payment status to failed
    existingPayment.status = PaymentStatusEnum.FAILED;

    // save the payment with failed status
    await existingPayment.save();

    // throw an error
    throw new APIError(400, 'Verify Payment Error', 'Payment verification failed');
  }

  // update payment details
  existingPayment.razorpayPaymentId = razorpay_payment_id;
  existingPayment.razorpaySignature = razorpay_signature;
  existingPayment.status = PaymentStatusEnum.COMPLETED;

  // save the payment
  await existingPayment.save();

  // send order confirmation to user by email
  await sendMail({
    email: existingOrder.userId.email,
    subject: 'Order Confirmation - Book Bazaar',
    mailGenContent: orderConfirmationMailContentGenerator(
      existingOrder.userId.fullname,
      existingOrder._id.toString()
    ),
  });

  // success status to user
  return res
    .status(200)
    .json(new APIResponse(200, 'Payment verified successfully', existingPayment));
});
