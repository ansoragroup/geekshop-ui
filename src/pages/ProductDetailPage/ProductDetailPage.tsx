import React from 'react';
import './ProductDetailPage.scss';

export const ProductDetailPage: React.FC = () => {
  const stars = [1, 2, 3, 4, 5];
  const rating = 4.6;

  return (
    <div className="product-detail">
      {/* Image Gallery */}
      <div className="product-detail__gallery">
        <img
          className="product-detail__gallery-image"
          src="https://picsum.photos/seed/msicard/750/750"
          alt="MSI GeForce RTX 4060"
        />
        <div className="product-detail__gallery-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </div>
        <div className="product-detail__gallery-actions">
          <div className="product-detail__gallery-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </div>
          <div className="product-detail__gallery-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
        </div>
        <span className="product-detail__gallery-counter">1/4</span>
      </div>

      {/* Price Bar */}
      <div className="product-detail__price-bar">
        <div className="product-detail__price-row">
          <span className="product-detail__price-currency">so'm</span>
          <span className="product-detail__price-value">5 200 000</span>
          <span className="product-detail__price-original">6 500 000</span>
          <span className="product-detail__price-discount">-20%</span>
        </div>
        <span className="product-detail__sku">SKU: GS-MSI-4060-V2X-8G</span>
      </div>

      {/* Trust Badges */}
      <div className="product-detail__trust-badges">
        <span className="product-detail__trust-badge">
          <svg className="product-detail__trust-icon" viewBox="0 0 24 24" fill="none" stroke="#07C160" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          Rasmiy kafolat
        </span>
        <span className="product-detail__trust-badge">
          <svg className="product-detail__trust-icon" viewBox="0 0 24 24" fill="none" stroke="#1890FF" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Sifat tekshirilgan
        </span>
        <span className="product-detail__trust-badge">
          <svg className="product-detail__trust-icon" viewBox="0 0 24 24" fill="none" stroke="#FF5000" strokeWidth="2">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Bepul qaytarish
        </span>
      </div>

      {/* Product Info */}
      <div className="product-detail__info">
        <h1 className="product-detail__title">
          MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6 OC Edition
        </h1>
        <div className="product-detail__tags-row">
          <span className="product-detail__brand-tag">MSI</span>
          <span className="product-detail__availability">
            <span className="product-detail__availability-dot" />
            Mavjud
          </span>
        </div>
        <div className="product-detail__rating-row">
          <div className="product-detail__stars">
            {stars.map((s) => (
              <svg
                key={s}
                className={`product-detail__star ${s > Math.floor(rating) ? 'product-detail__star--empty' : ''}`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="product-detail__rating-value">{rating}</span>
          <span className="product-detail__rating-count">(87 baho)</span>
        </div>
      </div>

      {/* Specs Section */}
      <div className="product-detail__specs">
        <div className="product-detail__spec-row">
          <svg className="product-detail__spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span className="product-detail__spec-label">Yetkazib berish</span>
          <span className="product-detail__spec-value">1-3 ish kuni</span>
          <svg className="product-detail__spec-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
        <div className="product-detail__spec-row">
          <svg className="product-detail__spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          </svg>
          <span className="product-detail__spec-label">Stok</span>
          <span className="product-detail__spec-value">12 dona</span>
        </div>
        <div className="product-detail__spec-row">
          <svg className="product-detail__spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 7h-9"/><path d="M14 17H5"/>
            <circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>
          </svg>
          <span className="product-detail__spec-label">Brend</span>
          <span className="product-detail__spec-value">MSI</span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-detail__tabs">
        <div className="product-detail__tabs-header">
          <span className="product-detail__tab product-detail__tab--active">Tavsif</span>
          <span className="product-detail__tab">Xususiyatlar</span>
          <span className="product-detail__tab">Baholar (3)</span>
        </div>
        <div className="product-detail__tab-content">
          <h4 className="product-detail__desc-heading">Mahsulot haqida</h4>
          <p className="product-detail__description">
            MSI GeForce RTX 4060 Ventus 2X 8GB — NVIDIA Ada Lovelace arxitekturasiga asoslangan eng so'nggi grafik karta.
            Ray tracing, DLSS 3.0 va boshqa zamonaviy texnologiyalarni qo'llab-quvvatlaydi.
          </p>
          <ul className="product-detail__desc-list" style={{ marginTop: 12 }}>
            <li className="product-detail__desc-item">NVIDIA Ada Lovelace arxitekturasi</li>
            <li className="product-detail__desc-item">8GB GDDR6 video xotira</li>
            <li className="product-detail__desc-item">128-bit xotira shinasi</li>
            <li className="product-detail__desc-item">Ray Tracing va DLSS 3.0 qo'llab-quvvatlaydi</li>
            <li className="product-detail__desc-item">Ikki ventilyatorli sovutish tizimi</li>
            <li className="product-detail__desc-item">3 yil rasmiy kafolat</li>
          </ul>
        </div>
      </div>

      {/* Action Bar */}
      <div className="product-detail__action-bar">
        <div className="product-detail__action-icon-btn">
          <svg className="product-detail__action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          <span className="product-detail__action-icon-label">Bosh sahifa</span>
        </div>
        <div className="product-detail__action-icon-btn">
          <svg className="product-detail__action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span className="product-detail__action-icon-label">Sevimli</span>
        </div>
        <div className="product-detail__action-buttons">
          <button className="product-detail__btn-cart">Savatga</button>
          <button className="product-detail__btn-buy">Sotib olish</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
