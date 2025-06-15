// class to standardize API responses
export class APIResponse {
  constructor(statusCode, message = 'Success', data = []) {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
