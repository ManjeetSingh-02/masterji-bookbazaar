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
