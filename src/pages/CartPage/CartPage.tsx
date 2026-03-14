import React from 'react';
import './CartPage.scss';

const cartItems = [
  {
    id: 1,
    name: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    variant: '8GB / Qora',
    price: '5 200 000',
    quantity: 1,
    checked: true,
    seed: 'cart-gpu',
  },
  {
    id: 2,
    name: 'AMD Ryzen 7 7800X3D Protsessor AM5',
    variant: '8 yadro / 16 ip',
    price: '4 100 000',
    quantity: 1,
    checked: true,
    seed: 'cart-cpu',
  },
  {
    id: 3,
    name: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
    variant: '32GB / RGB',
    price: '2 200 000',
    quantity: 2,
    checked: false,
    seed: 'cart-ram',
  },
];

interface CartPageProps {
  empty?: boolean;
}

export const CartPage: React.FC<CartPageProps> = ({ empty = false }) => {
  const checkedItems = cartItems.filter((i) => i.checked);
  const totalPrice = '11 500 000';
  const totalCount = checkedItems.length;

  return (
    <div className="cart-page">
      {/* NavBar */}
      <header className="cart-page__navbar">
        <svg className="cart-page__back" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span className="cart-page__title">Savat</span>
        {!empty && <span className="cart-page__edit">Tahrirlash</span>}
        {empty && <span style={{ width: 24 }} />}
      </header>

      {empty ? (
        /* Empty State */
        <div className="cart-page__empty">
          <svg className="cart-page__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <h3 className="cart-page__empty-title">Savatingiz bo'sh</h3>
          <p className="cart-page__empty-text">
            Hali hech narsa qo'shilmagan.{'\n'}Keling, kompyuter qismlarini ko'rib chiqamiz!
          </p>
          <button className="cart-page__empty-btn">Xarid qilish</button>
        </div>
      ) : (
        <>
          {/* Select All */}
          <div className="cart-page__select-all">
            <div className="cart-page__checkbox cart-page__checkbox--checked">
              <svg className="cart-page__checkbox-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span className="cart-page__select-label">Barchasini tanlash</span>
          </div>

          {/* Cart Items */}
          <div className="cart-page__items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-page__item">
                <div className={`cart-page__checkbox ${item.checked ? 'cart-page__checkbox--checked' : ''}`}>
                  {item.checked && (
                    <svg className="cart-page__checkbox-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <img
                  className="cart-page__item-image"
                  src={`https://picsum.photos/seed/${item.seed}/160/160`}
                  alt={item.name}
                />
                <div className="cart-page__item-content">
                  <div className="cart-page__item-name">{item.name}</div>
                  <span className="cart-page__item-variant">{item.variant}</span>
                  <div className="cart-page__item-bottom">
                    <div className="cart-page__item-price-row">
                      <span className="cart-page__item-currency">so'm</span>
                      <span className="cart-page__item-price">{item.price}</span>
                    </div>
                    <div className="cart-page__quantity">
                      <button className={`cart-page__qty-btn ${item.quantity <= 1 ? 'cart-page__qty-btn--disabled' : ''}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </button>
                      <span className="cart-page__qty-value">{item.quantity}</span>
                      <button className="cart-page__qty-btn">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="cart-page__action-bar">
            <div className="cart-page__action-checkbox">
              <div className="cart-page__checkbox cart-page__checkbox--checked">
                <svg className="cart-page__checkbox-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span className="cart-page__action-select-text">Barchasi</span>
            </div>
            <div className="cart-page__action-summary">
              <span className="cart-page__action-total-label">Jami:</span>
              <div className="cart-page__action-total-row">
                <span className="cart-page__action-currency">so'm</span>
                <span className="cart-page__action-total">{totalPrice}</span>
              </div>
            </div>
            <button className="cart-page__action-btn">
              Buyurtma berish
              <span className="cart-page__action-count">({totalCount})</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
