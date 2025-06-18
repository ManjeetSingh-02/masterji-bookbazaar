// all roles that can be assigned to a user
export const UserRolesEnum = {
  ADMIN: 'admin',
  USER: 'user',
};

// values array of the UserRolesEnum
export const AvailableUserRoles = Object.values(UserRolesEnum);

// all possible active days slots for API keys
export const ApiKeyActiveDaySlotsEnum = {
  1: () => Date.now() + 1 * 24 * 60 * 60 * 1000,
  7: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  30: () => Date.now() + 30 * 24 * 60 * 60 * 1000,
};

// keys array of the ApiKeyActiveDaySlotsEnum
export const ApiKeyActiveDaySlotsKeys = Object.keys(ApiKeyActiveDaySlotsEnum).map(k => Number(k));

// all possible order statuses
export const OrderStatusEnum = {
  ORDERED: 'Ordered',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

// values array of the OrderStatusEnum
export const AvailableOrderStatuses = Object.values(OrderStatusEnum);

// all possible payment statuses
export const PaymentStatusEnum = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
};

// values array of the PaymentStatusEnum
export const AvailablePaymentStatuses = Object.values(PaymentStatusEnum);

// all possible search types for books
export const SearchTypeEnum = {
  TITLE: 'title',
  AUTHOR: 'author',
  PUBLISHER: 'publisher',
  PUBLISHED_YEAR: 'publishedYear',
};

// values array of the SearchTypeEnum
export const AvailableSearchTypes = Object.values(SearchTypeEnum);

// all possible sorting orders
export const SortOrderEnum = {
  ASC: 'asc',
  DESC: 'desc',
};

// values array of the SortOrderEnum
export const AvailableSortOrders = Object.values(SortOrderEnum);

// all possible action types for books
export const SortTypeEnum = {
  TITLE: 'title',
  PUBLISHED_YEAR: 'publishedYear',
};

// values array of the SortTypeEnum
export const AvailableSortTypes = Object.values(SortTypeEnum);
