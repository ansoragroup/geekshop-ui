/**
 * Shared types for page-level mock data.
 *
 * Component-owned types (Address, PaymentMethod, PaymentType) are re-exported
 * from the component barrel so pages can import everything from one place.
 */

// Re-export component-owned types
export type { Address } from '../../components';
export type { PaymentMethod, PaymentType } from '../../components';

/* ------------------------------------------------------------------ */
/*  Product                                                           */
/* ------------------------------------------------------------------ */

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  installmentPrice?: number;
  inStock: boolean;
  stock?: number;
}

/* ------------------------------------------------------------------ */
/*  Orders                                                            */
/* ------------------------------------------------------------------ */

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipping'
  | 'delivered'
  | 'review'
  | 'return'
  | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  date: string;
  trackingNumber?: string;
}

/* ------------------------------------------------------------------ */
/*  Cart                                                              */
/* ------------------------------------------------------------------ */

export interface CartItemData {
  id: number;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  selected: boolean;
  image: string;
}

/* ------------------------------------------------------------------ */
/*  User                                                              */
/* ------------------------------------------------------------------ */

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  birthDate?: string;
  gender?: 'male' | 'female';
  avatar?: string;
}

/* ------------------------------------------------------------------ */
/*  Categories                                                        */
/* ------------------------------------------------------------------ */

export interface Category {
  id: number;
  name: string;
  icon: string;
  productCount: number;
}

/* ------------------------------------------------------------------ */
/*  Reviews                                                           */
/* ------------------------------------------------------------------ */

export interface Review {
  id: string;
  userName: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  variant?: string;
  images?: string[];
  likes?: number;
}

/* ------------------------------------------------------------------ */
/*  Notifications                                                     */
/* ------------------------------------------------------------------ */

export interface Notification {
  id: string;
  type: 'order' | 'promo' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  avatarName: string;
  badgeColor?: 'primary' | 'success' | 'error' | 'warning' | 'info';
}

/* ------------------------------------------------------------------ */
/*  Coupons                                                           */
/* ------------------------------------------------------------------ */

export interface Coupon {
  id: number;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minAmount: number;
  expiryDate: string;
  used: boolean;
}

/* ------------------------------------------------------------------ */
/*  Delivery tracking                                                 */
/* ------------------------------------------------------------------ */

export interface DeliveryStep {
  label: string;
  date?: string;
  completed: boolean;
  active: boolean;
}
