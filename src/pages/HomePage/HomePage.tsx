import React from 'react';
import './HomePage.scss';

const categories = [
  { name: 'Videokartalar', emoji: '🎮', bg: '#FFF0E6' },
  { name: 'Protsessorlar', emoji: '⚡', bg: '#E6F0FF' },
  { name: 'Monitorlar', emoji: '🖥️', bg: '#F0E6FF' },
  { name: 'Noutbuklar', emoji: '💻', bg: '#E6FFE6' },
  { name: 'Xotira (RAM)', emoji: '🧩', bg: '#FFE6E6' },
  { name: 'SSD/HDD', emoji: '💾', bg: '#FFF5E6' },
  { name: 'Klaviatura', emoji: '⌨️', bg: '#E6FFFF' },
  { name: 'Sichqoncha', emoji: '🖱️', bg: '#FFE6F5' },
];

const deals = [
  { id: 1, name: 'RTX 4060 Ti', price: '4 200 000', original: '5 800 000', discount: '-28%', seed: 'rtx4060' },
  { id: 2, name: 'Ryzen 7 5800X', price: '2 100 000', original: '3 200 000', discount: '-34%', seed: 'ryzen5800' },
  { id: 3, name: 'Samsung 27"', price: '3 400 000', original: '4 100 000', discount: '-17%', seed: 'monitor27' },
  { id: 4, name: 'DDR5 32GB', price: '1 600 000', original: '2 000 000', discount: '-20%', seed: 'ddr5ram' },
  { id: 5, name: 'NVMe SSD 1TB', price: '850 000', original: '1 200 000', discount: '-29%', seed: 'nvmessd' },
];

const products = [
  { id: 1, title: 'MSI GeForce RTX 4070 Super 12GB GDDR6X', price: '8 900 000', sales: '234 dona sotilgan', rating: '4.8', tag: 'official', seed: 'gpu4070' },
  { id: 2, title: 'AMD Ryzen 9 7950X Protsessor 16 yadro', price: '5 600 000', sales: '189 dona sotilgan', rating: '4.9', tag: 'sale', seed: 'ryzen9' },
  { id: 3, title: 'ASUS ROG Swift 27" 2K 165Hz Monitor', price: '4 800 000', sales: '156 dona sotilgan', rating: '4.7', tag: 'official', seed: 'rogmonitor' },
  { id: 4, title: 'Corsair Vengeance DDR5 32GB 6000MHz', price: '2 200 000', sales: '312 dona sotilgan', rating: '4.6', tag: 'sale', seed: 'corsairram' },
  { id: 5, title: 'Samsung 990 Pro NVMe 2TB SSD', price: '2 800 000', sales: '278 dona sotilgan', rating: '4.8', tag: 'official', seed: 'samsung990' },
  { id: 6, title: 'ASUS ROG Strix B650E-F Motherboard', price: '3 400 000', sales: '98 dona sotilgan', rating: '4.5', seed: 'rogstrix' },
];

const filterTabs = ['Barchasi', 'Videokartalar', 'Protsessorlar', 'Noutbuklar', 'Monitorlar', 'SSD'];

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* NavBar */}
      <header className="home-page__navbar">
        <span className="home-page__logo">GeekShop</span>
        <div className="home-page__search-bar">
          <svg className="home-page__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input className="home-page__search-input" placeholder="RTX 4090 qidirish..." readOnly />
        </div>
        <div className="home-page__nav-icons">
          <svg className="home-page__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
          <svg className="home-page__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="home-page__hero">
        <span className="home-page__hero-badge">GeekShop Exclusive</span>
        <h2 className="home-page__hero-title">Noutbuk Festival</h2>
        <p className="home-page__hero-subtitle">500 000 so'mgacha chegirma!</p>
        <div className="home-page__hero-decoration" />
      </div>

      {/* Promo Cards */}
      <div className="home-page__promos">
        <div className="home-page__promo-card home-page__promo-card--sale">
          <span className="home-page__promo-badge">HOT</span>
          <div className="home-page__promo-title">Aksiya 50% gacha</div>
          <div className="home-page__promo-subtitle">Tanlangan GPU larga</div>
        </div>
        <div className="home-page__promo-card home-page__promo-card--new">
          <span className="home-page__promo-badge">NEW</span>
          <div className="home-page__promo-title">Yangi kelganlar</div>
          <div className="home-page__promo-subtitle">RTX 50 seriyasi</div>
        </div>
      </div>

      {/* Categories */}
      <div className="home-page__categories">
        <div className="home-page__categories-scroll">
          {categories.map((cat) => (
            <div key={cat.name} className="home-page__category-item">
              <div className="home-page__category-icon" style={{ background: cat.bg }}>
                {cat.emoji}
              </div>
              <span className="home-page__category-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deals Section */}
      <div className="home-page__deals">
        <div className="home-page__deals-header">
          <div className="home-page__deals-title-row">
            <svg className="home-page__deals-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span className="home-page__deals-title">Chegirmalar</span>
            <div className="home-page__deals-countdown">
              <span className="home-page__countdown-block">02</span>
              <span className="home-page__countdown-sep">:</span>
              <span className="home-page__countdown-block">45</span>
              <span className="home-page__countdown-sep">:</span>
              <span className="home-page__countdown-block">18</span>
            </div>
          </div>
          <span className="home-page__deals-more">
            Barchasi
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </span>
        </div>
        <div className="home-page__deals-scroll">
          {deals.map((deal) => (
            <div key={deal.id} className="home-page__deal-card">
              <img className="home-page__deal-image" src={`https://picsum.photos/seed/${deal.seed}/240/240`} alt={deal.name} />
              <div className="home-page__deal-price">{deal.price}</div>
              <div className="home-page__deal-original">{deal.original}</div>
              <span className="home-page__deal-badge">{deal.discount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="home-page__recommended">
        <div className="home-page__recommended-header">
          <h3 className="home-page__recommended-title">Tavsiya etamiz</h3>
        </div>
        <div className="home-page__filter-tabs">
          {filterTabs.map((tab, i) => (
            <span
              key={tab}
              className={`home-page__filter-tab ${i === 0 ? 'home-page__filter-tab--active' : ''}`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="home-page__product-grid">
          {products.map((product) => (
            <div key={product.id} className="home-page__product-card">
              <img
                className="home-page__product-image"
                src={`https://picsum.photos/seed/${product.seed}/400/400`}
                alt={product.title}
              />
              <div className="home-page__product-info">
                {product.tag && (
                  <span className={`home-page__product-tag home-page__product-tag--${product.tag}`}>
                    {product.tag === 'official' ? 'Rasmiy' : 'Chegirma'}
                  </span>
                )}
                <div className="home-page__product-title">{product.title}</div>
                <div className="home-page__product-price-row">
                  <span className="home-page__product-currency">so'm</span>
                  <span className="home-page__product-price">{product.price}</span>
                </div>
                <div className="home-page__product-meta">
                  <span className="home-page__product-sales">{product.sales}</span>
                  <span className="home-page__product-rating">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TabBar */}
      <nav className="home-page__tabbar">
        <div className="home-page__tab-item">
          <svg className="home-page__tab-icon home-page__tab-icon--active" viewBox="0 0 24 24" fill="currentColor">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          <span className="home-page__tab-label home-page__tab-label--active">Bosh sahifa</span>
        </div>
        <div className="home-page__tab-item">
          <svg className="home-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
          <span className="home-page__tab-label">Kategoriyalar</span>
        </div>
        <div className="home-page__tab-item">
          <svg className="home-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="home-page__tab-label">Savat</span>
        </div>
        <div className="home-page__tab-item">
          <svg className="home-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span className="home-page__tab-label">Profil</span>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
