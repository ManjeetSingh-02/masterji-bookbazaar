// import local modules
import { envConfig } from './env.js';

// function to generate the content of order confirmation email
export const orderConfirmationMailContentGenerator = (fullname, bookName) => {
  return {
    body: {
      name: fullname,
      intro: `Thank you for your order! We are excited to let you know that your order for "${bookName}" has been successfully placed.`,
      action: {
        instructions: 'View Order Details',
        button: {
          color: '#1a73e8',
          text: 'View Order',
          link: `${envConfig.ORIGIN_URL}/orders`,
        },
      },
      outro: 'If you have any questions, feel free to contact our support team.',
    },
  };
};
