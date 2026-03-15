/**
 * Shared mock data for page-level Storybook compositions.
 *
 * All prices are in Uzbek so'm (UZS).
 * Product names and addresses use realistic Uzbek locale content.
 * Images use picsum.photos with deterministic seeds for consistency.
 */

import type {
  Address,
  PaymentMethod,
} from '../../components';

import type {
  Product,
  Order,
  OrderItem,
  CartItemData,
  UserProfile,
  Category,
  Review,
  Coupon,
  Notification,
  DeliveryStep,
} from './types';

/* ================================================================== */
/*  PRODUCTS                                                          */
/* ================================================================== */

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    image: 'https://picsum.photos/seed/product-gpu/400/400',
    price: 5_200_000,
    originalPrice: 6_500_000,
    rating: 4.6,
    reviewCount: 87,
    badge: 'hot',
    inStock: true,
    stock: 12,
  },
  {
    id: 2,
    name: 'AMD Ryzen 7 7800X3D Protsessor AM5',
    image: 'https://picsum.photos/seed/product-cpu/400/400',
    price: 4_100_000,
    rating: 4.8,
    reviewCount: 134,
    badge: 'top',
    inStock: true,
    stock: 23,
  },
  {
    id: 3,
    name: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
    image: 'https://picsum.photos/seed/product-ram/400/400',
    price: 2_200_000,
    originalPrice: 2_600_000,
    rating: 4.5,
    reviewCount: 62,
    badge: 'new',
    inStock: true,
    stock: 45,
  },
  {
    id: 4,
    name: 'Samsung 990 Pro NVMe 2TB SSD M.2',
    image: 'https://picsum.photos/seed/product-ssd/400/400',
    price: 2_800_000,
    originalPrice: 3_200_000,
    rating: 4.7,
    reviewCount: 98,
    inStock: true,
    stock: 30,
  },
  {
    id: 5,
    name: 'ASUS ROG Swift 27" 2K 165Hz Gaming Monitor',
    image: 'https://picsum.photos/seed/product-monitor/400/400',
    price: 4_800_000,
    originalPrice: 5_500_000,
    rating: 4.4,
    reviewCount: 45,
    badge: 'top',
    inStock: true,
    stock: 8,
  },
  {
    id: 6,
    name: 'Keychron Q1 Pro Mexanik Klaviatura RGB',
    image: 'https://picsum.photos/seed/product-keyboard/400/400',
    price: 1_850_000,
    rating: 4.3,
    reviewCount: 29,
    badge: 'new',
    inStock: true,
    stock: 15,
  },
  {
    id: 7,
    name: 'Logitech G Pro X Superlight 2 Simsiz Sichqoncha',
    image: 'https://picsum.photos/seed/product-mouse/400/400',
    price: 1_400_000,
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    stock: 50,
  },
  {
    id: 8,
    name: 'ASUS ROG Strix B650E-F Gaming Anaplata',
    image: 'https://picsum.photos/seed/product-mobo/400/400',
    price: 3_400_000,
    rating: 4.5,
    reviewCount: 38,
    inStock: true,
    stock: 11,
  },
  {
    id: 9,
    name: 'Noctua NH-D15 CPU Sovutgich Dual Tower',
    image: 'https://picsum.photos/seed/product-cooler/400/400',
    price: 1_200_000,
    originalPrice: 1_500_000,
    rating: 4.8,
    reviewCount: 73,
    badge: 'hot',
    inStock: true,
    stock: 6,
  },
  {
    id: 10,
    name: 'NZXT H7 Flow ATX Mid-Tower Korpus Oq',
    image: 'https://picsum.photos/seed/product-case/400/400',
    price: 1_600_000,
    rating: 4.2,
    reviewCount: 17,
    badge: 'new',
    inStock: true,
    stock: 20,
  },
  {
    id: 11,
    name: 'MSI GeForce RTX 4070 Super 12GB GDDR6X',
    image: 'https://picsum.photos/seed/product-gpu2/400/400',
    price: 8_900_000,
    originalPrice: 9_800_000,
    rating: 4.7,
    reviewCount: 56,
    badge: 'top',
    inStock: true,
    stock: 4,
  },
  {
    id: 12,
    name: 'Corsair RM850x 850W 80+ Gold Quvvat Bloki',
    image: 'https://picsum.photos/seed/product-psu/400/400',
    price: 1_800_000,
    rating: 4.6,
    reviewCount: 42,
    inStock: true,
    stock: 18,
  },
  {
    id: 13,
    name: 'NZXT Kraken X63 RGB 280mm AIO Sovutgich',
    image: 'https://picsum.photos/seed/product-aio/400/400',
    price: 1_900_000,
    rating: 4.4,
    reviewCount: 31,
    badge: 'new',
    inStock: true,
    stock: 9,
  },
  {
    id: 14,
    name: 'Lian Li O11 Dynamic EVO RGB Korpus',
    image: 'https://picsum.photos/seed/product-case2/400/400',
    price: 2_400_000,
    rating: 4.3,
    reviewCount: 22,
    inStock: false,
    stock: 0,
  },
  {
    id: 15,
    name: 'AMD Ryzen 9 7950X Protsessor 16 Yadro',
    image: 'https://picsum.photos/seed/product-cpu2/400/400',
    price: 5_600_000,
    originalPrice: 6_200_000,
    rating: 4.9,
    reviewCount: 89,
    badge: 'top',
    installmentPrice: 933_000,
    inStock: true,
    stock: 3,
  },
];

/* ================================================================== */
/*  ADDRESSES                                                         */
/* ================================================================== */

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: 'Amir Temur ko\'chasi, 15-uy, 42-xonadon',
    city: 'Toshkent',
    region: 'Toshkent shahri',
    postalCode: '100000',
    isDefault: true,
    label: 'Uy',
  },
  {
    id: 'addr-2',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: 'Mustaqillik ko\'chasi, 59-uy, 3-qavat',
    city: 'Toshkent',
    region: 'Chilonzor tumani',
    postalCode: '100115',
    isDefault: false,
    label: 'Ish',
  },
  {
    id: 'addr-3',
    name: 'Anvar Karimov',
    phone: '+998 71 234 56 78',
    street: 'Navoiy ko\'chasi, 28-uy',
    city: 'Toshkent',
    region: 'Yakkasaroy tumani',
    postalCode: '100028',
    isDefault: false,
    label: 'Ota-ona',
  },
];

/* ================================================================== */
/*  PAYMENT METHODS                                                   */
/* ================================================================== */

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'uzcard',
    label: 'UzCard',
    lastFour: '4523',
    expiryDate: '09/27',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'humo',
    label: 'Humo',
    lastFour: '8901',
    expiryDate: '03/28',
    isDefault: false,
  },
  {
    id: 'pm-3',
    type: 'payme',
    label: 'Payme',
    isDefault: false,
  },
  {
    id: 'pm-4',
    type: 'cash',
    label: 'Naqd pul',
    isDefault: false,
  },
];

/* ================================================================== */
/*  ORDERS                                                            */
/* ================================================================== */

const orderItem1: OrderItem = {
  id: '1',
  name: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
  image: 'https://picsum.photos/seed/order-gpu/160/160',
  price: 5_200_000,
  quantity: 1,
  variant: '8GB / Qora',
};

const orderItem2: OrderItem = {
  id: '2',
  name: 'AMD Ryzen 7 7800X3D Protsessor AM5',
  image: 'https://picsum.photos/seed/order-cpu/160/160',
  price: 4_100_000,
  quantity: 1,
  variant: '8 yadro / 16 ip',
};

const orderItem3: OrderItem = {
  id: '3',
  name: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
  image: 'https://picsum.photos/seed/order-ram/160/160',
  price: 2_200_000,
  quantity: 2,
  variant: '32GB / RGB',
};

const orderItem4: OrderItem = {
  id: '4',
  name: 'Samsung 990 Pro NVMe 2TB SSD',
  image: 'https://picsum.photos/seed/order-ssd/160/160',
  price: 2_800_000,
  quantity: 2,
  variant: '2TB / M.2',
};

const orderItem5: OrderItem = {
  id: '5',
  name: 'ASUS ROG Swift 27" 2K 165Hz Gaming Monitor',
  image: 'https://picsum.photos/seed/order-monitor/160/160',
  price: 4_800_000,
  quantity: 1,
  variant: '27 dyuym / 2K',
};

export const mockOrderItems: OrderItem[] = [
  orderItem1,
  orderItem2,
  orderItem3,
  orderItem4,
  orderItem5,
];

export const mockOrders: Order[] = [
  {
    id: 'GS-2026031401',
    status: 'shipping',
    items: [orderItem1],
    totalPrice: 5_200_000,
    date: '14 mart, 2026',
    trackingNumber: 'UZ1234567890',
  },
  {
    id: 'GS-2026030802',
    status: 'review',
    items: [orderItem2, orderItem3],
    totalPrice: 6_300_000,
    date: '8 mart, 2026',
  },
  {
    id: 'GS-2026022515',
    status: 'delivered',
    items: [orderItem4],
    totalPrice: 5_600_000,
    date: '25 fevral, 2026',
  },
  {
    id: 'GS-2026020103',
    status: 'pending',
    items: [orderItem5],
    totalPrice: 4_800_000,
    date: '1 fevral, 2026',
  },
  {
    id: 'GS-2026011210',
    status: 'cancelled',
    items: [orderItem1, orderItem2],
    totalPrice: 9_300_000,
    date: '12 yanvar, 2026',
  },
  {
    id: 'GS-2025122005',
    status: 'delivered',
    items: [orderItem3, orderItem4, orderItem5],
    totalPrice: 12_000_000,
    date: '20 dekabr, 2025',
  },
];

/* ================================================================== */
/*  CART                                                              */
/* ================================================================== */

export const mockCartItems: CartItemData[] = [
  {
    id: 1,
    name: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    variant: '8GB / Qora',
    price: 5_200_000,
    originalPrice: 6_500_000,
    quantity: 1,
    selected: true,
    image: 'https://picsum.photos/seed/cart-gpu/160/160',
  },
  {
    id: 2,
    name: 'AMD Ryzen 7 7800X3D Protsessor AM5',
    variant: '8 yadro / 16 ip',
    price: 4_100_000,
    quantity: 1,
    selected: true,
    image: 'https://picsum.photos/seed/cart-cpu/160/160',
  },
  {
    id: 3,
    name: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
    variant: '32GB / RGB',
    price: 2_200_000,
    quantity: 2,
    selected: false,
    image: 'https://picsum.photos/seed/cart-ram/160/160',
  },
  {
    id: 4,
    name: 'Samsung 990 Pro NVMe 2TB SSD',
    variant: '2TB / M.2',
    price: 2_800_000,
    originalPrice: 3_200_000,
    quantity: 1,
    selected: true,
    image: 'https://picsum.photos/seed/cart-ssd/160/160',
  },
];

/* ================================================================== */
/*  USER PROFILE                                                      */
/* ================================================================== */

export const mockUser: UserProfile = {
  firstName: 'Jasur',
  lastName: 'Karimov',
  phone: '+998 90 123 45 67',
  email: 'jasur@example.com',
  birthDate: '15.03.1995',
  gender: 'male',
  avatar: 'https://picsum.photos/seed/profile-avatar/200/200',
};

export const mockGuestUser: UserProfile = {
  firstName: 'Mehmon',
  lastName: '',
  phone: '',
};

/* ================================================================== */
/*  CATEGORIES                                                        */
/* ================================================================== */

export const mockCategories: Category[] = [
  { id: 1, name: 'Elektronika', icon: 'electronics', productCount: 1240 },
  { id: 2, name: 'Telefonlar', icon: 'phone', productCount: 856 },
  { id: 3, name: 'Kompyuterlar', icon: 'computer', productCount: 623 },
  { id: 4, name: 'Noutbuklar', icon: 'laptop', productCount: 418 },
  { id: 5, name: 'Videokartalar', icon: 'gpu', productCount: 195 },
  { id: 6, name: 'Protsessorlar', icon: 'cpu', productCount: 167 },
  { id: 7, name: 'Monitorlar', icon: 'monitor', productCount: 312 },
  { id: 8, name: 'Aksessuarlar', icon: 'accessories', productCount: 1580 },
  { id: 9, name: 'Uy-ro\'zg\'or', icon: 'home', productCount: 920 },
  { id: 10, name: 'Sport', icon: 'sport', productCount: 445 },
];

/* ================================================================== */
/*  REVIEWS                                                           */
/* ================================================================== */

export const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Dilshod Rahimov',
    avatar: 'https://picsum.photos/seed/user-1/64/64',
    rating: 5,
    text: 'Ajoyib videokarta! O\'yinlarda juda yaxshi ishlaydi. RTX 4060 1080p da barcha o\'yinlarni ultra sozlamalarda 60+ FPS da chiqaradi. Harorat ham juda past, 65 darajadan oshmadi.',
    date: '14 mart, 2026',
    variant: '8GB / Qora',
    images: [
      'https://picsum.photos/seed/review-img-1/200/200',
      'https://picsum.photos/seed/review-img-2/200/200',
    ],
    likes: 24,
  },
  {
    id: '2',
    userName: 'Nodira Karimova',
    rating: 4,
    text: 'Yaxshi mahsulot, lekin qutisi biroz ezilgan holda keldi. Karta o\'zi a\'lo ishlaydi. Yetkazib berish 2 kun oldi, Toshkent ichida tez yetkazishdi.',
    date: '12 mart, 2026',
    variant: '8GB / Qora',
    likes: 8,
  },
  {
    id: '3',
    userName: 'Bekzod Tursunov',
    avatar: 'https://picsum.photos/seed/user-3/64/64',
    rating: 5,
    text: 'Narxiga ko\'ra eng yaxshi tanlov. Oldingi GTX 1660 dan katta farq bor. DLSS 3 texnologiyasi juda zo\'r ishlaydi.',
    date: '10 mart, 2026',
    variant: '8GB / Qora',
    images: [
      'https://picsum.photos/seed/review-img-3/200/200',
      'https://picsum.photos/seed/review-img-4/200/200',
      'https://picsum.photos/seed/review-img-5/200/200',
    ],
    likes: 31,
  },
  {
    id: '4',
    userName: 'Shahlo Abdullayeva',
    rating: 3,
    text: 'O\'rtacha. 4K uchun yetarli emas, lekin 1080p da yaxshi. Ovozi biroz baland.',
    date: '8 mart, 2026',
    likes: 3,
  },
  {
    id: '5',
    userName: 'Jamshid Aliyev',
    avatar: 'https://picsum.photos/seed/user-5/64/64',
    rating: 5,
    text: 'Rasmiy do\'kondan sotib oldim, kafolat bilan keldi. 3 oydan beri ishlataman, hech qanday muammo yo\'q. Tavsiya qilaman!',
    date: '28 fevral, 2026',
    variant: '8GB / Qora',
    images: ['https://picsum.photos/seed/review-img-6/200/200'],
    likes: 15,
  },
  {
    id: '6',
    userName: 'Aziza Rustamova',
    avatar: 'https://picsum.photos/seed/user-6/64/64',
    rating: 2,
    text: 'Yetkazib berish 5 kun kechikdi. Mahsulotning o\'zi yaxshi, lekin xizmat ko\'rsatish sifati pastroq.',
    date: '20 fevral, 2026',
    likes: 5,
  },
];

/* ================================================================== */
/*  COUPONS                                                           */
/* ================================================================== */

export const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: 'GEEK2026',
    discount: 10,
    discountType: 'percentage',
    minAmount: 5_000_000,
    expiryDate: '2026-04-01',
    used: false,
  },
  {
    id: 2,
    code: 'YANGI500',
    discount: 500_000,
    discountType: 'fixed',
    minAmount: 3_000_000,
    expiryDate: '2026-03-31',
    used: false,
  },
  {
    id: 3,
    code: 'BAHOR15',
    discount: 15,
    discountType: 'percentage',
    minAmount: 10_000_000,
    expiryDate: '2026-03-20',
    used: false,
  },
  {
    id: 4,
    code: 'WINTER10',
    discount: 10,
    discountType: 'percentage',
    minAmount: 2_000_000,
    expiryDate: '2026-01-31',
    used: true,
  },
];

/* ================================================================== */
/*  NOTIFICATIONS                                                     */
/* ================================================================== */

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Buyurtma yetkazildi',
    message: 'GS-2026031401 raqamli buyurtmangiz yetkazildi. Mahsulotni qabul qilib, baholang!',
    timestamp: '5 daqiqa oldin',
    read: false,
    avatarName: 'Buyurtma',
    badgeColor: 'success',
  },
  {
    id: '2',
    type: 'promo',
    title: 'Mega chegirma! -30% barcha GPU larga',
    message: 'Faqat bugun! RTX 4060, 4070, 4080 videokartalariga katta chegirma. Shoshiling!',
    timestamp: '1 soat oldin',
    read: false,
    avatar: 'https://picsum.photos/seed/notif-promo1/64/64',
    avatarName: 'GeekShop',
    badgeColor: 'primary',
  },
  {
    id: '3',
    type: 'order',
    title: 'Buyurtma yuborildi',
    message: 'GS-2026031302 raqamli buyurtmangiz yuborildi. Kuzatish raqami: UZ1234567890',
    timestamp: '3 soat oldin',
    read: true,
    avatarName: 'Yetkazish',
    badgeColor: 'info',
  },
  {
    id: '4',
    type: 'system',
    title: 'Xavfsizlik xabarnomasi',
    message: 'Hisobingizga yangi qurilmadan kirish aniqlandi. Agar bu siz bo\'lmasangiz, parolingizni o\'zgartiring.',
    timestamp: '5 soat oldin',
    read: true,
    avatarName: 'Xavfsizlik',
    badgeColor: 'warning',
  },
  {
    id: '5',
    type: 'promo',
    title: 'Kupon sovg\'a! GEEK2026',
    message: 'Sizga 500 000 so\'mlik kupon berildi. 31 mart kunigacha amal qiladi. 5 000 000 so\'mdan ortiq buyurtmalarda foydalaning.',
    timestamp: '1 kun oldin',
    read: true,
    avatar: 'https://picsum.photos/seed/notif-promo2/64/64',
    avatarName: 'Kupon',
    badgeColor: 'primary',
  },
  {
    id: '6',
    type: 'order',
    title: 'To\'lov muvaffaqiyatli',
    message: 'GS-2026031201 raqamli buyurtmangiz uchun 5 200 000 so\'m to\'landi. UzCard **** 4523',
    timestamp: '2 kun oldin',
    read: true,
    avatarName: 'To\'lov',
    badgeColor: 'success',
  },
];

/* ================================================================== */
/*  DELIVERY STEPS (for order detail tracking)                        */
/* ================================================================== */

export const mockDeliverySteps: DeliveryStep[] = [
  { label: 'To\'landi', date: '12 mart', completed: true, active: false },
  { label: 'Yuborildi', date: '13 mart', completed: true, active: false },
  { label: 'Yetkazilmoqda', date: '14 mart', completed: false, active: true },
  { label: 'Yetkazildi', completed: false, active: false },
];

/* ================================================================== */
/*  HELPER: formatPrice                                               */
/* ================================================================== */

/**
 * Formats a numeric price value into a display string with space-separated
 * thousands. Example: 5200000 → "5 200 000"
 */
export function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU').replace(/,/g, ' ');
}
