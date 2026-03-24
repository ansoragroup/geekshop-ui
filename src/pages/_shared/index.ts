// Shell defaults
export {
  DefaultTopBar,
  DefaultMegaMenu,
  DefaultFooter,
  DefaultHeader,
  DefaultHeaderRich,
  DefaultHeaderWithMegaMenu,
  defaultMegaMenuCategories,
  defaultFooterColumns,
  defaultHeaderCategories,
  defaultPromoLinks,
  defaultMegaMenuNavItems,
} from './shellDefaults';
export type { DefaultHeaderRichProps } from './shellDefaults';

// Types
export type {
  Address,
  PaymentMethod,
  PaymentType,
  Product,
  OrderStatus,
  OrderItem,
  Order,
  CartItemData,
  UserProfile,
  Category,
  Review,
  Notification,
  Coupon,
  DeliveryStep,
} from './types';

// Mock data
export {
  mockProducts,
  mockAddresses,
  mockPaymentMethods,
  mockOrderItems,
  mockOrders,
  mockCartItems,
  mockUser,
  mockGuestUser,
  mockCategories,
  mockReviews,
  mockCoupons,
  mockNotifications,
  mockDeliverySteps,
  formatPrice,
  formatPriceUZS,
} from './mockData';
