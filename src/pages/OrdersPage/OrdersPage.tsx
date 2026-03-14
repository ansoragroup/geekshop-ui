import React from 'react';
import './OrdersPage.scss';

const statusTabs = [
  { label: 'Barchasi', active: true },
  { label: "To'lov kutilmoqda", active: false },
  { label: 'Yetkazilmoqda', active: false },
  { label: 'Baholash', active: false },
  { label: 'Qaytarish', active: false },
];

const orders = [
  {
    id: 'GS-2026031401',
    date: '14 mart, 2026',
    status: 'shipping',
    statusText: 'Yetkazilmoqda',
    items: [
      {
        name: 'MSI GeForce RTX 4060 Ventus 2X 8GB',
        variant: '8GB / Qora',
        price: '5 200 000',
        qty: 1,
        seed: 'order-gpu1',
      },
    ],
    totalItems: 1,
    total: '5 200 000',
    actions: ['track', 'detail'],
  },
  {
    id: 'GS-2026030802',
    date: '8 mart, 2026',
    status: 'review',
    statusText: 'Baholash',
    items: [
      {
        name: 'AMD Ryzen 7 7800X3D Protsessor AM5',
        variant: '8 yadro / 16 ip',
        price: '4 100 000',
        qty: 1,
        seed: 'order-cpu1',
      },
      {
        name: 'Corsair Vengeance DDR5 32GB 6000MHz',
        variant: '32GB / 2x16GB',
        price: '2 200 000',
        qty: 1,
        seed: 'order-ram1',
      },
    ],
    totalItems: 2,
    total: '6 300 000',
    actions: ['review', 'detail'],
  },
  {
    id: 'GS-2026022515',
    date: '25 fevral, 2026',
    status: 'delivered',
    statusText: 'Yetkazildi',
    items: [
      {
        name: 'Samsung 990 Pro NVMe 2TB SSD',
        variant: '2TB / M.2',
        price: '2 800 000',
        qty: 2,
        seed: 'order-ssd1',
      },
    ],
    totalItems: 2,
    total: '5 600 000',
    actions: ['reorder', 'detail'],
  },
  {
    id: 'GS-2026020103',
    date: '1 fevral, 2026',
    status: 'pending',
    statusText: "To'lov kutilmoqda",
    items: [
      {
        name: 'ASUS ROG Swift 27" 2K 165Hz Gaming Monitor',
        variant: '27 dyuym / 2K',
        price: '4 800 000',
        qty: 1,
        seed: 'order-monitor1',
      },
    ],
    totalItems: 1,
    total: '4 800 000',
    actions: ['pay', 'cancel'],
  },
];

const getActionLabel = (action: string) => {
  switch (action) {
    case 'track': return 'Kuzatish';
    case 'detail': return 'Batafsil';
    case 'review': return 'Baholash';
    case 'reorder': return 'Qayta buyurtma';
    case 'pay': return "To'lash";
    case 'cancel': return 'Bekor qilish';
    default: return action;
  }
};

const isPrimary = (action: string) => ['track', 'review', 'pay', 'reorder'].includes(action);

export const OrdersPage: React.FC = () => {
  return (
    <div className="orders-page">
      {/* NavBar */}
      <header className="orders-page__navbar">
        <svg className="orders-page__back" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span className="orders-page__title">Buyurtmalarim</span>
        <span className="orders-page__navbar-spacer" />
      </header>

      {/* Status Tabs */}
      <div className="orders-page__tabs">
        {statusTabs.map((tab) => (
          <span
            key={tab.label}
            className={`orders-page__tab ${tab.active ? 'orders-page__tab--active' : ''}`}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {/* Orders List */}
      <div className="orders-page__list">
        {orders.map((order) => (
          <div key={order.id} className="orders-page__order-card">
            {/* Order Header */}
            <div className="orders-page__order-header">
              <span className="orders-page__order-id">{order.id}</span>
              <span className={`orders-page__order-status orders-page__order-status--${order.status}`}>
                {order.statusText}
              </span>
            </div>

            {/* Date */}
            <div className="orders-page__order-date">{order.date}</div>

            {/* Order Items */}
            <div className="orders-page__order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="orders-page__order-item">
                  <img
                    className="orders-page__item-image"
                    src={`https://picsum.photos/seed/${item.seed}/128/128`}
                    alt={item.name}
                  />
                  <div className="orders-page__item-content">
                    <div className="orders-page__item-name">{item.name}</div>
                    <div className="orders-page__item-variant">{item.variant}</div>
                    <div className="orders-page__item-bottom">
                      <span className="orders-page__item-price">{item.price} so'm</span>
                      <span className="orders-page__item-qty">x{item.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="orders-page__order-footer">
              <div className="orders-page__order-total">
                <span className="orders-page__total-count">{order.totalItems} ta mahsulot</span>
                <span className="orders-page__total-label">Jami:</span>
                <span className="orders-page__total-currency">so'm </span>
                <span className="orders-page__total-amount">{order.total}</span>
              </div>
              <div className="orders-page__order-actions">
                {order.actions.map((action) => (
                  <button
                    key={action}
                    className={`orders-page__action-btn ${
                      isPrimary(action)
                        ? 'orders-page__action-btn--primary'
                        : 'orders-page__action-btn--outline'
                    }`}
                  >
                    {getActionLabel(action)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
