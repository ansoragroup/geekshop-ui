import type { TranslationDictionary } from '../types';

export const uz: TranslationDictionary = {
  // Common actions
  'common.close': 'Yopish',
  'common.cancel': 'Bekor qilish',
  'common.delete': "O'chirish",
  'common.edit': 'Tahrirlash',
  'common.save': 'Saqlash',
  'common.back': 'Orqaga',
  'common.viewAll': 'Barchasi',
  'common.apply': "Ko'rsatish",
  'common.reset': 'Tozalash',
  'common.select': 'Tanlash',
  'common.deselect': 'Bekor qilish',
  'common.default': 'Asosiy',
  'common.retry': 'Qayta urinish',
  'common.loading': 'Yuklanmoqda...',
  'common.noMoreItems': "Boshqa ma'lumot yo'q",
  'common.loadFailed': "Yuklab bo'lmadi",
  'common.share': 'Ulashish',

  // Commerce
  'commerce.addToCart': 'Savatga',
  'commerce.addToCartFull': "Savatga qo'shish",
  'commerce.buyNow': 'Sotib olish',
  'commerce.cart': 'Savat',
  'commerce.contact': 'Aloqa',
  'commerce.favorite': 'Sevimli',
  'commerce.addToFavorites': "Sevimlilarga qo'shish",
  'commerce.removeFromFavorites': "Sevimlilardan o'chirish",
  'commerce.quantity': 'Miqdor',
  'commerce.decrease': 'Kamaytirish',
  'commerce.increase': "Ko'paytirish",
  'commerce.selected': 'Tanlangan: {count} ta',
  'commerce.inStock': '{count} ta mavjud',
  'commerce.cash': 'Naqd',

  // Product
  'product.variant': 'Variant',
  'product.listView': "Ro'yxat",
  'product.gridView': 'Rasmli',
  'product.installment': '{price}/oy',
  'product.image': 'Mahsulot {index}',
  'product.cameraSearch': 'Kamera bilan qidirish',
  'product.nightMode': 'Tungi rejim',
  'product.savings': 'Tejash: {amount}',
  'product.soldPercent': '{percent}% sotildi',

  // Order
  'order.id': 'Buyurtma #{id}',
  'order.total': 'Jami ({count} ta mahsulot):',
  'order.statusPending': "To'lov kutilmoqda",
  'order.statusNotShipped': 'Yuborilmagan',
  'order.statusShipping': 'Yetkazilmoqda',
  'order.statusReview': 'Baholash',
  'order.statusReturn': 'Qaytarish',

  // Filter
  'filter.title': 'Filtr',
  'filter.minPrice': 'Minimal',
  'filter.maxPrice': 'Maksimal',

  // Coupon
  'coupon.code': 'Kod:',
  'coupon.expiry': 'Muddati: {date}',
  'coupon.use': 'Foydalanish',
  'coupon.minAmount': '{amount} dan',

  // Content
  'content.count': '{count} ta',

  // Feedback
  'empty.default': "Ma'lumot topilmadi",

  // Form
  'input.clear': 'Tozalash',

  // Search
  'search.placeholder': 'Mahsulot qidirish...',
  'search.location': 'Joylashuv: {location}',

  // Page titles
  'page.home': 'Bosh sahifa',
  'page.cart': 'Savat',
  'page.checkout': 'Buyurtma berish',
  'page.orders': 'Buyurtmalar',
  'page.orderDetail': 'Buyurtma tafsiloti',
  'page.profile': 'Profil',
  'page.editProfile': 'Profilni tahrirlash',
  'page.settings': 'Sozlamalar',
  'page.notifications': 'Xabarnomalar',
  'page.wishlist': 'Sevimlilar',
  'page.reviews': 'Sharhlar',
  'page.writeReview': 'Sharh yozish',
  'page.search': 'Qidiruv',
  'page.categories': 'Kategoriyalar',
  'page.addresses': 'Manzillar',
  'page.addAddress': 'Yangi manzil',
  'page.editAddress': 'Manzilni tahrirlash',
  'page.paymentMethods': "To'lov usullari",
  'page.onboarding': 'Xush kelibsiz',
  'page.orderConfirmation': 'Buyurtma tasdiqlandi',
  'page.preOrder': 'Oldindan buyurtma',

  // Settings
  'settings.notifications': 'Bildirishnomalar',
  'settings.orderUpdates': 'Buyurtma yangiliklari',
  'settings.promoAlerts': 'Aksiya va chegirmalar',
  'settings.emailNotifications': 'Email xabarnomalar',
  'settings.pushNotifications': 'Push bildirishnomalar',
  'settings.language': 'Til',
  'settings.currency': 'Valyuta',
  'settings.account': 'Hisob',
  'settings.changePassword': "Parolni o'zgartirish",
  'settings.deleteAccount': "Hisobni o'chirish",
  'settings.deleteAccountConfirm': "Hisobni o'chirishni xohlaysizmi?",
  'settings.deleteAccountWarning':
    "Barcha ma'lumotlaringiz o'chiriladi. Bu amalni qaytarib bo'lmaydi.",
  'settings.about': 'Haqida',
  'settings.version': 'Versiya',
  'settings.terms': 'Foydalanish shartlari',
  'settings.privacy': 'Maxfiylik siyosati',
  'settings.logout': 'Chiqish',

  // Profile
  'profile.firstName': 'Ism',
  'profile.lastName': 'Familiya',
  'profile.phone': 'Telefon raqam',
  'profile.email': 'Email',
  'profile.birthDate': "Tug'ilgan sana",
  'profile.gender': 'Jinsi',
  'profile.male': 'Erkak',
  'profile.female': 'Ayol',
  'profile.changePhoto': "Rasmni o'zgartirish",
  'profile.takePhoto': 'Kameradan suratga olish',
  'profile.chooseFromGallery': 'Galereyadan tanlash',
  'profile.removePhoto': "Rasmni o'chirish",
  'profile.saved': "Ma'lumotlar saqlandi",
  'profile.myOrders': 'Mening buyurtmalarim',
  'profile.favorites': 'Sevimlilar',
  'profile.myAddresses': 'Manzillarim',
  'profile.paymentMethods': "To'lov usullari",
  'profile.general': 'Umumiy',
  'profile.help': 'Yordam',
  'profile.loginPrompt': 'Tizimga kiring',

  // Address form
  'address.name': 'Qabul qiluvchi ismi',
  'address.phone': 'Telefon raqam',
  'address.street': "Ko'cha, uy",
  'address.apartment': 'Xonadon',
  'address.city': 'Shahar',
  'address.region': 'Viloyat',
  'address.postalCode': 'Pochta indeksi',
  'address.label': 'Manzil turi',
  'address.labelHome': 'Uy',
  'address.labelWork': 'Ish',
  'address.labelOther': 'Boshqa',
  'address.setDefault': 'Asosiy qilib belgilash',
  'address.add': "Yangi manzil qo'shish",
  'address.deleteConfirm': "Manzilni o'chirishni xohlaysizmi?",
  'address.deleteWarning': "Bu amalni qaytarib bo'lmaydi.",
  'address.deleted': "Manzil o'chirildi",
  'address.saved': 'Manzil saqlandi',
  'address.empty': "Hali manzil qo'shilmagan",

  // Cart page
  'cart.empty': "Savatingiz bo'sh",
  'cart.selectAll': 'Barchasini tanlash',
  'cart.total': 'Jami',
  'cart.items': 'Mahsulotlar',
  'cart.delivery': 'Yetkazib berish',
  'cart.free': 'Bepul',
  'cart.discount': 'Chegirma',
  'cart.couponDiscount': 'Kupon chegirmasi',
  'cart.placeOrder': 'Buyurtma berish',

  // Checkout
  'checkout.deliveryAddress': 'Yetkazib berish manzili',
  'checkout.paymentMethod': "To'lov usuli",
  'checkout.orderItems': 'Buyurtma mahsulotlari',
  'checkout.couponCode': 'Kupon kodi',
  'checkout.enterCoupon': 'Kupon kodini kiriting',
  'checkout.applyCoupon': "Qo'llash",
  'checkout.priceDetails': 'Narx tafsiloti',
  'checkout.subtotal': 'Mahsulotlar narxi',

  // Order (page-level)
  'order.track': 'Kuzatish',
  'order.details': 'Batafsil',
  'order.pay': "To'lash",
  'order.reorder': 'Qayta buyurtma',
  'order.cancel': 'Bekor qilish',
  'order.empty': "Buyurtmalar yo'q",
  'order.confirmed': 'Buyurtma tasdiqlandi!',
  'order.thankYou': 'Xaridingiz uchun rahmat!',
  'order.estimatedDelivery': 'Taxminiy yetkazib berish',
  'order.continueShopping': 'Xaridni davom ettirish',
  'order.viewOrder': "Buyurtmani ko'rish",
  'order.orderNumber': 'Buyurtma raqami',
  'order.days': '{count} kun',

  // Product (page-level)
  'product.description': 'Tavsif',
  'product.about': 'Mahsulot haqida',
  'product.specifications': 'Xususiyatlar',
  'product.reviews': 'Sharhlar',
  'product.inStock': 'Mavjud',
  'product.outOfStock': 'Mavjud emas',
  'product.warranty': 'Rasmiy kafolat',
  'product.qualityChecked': 'Sifat tekshirilgan',
  'product.freeReturn': 'Bepul qaytarish',
  'product.official': 'Rasmiy',
  'product.selectVariant': 'Variantni tanlang',
  'product.preOrder': 'Oldindan buyurtma',
  'product.preOrderNow': 'Oldindan buyurtma berish',
  'product.notifyWhenAvailable': "Mavjud bo'lganda xabar bering",
  'product.estimatedAvailability': 'Taxminiy muddat',
  'product.preOrderDeposit': "Oldindan to'lov",
  'product.preOrderTerms': 'Oldindan buyurtma shartlari:',
  'product.preOrderTermNotify': "Mahsulot tayyor bo'lganda xabar beriladi",
  'product.preOrderTermPayLater': "Qolgan to'lov yetkazib berishda",
  'product.preOrderTermCancel': 'Bekor qilish mumkin',
  'product.addedToCart': "Savatga qo'shildi!",
  'product.selectedVariant': 'Tanlangan: {variant}',
  'product.chooseVariant': 'Tanlang',

  // Review
  'review.rateProduct': 'Mahsulotni baholang',
  'review.yourReview': 'Sharhingiz',
  'review.reviewPlaceholder': 'Mahsulot haqida fikringizni yozing...',
  'review.addPhotos': "Rasm qo'shish (ixtiyoriy)",
  'review.maxPhotos': "Eng ko'pi {max} ta rasm",
  'review.submit': 'Sharh yuborish',
  'review.submitted': 'Sharhingiz yuborildi!',
  'review.allReviews': 'Barcha sharhlar',
  'review.ratings': '{count} ta baho',
  'review.allShown': "Barcha sharhlar ko'rsatildi",

  // Wishlist
  'wishlist.empty': "Sevimlilar bo'sh",
  'wishlist.noResults': 'Natija topilmadi',

  // Search (page-level)
  'search.history': 'Qidiruv tarixi',
  'search.results': '{count} ta natija',
  'search.noResults': 'Natija topilmadi',
  'search.noResultsDescription':
    '"{query}" bo\'yicha hech narsa topilmadi. Boshqa kalit so\'zlarni sinab ko\'ring.',
  'search.allLoaded': 'Barchasi yuklandi',

  // Payment methods (page-level)
  'payment.cards': 'Kartalar',
  'payment.wallets': 'Elektron hamyonlar',
  'payment.cashSection': 'Naqd',
  'payment.cashLabel': "Naqd to'lov",
  'payment.empty': "To'lov usullari topilmadi",
  'payment.emptyDescription': "Hali hech qanday to'lov usuli qo'shilmagan.",
  'payment.deleteConfirm': "To'lov usulini o'chirish",
  'payment.deleteWarning':
    '"{label}" to\'lov usulini o\'chirishni xohlaysizmi? Bu amalni qaytarib bo\'lmaydi.',

  // Notification
  'notification.markAllRead': "Barchasini o'qilgan deb belgilash",
  'notification.empty': "Xabarnomalar yo'q",
  'notification.order': 'Buyurtma',
  'notification.promo': 'Aksiya',
  'notification.system': 'Tizim',

  // Onboarding
  'onboarding.skip': "O'tkazib yuborish",
  'onboarding.next': 'Keyingi',
  'onboarding.getStarted': 'Boshlash',
  'onboarding.slide1Title': 'Millionlab mahsulotlar',
  'onboarding.slide1Desc': "Xitoydan to'g'ridan-to'g'ri yetkazib berish",
  'onboarding.slide2Title': 'Eng yaxshi narxlar',
  'onboarding.slide2Desc': 'Optom va chakana narxlarda xarid qiling',
  'onboarding.slide3Title': 'Xavfsiz xaridlar',
  'onboarding.slide3Desc': 'Xaridlaringiz kafolatlanadi',

  // Common (additions)
  'common.confirm': 'Tasdiqlash',
  'common.search': 'Qidirish',
  'common.all': 'Barchasi',
  'common.popular': 'Ommabop',
  'common.new': 'Yangi',
  'common.price': 'Narxi',
  'common.cheap': 'Arzon',
  'common.expensive': 'Qimmat',
  'common.rating': 'Baho',
  'common.addCard': "Karta qo'shish",
  'common.cardDeleted': "To'lov usuli o'chirildi",

  // Home page
  'home.discounts': 'Chegirmalar',
  'home.recommended': 'Tavsiya etamiz',
  'home.newArrivals': 'Yangi kelganlar',
  'home.promoDiscount': 'Aksiya {percent}% gacha',
  'home.promoSelected': 'Tanlangan GPU larga',
  'home.noticeNewUser': 'Yangi foydalanuvchilar uchun 10% chegirma! Kod: GEEK10',
  'home.bannerTitle': 'Noutbuk Festival',
  'home.bannerSubtitle': "500 000 so'mgacha chegirma!",
  'home.bannerBadge': 'GeekShop Exclusive',

  // Category labels
  'category.gpu': 'Videokartalar',
  'category.cpu': 'Protsessorlar',
  'category.monitor': 'Monitorlar',
  'category.laptop': 'Noutbuklar',
  'category.ram': 'Xotira (RAM)',
  'category.ssd': 'SSD/HDD',
  'category.keyboard': 'Klaviatura',
  'category.mouse': 'Sichqoncha',
  'category.motherboard': 'Ona platalar',
  'category.periphery': 'Periferiya',
  'category.operativeMemory': 'Operativ xotira',
  'category.subcategories': 'Turkumlar',
  'category.productCount': '{count} ta mahsulot',
  'category.searchPlaceholder': 'Kategoriyada qidirish...',

  // Cart page (additions)
  'cart.emptyDescription': "Hali hech narsa qo'shilmagan. Keling, kompyuter qismlarini ko'rib chiqamiz!",
  'cart.shopNow': 'Xarid qilish',

  // Order page (additions)
  'order.emptyDescription': "Hali hech qanday buyurtma bermagansiz. Mahsulotlarni ko'rib chiqing!",
  'order.allLoaded': 'Barcha buyurtmalar yuklandi',
  'order.delivered': 'Yetkazildi',
  'order.cancelled': 'Bekor qilingan',
  'order.rate': 'Baholash',
  'order.paid': "To'landi",
  'order.shipped': 'Yuborildi',
  'order.shipping': 'Yetkazilmoqda',
  'order.summary': 'Buyurtma xulosasi',
  'order.contactSeller': 'Sotuvchiga yozish',
  'order.reorderFull': 'Qayta buyurtma berish',
  'order.copy': 'Nusxa olish',

  // Profile page (additions)
  'profile.orders': 'Buyurtmalar',
  'profile.addresses': 'Manzillar',
  'profile.payment': "To'lov",
  'profile.guest': "Mehmon",
  'profile.guestPrompt': "Tizimga kiring yoki ro'yxatdan o'ting",

  // Notification (additions)
  'notification.promos': 'Aksiyalar',
  'notification.noNotifSection': "Bu bo'limda xabarnoma yo'q",
  'notification.newNotifDescription': "Yangi xabarnomalar bu yerda ko'rsatiladi",
  'notification.markAllReadLabel': "Barchasini o'qilgan qilish",

  // Wishlist (additions)
  'wishlist.emptyDescription': "Hali hech narsa qo'shilmagan. Mahsulotlar sahifasida yulduzcha belgisini bosib qo'shing!",
  'wishlist.viewProducts': "Mahsulotlarni ko'rish",
  'wishlist.noFilterResults': "Bu filtrda sevimli mahsulotlar yo'q",
  'wishlist.onSale': 'Chegirmada',
  'wishlist.lowStock': 'Kam qolgan',

  // Review (additions)
  'review.photoTab': 'Rasmli',
  'review.starTab': '{count} yulduz',
  'review.ratingError': 'Iltimos, bahoni tanlang',
  'review.ratingValidation': 'Iltimos, mahsulotni baholang',
  'review.imageHint': 'Maksimum {max} ta rasm, har biri 5MB gacha',
  'review.maxImagesError': "Maksimum {max} ta rasm qo'shish mumkin",
  'review.charCount': '{current}/{max}',

  // Search (additions)
  'search.clearHistory': 'Tarixni tozalash',
  'search.popularProducts': 'Ommabop mahsulotlar',
  'search.noResultsDescription': "hech narsa topilmadi. Boshqa kalit so'zlarni sinab ko'ring.",

  // Address (additions)
  'address.emptyTitle': 'Manzillar topilmadi',
  'address.emptyDescription': "Hali hech qanday manzil qo'shilmagan. Yangi manzil qo'shing.",
  'address.addShort': "Manzil qo'shish",
  'address.deleteTitle': "Manzilni o'chirish",
  'address.deleteBody': "manzilini o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.",
  'address.deletedToast': "manzili o'chirildi",
  'address.myAddresses': 'Manzillarim',

  // Select
  'select.placeholder': 'Tanlang',
  'select.confirm': 'Tasdiqlash',
  'select.cancel': 'Bekor qilish',
  'select.title': 'Tanlash',

  // ImageUploader
  'imageUploader.add': "Rasm qo'shish",
  'imageUploader.delete': "Rasmni o'chirish",
  'imageUploader.maxCount': "Maksimum {max} ta rasm",
  'imageUploader.sizeError': "Rasm hajmi {max}MB dan oshmasligi kerak",

  // Chip
  'chip.delete': "O'chirish: {label}",

  // GroupBuy
  'groupBuy.joinGroup': "Guruhga qo'shilish",
  'groupBuy.buyAlone': 'Yakka sotib olish',
  'groupBuy.joined': '{current}/{total} qo\'shildi',
  'groupBuy.timeLeft': '{time} qoldi',
  'groupBuy.groupPrice': 'Guruh',
  'groupBuy.soloPrice': 'Yakka',
  'groupBuy.expired': 'Muddati tugadi',
  'groupBuy.full': 'Guruh to\'ldi',

  // Stock
  'stock.onlyLeft': 'Faqat {count} ta qoldi!',
  'stock.sold': '{percent}% sotildi',
  'stock.inStock': 'Mavjud',
  'stock.lowStock': 'Kam qoldi',
  'stock.almostGone': 'Deyarli tugadi!',

  // Shop
  'shop.follow': 'Obuna',
  'shop.following': "Obuna bo'lgan",
  'shop.enter': "Do'konga kirish",
  'shop.products': '{count} ta mahsulot',
  'shop.followers': '{count} ta obunachi',
  'shop.responseRate': '{rate}% javob',

  // Delivery
  'delivery.pending': 'Tayyor qilinmoqda',
  'delivery.shipped': 'Yuborildi',
  'delivery.inTransit': "Yo'lda",
  'delivery.delivered': 'Yetkazildi',
  'delivery.track': 'Kuzatish',
  'delivery.copy': 'Nusxa olish',
  'delivery.estimated': 'Taxminiy: {date}',
  'delivery.lastUpdate': 'Oxirgi yangilanish: {time}',
  'delivery.trackingNumber': 'Trek raqam: {number}',

  // Installment
  'installment.perMonth': '{price}/oy',
  'installment.months': '{count} oy',
  'installment.interestFree': 'Foizsiz',
  'installment.from': 'dan',

  // SocialProof
  'socialProof.peopleBought': '{count} kishi {period} sotib oldi',
  'socialProof.peopleBoughtDefault': '{count} kishi sotib oldi',
  'socialProof.justBought': '{name} {time} oldin sotib oldi',
  'socialProof.watching': '{count} kishi hozir ko\'rmoqda',

  // Auth
  'auth.welcome': 'Xush kelibsiz!',
  'auth.phonePrompt': 'Hisobingizga kirish uchun telefon raqamingizni kiriting',
  'auth.sendCode': 'Kod yuborish',
  'auth.enterCode': 'Kodni kiriting',
  'auth.codeSentTo': '{phone} raqamiga yuborilgan kodni kiriting',
  'auth.codeNotReceived': 'Kod kelmadimi?',
  'auth.resend': 'Qayta yuborish',
  'auth.resendIn': 'Qayta yuborish ({seconds})',
  'auth.codeSent': 'Kod qayta yuborildi',
  'auth.verify': 'Tasdiqlash',
  'auth.loginViaTelegram': 'Telegram orqali kirish',
  'auth.or': 'yoki',
  'auth.termsAgreement': 'Davom etish orqali siz foydalanish shartlariga rozilik bildirasiz',
  'auth.register': "Ro'yxatdan o'tish",
  'auth.registerPrompt': "Buyurtmangizni saqlash uchun ro'yxatdan o'ting",
  'auth.enterName': 'Ismingizni kiriting',
  'auth.haveAccount': 'Allaqachon hisobingiz bormi?',
  'auth.login': 'Kirish',
  'auth.success': 'Muvaffaqiyatli!',
  'auth.loggedIn': 'Hisobingizga kirdingiz',
  'auth.registered': "Ro'yxatdan o'tdingiz",
  'auth.startShopping': 'Xarid qilishni boshlash',
  'auth.invalidCode': "Noto'g'ri kod",
  'auth.phoneLabel': 'Telefon raqam',
  'auth.otpLabel': 'Tasdiqlash kodi',
  'auth.nameLabel': 'Ism',
  'auth.phonePlaceholder': '90 123 45 67',
  'page.login': 'Kirish',
  'page.register': "Ro'yxatdan o'tish",
};
