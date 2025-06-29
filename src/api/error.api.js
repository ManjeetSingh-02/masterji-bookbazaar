// class to standardize API Errors
export class APIError extends Error {
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    // if stack is present, use it, else capture the stack trace
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
