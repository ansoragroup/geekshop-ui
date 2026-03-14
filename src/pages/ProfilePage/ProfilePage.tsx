import React from 'react';
import './ProfilePage.scss';

const orderStatuses = [
  {
    label: "To'lov\nkutilmoqda",
    badge: 2,
    icon: (
      <svg className="profile-page__status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Jo'natildi",
    badge: 1,
    icon: (
      <svg className="profile-page__status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Yetkazildi',
    badge: 0,
    icon: (
      <svg className="profile-page__status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    label: 'Baholash',
    badge: 3,
    icon: (
      <svg className="profile-page__status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    label: 'Qaytarish',
    badge: 0,
    icon: (
      <svg className="profile-page__status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
      </svg>
    ),
  },
];

const infoCards = [
  {
    label: 'Yetkazma',
    count: '3 ta manzil',
    bg: '#E6F0FF',
    color: '#1890FF',
    icon: (
      <svg className="profile-page__info-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#1890FF" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: 'Sevimlilar',
    count: '12 ta mahsulot',
    bg: '#FFE6E6',
    color: '#FF3B30',
    icon: (
      <svg className="profile-page__info-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    label: "Do'konlar",
    count: 'GeekShop.uz',
    bg: '#FFF0E6',
    color: '#FF5000',
    icon: (
      <svg className="profile-page__info-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#FF5000" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: "Ko'rilgan",
    count: '24 ta mahsulot',
    bg: '#F0E6FF',
    color: '#7C3AED',
    icon: (
      <svg className="profile-page__info-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

const coupons = [
  { amount: '50K', desc: "500K so'mdan", expire: '2026-04-01 gacha' },
  { amount: '100K', desc: "1M so'mdan", expire: '2026-03-25 gacha' },
  { amount: '200K', desc: "3M so'mdan", expire: '2026-05-15 gacha' },
];

const recommendations = [
  { name: 'RTX 4070 Super', price: '8 900 000', seed: 'profile-rec1' },
  { name: 'Ryzen 9 7900X', price: '4 200 000', seed: 'profile-rec2' },
  { name: 'Samsung 980 Pro 2TB', price: '2 600 000', seed: 'profile-rec3' },
  { name: 'Corsair K70 RGB', price: '1 200 000', seed: 'profile-rec4' },
];

export const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-page__header">
        <div className="profile-page__avatar">
          <svg className="profile-page__avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div className="profile-page__user-info">
          <div className="profile-page__user-name">Mehmon</div>
          <div className="profile-page__user-status">Tizimga kiring yoki ro'yxatdan o'ting</div>
        </div>
        <svg className="profile-page__settings-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </header>

      {/* Quick Actions */}
      <div className="profile-page__quick-actions">
        <div className="profile-page__quick-action">
          <svg className="profile-page__quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span className="profile-page__quick-label">Hisob</span>
        </div>
        <div className="profile-page__quick-action">
          <svg className="profile-page__quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="profile-page__quick-label">Korzina</span>
        </div>
        <div className="profile-page__quick-action">
          <svg className="profile-page__quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span className="profile-page__quick-label">Sozlama</span>
        </div>
      </div>

      {/* Orders Section */}
      <div className="profile-page__orders">
        <div className="profile-page__orders-header">
          <h3 className="profile-page__orders-title">Mening buyurtmalarim</h3>
          <span className="profile-page__orders-link">
            Barchasi
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </span>
        </div>
        <div className="profile-page__order-statuses">
          {orderStatuses.map((status) => (
            <div key={status.label} className="profile-page__order-status">
              {status.icon}
              {status.badge > 0 && (
                <span className="profile-page__status-badge">{status.badge}</span>
              )}
              <span className="profile-page__status-label">{status.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="profile-page__info-grid">
        {infoCards.map((card) => (
          <div key={card.label} className="profile-page__info-card">
            <div className="profile-page__info-icon" style={{ background: card.bg }}>
              {card.icon}
            </div>
            <div className="profile-page__info-text">
              <div className="profile-page__info-label">{card.label}</div>
              <div className="profile-page__info-count">{card.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Banner */}
      <div className="profile-page__coupon-banner">
        <div>
          <div className="profile-page__coupon-banner-text">Kupon markazi</div>
          <div className="profile-page__coupon-banner-sub">Bepul kuponlarni oling!</div>
        </div>
        <svg className="profile-page__coupon-banner-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>

      {/* Coupons */}
      <div className="profile-page__coupons">
        <h3 className="profile-page__coupons-title">Mening kuponlarim</h3>
        <div className="profile-page__coupons-scroll">
          {coupons.map((coupon) => (
            <div key={coupon.amount} className="profile-page__coupon-card">
              <div className="profile-page__coupon-value">
                <span className="profile-page__coupon-amount">{coupon.amount}</span>
                <span className="profile-page__coupon-unit">so'm</span>
              </div>
              <div className="profile-page__coupon-info">
                <span className="profile-page__coupon-desc">{coupon.desc}</span>
                <span className="profile-page__coupon-expire">{coupon.expire}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="profile-page__recommendations">
        <h3 className="profile-page__reco-title">Sizga yoqishi mumkin</h3>
        <div className="profile-page__reco-scroll">
          {recommendations.map((item) => (
            <div key={item.seed} className="profile-page__reco-card">
              <img className="profile-page__reco-image" src={`https://picsum.photos/seed/${item.seed}/260/260`} alt={item.name} />
              <div className="profile-page__reco-name">{item.name}</div>
              <div className="profile-page__reco-price">{item.price} so'm</div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="profile-page__logout">
        <button className="profile-page__logout-btn">Chiqish</button>
      </div>

      {/* TabBar */}
      <nav className="profile-page__tabbar">
        <div className="profile-page__tab-item">
          <svg className="profile-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          <span className="profile-page__tab-label">Bosh sahifa</span>
        </div>
        <div className="profile-page__tab-item">
          <svg className="profile-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
          <span className="profile-page__tab-label">Kategoriyalar</span>
        </div>
        <div className="profile-page__tab-item">
          <svg className="profile-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="profile-page__tab-label">Savat</span>
        </div>
        <div className="profile-page__tab-item">
          <svg className="profile-page__tab-icon profile-page__tab-icon--active" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span className="profile-page__tab-label profile-page__tab-label--active">Profil</span>
        </div>
      </nav>
    </div>
  );
};

export default ProfilePage;
