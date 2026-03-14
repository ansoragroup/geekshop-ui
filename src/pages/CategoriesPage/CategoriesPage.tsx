import React from 'react';
import './CategoriesPage.scss';

const sidebarItems = [
  { name: 'Videokartalar', active: true },
  { name: 'Protsessorlar', active: false },
  { name: 'Monitorlar', active: false },
  { name: 'Noutbuklar', active: false },
  { name: 'Xotira (RAM)', active: false },
  { name: 'SSD / HDD', active: false },
  { name: 'Ona platalar', active: false },
  { name: 'Blok pitaniya', active: false },
  { name: 'Korpuslar', active: false },
  { name: 'Klaviatura', active: false },
  { name: 'Sichqoncha', active: false },
  { name: 'Quloqchin', active: false },
];

const brands = [
  { name: 'NVIDIA', color: '#76B900' },
  { name: 'AMD', color: '#ED1C24' },
  { name: 'MSI', color: '#FF0000' },
  { name: 'ASUS', color: '#1A1A1A' },
  { name: 'Gigabyte', color: '#EF6C00' },
  { name: 'EVGA', color: '#4CAF50' },
];

const products = [
  { id: 1, name: 'RTX 4090 Founders Edition 24GB', price: '19 800 000', seed: 'cat-rtx4090' },
  { id: 2, name: 'RTX 4080 Super ASUS TUF 16GB', price: '13 500 000', seed: 'cat-rtx4080' },
  { id: 3, name: 'RTX 4070 Ti MSI Gaming X 12GB', price: '9 200 000', seed: 'cat-rtx4070ti' },
  { id: 4, name: 'RX 7900 XTX Sapphire Nitro+ 24GB', price: '12 800 000', seed: 'cat-rx7900xtx' },
];

export const CategoriesPage: React.FC = () => {
  return (
    <div className="categories-page">
      {/* Header */}
      <header className="categories-page__header">
        <h1 className="categories-page__title">Kategoriyalar</h1>
        <svg className="categories-page__search-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </header>

      {/* Body */}
      <div className="categories-page__body">
        {/* Left Sidebar */}
        <aside className="categories-page__sidebar">
          {sidebarItems.map((item) => (
            <div
              key={item.name}
              className={`categories-page__sidebar-item ${item.active ? 'categories-page__sidebar-item--active' : ''}`}
            >
              {item.name}
            </div>
          ))}
        </aside>

        {/* Right Content */}
        <main className="categories-page__content">
          {/* Category Header */}
          <div className="categories-page__content-header">
            <h2 className="categories-page__content-header-title">Videokartalar</h2>
            <span className="categories-page__content-header-count">156 ta mahsulot</span>
            <div className="categories-page__content-header-deco" />
          </div>

          {/* Brand Icons */}
          <h3 className="categories-page__brands-title">Brendlar</h3>
          <div className="categories-page__brands-grid">
            {brands.map((brand) => (
              <div key={brand.name} className="categories-page__brand-item">
                <div
                  className="categories-page__brand-logo"
                  style={{ background: brand.color }}
                >
                  {brand.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="categories-page__brand-name">{brand.name}</span>
              </div>
            ))}
          </div>

          {/* Products */}
          <h3 className="categories-page__products-title">Ommabop mahsulotlar</h3>
          <div className="categories-page__products-grid">
            {products.map((product) => (
              <div key={product.id} className="categories-page__product-card">
                <img
                  className="categories-page__product-image"
                  src={`https://picsum.photos/seed/${product.seed}/300/300`}
                  alt={product.name}
                />
                <div className="categories-page__product-info">
                  <div className="categories-page__product-name">{product.name}</div>
                  <div className="categories-page__product-price">{product.price} so'm</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* TabBar */}
      <nav className="categories-page__tabbar">
        <div className="categories-page__tab-item">
          <svg className="categories-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          <span className="categories-page__tab-label">Bosh sahifa</span>
        </div>
        <div className="categories-page__tab-item">
          <svg className="categories-page__tab-icon categories-page__tab-icon--active" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span className="categories-page__tab-label categories-page__tab-label--active">Kategoriyalar</span>
        </div>
        <div className="categories-page__tab-item">
          <svg className="categories-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="categories-page__tab-label">Savat</span>
        </div>
        <div className="categories-page__tab-item">
          <svg className="categories-page__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span className="categories-page__tab-label">Profil</span>
        </div>
      </nav>
    </div>
  );
};

export default CategoriesPage;
