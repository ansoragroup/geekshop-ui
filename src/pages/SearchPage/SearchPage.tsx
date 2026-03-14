import React from 'react';
import './SearchPage.scss';

const popularSearches = [
  { rank: 1, text: 'RTX 4090', hot: true },
  { rank: 2, text: 'Ryzen 9 7950X', hot: true },
  { rank: 3, text: 'DDR5 RAM', hot: true },
  { rank: 4, text: 'NVMe SSD 2TB', hot: false },
  { rank: 5, text: 'Gaming Monitor 165Hz', hot: false },
  { rank: 6, text: 'RTX 4060 Ti', hot: false },
  { rank: 7, text: 'Mechanical Keyboard', hot: false },
  { rank: 8, text: 'Intel i9 14900K', hot: false },
];

const historyTags = [
  'RTX 4070 Super',
  'AMD Ryzen 7',
  'Monitor 27 dyuym',
  'SSD Samsung',
  'DDR5 32GB',
];

const suggestions = [
  { text: 'RTX 4090 Founders Edition', highlight: 'RTX 4090' },
  { text: 'RTX 4090 ASUS ROG Strix', highlight: 'RTX 4090' },
  { text: 'RTX 4090 MSI Suprim X', highlight: 'RTX 4090' },
  { text: 'RTX 4090 Gigabyte Aorus', highlight: 'RTX 4090' },
  { text: 'RTX 4090 sovutgich', highlight: 'RTX 4090' },
];

const searchResults = [
  { id: 1, title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB', price: '19 800 000', sales: '45 dona sotilgan', seed: 'search-rtx4090' },
  { id: 2, title: 'ASUS ROG Strix RTX 4090 OC 24GB', price: '22 500 000', sales: '32 dona sotilgan', seed: 'search-asus4090' },
  { id: 3, title: 'MSI Suprim X RTX 4090 24GB GDDR6X', price: '21 200 000', sales: '28 dona sotilgan', seed: 'search-msi4090' },
  { id: 4, title: 'Gigabyte Aorus RTX 4090 Master 24GB', price: '23 100 000', sales: '19 dona sotilgan', seed: 'search-giga4090' },
];

interface SearchPageProps {
  state?: 'empty' | 'typing' | 'results';
}

export const SearchPage: React.FC<SearchPageProps> = ({ state = 'empty' }) => {
  return (
    <div className="search-page">
      {/* Search Bar */}
      <div className="search-page__search-bar">
        <svg className="search-page__back" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <div className="search-page__input-wrapper">
          <svg className="search-page__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="search-page__input"
            placeholder="Qidirish..."
            defaultValue={state !== 'empty' ? 'RTX 4090' : ''}
            readOnly
          />
          {state !== 'empty' && (
            <svg className="search-page__clear-btn" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="#CCC"/>
              <path d="m15 9-6 6M9 9l6 6" stroke="#FFF" strokeWidth="2"/>
            </svg>
          )}
        </div>
        <svg className="search-page__camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      </div>

      {/* State: Empty (popular + history) */}
      {state === 'empty' && (
        <>
          {/* Popular Searches */}
          <div className="search-page__popular">
            <div className="search-page__popular-header">
              <h3 className="search-page__popular-title">Ommabop qidiruvlar</h3>
              <span className="search-page__popular-refresh">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Yangilash
              </span>
            </div>
            <div className="search-page__popular-tags">
              {popularSearches.map((item) => (
                <span key={item.rank} className="search-page__popular-tag">
                  <span
                    className={`search-page__tag-rank ${
                      item.rank <= 3
                        ? item.rank === 1
                          ? 'search-page__tag-rank--hot'
                          : 'search-page__tag-rank--hot'
                        : 'search-page__tag-rank--cool'
                    }`}
                    style={item.rank <= 3 ? undefined : undefined}
                  >
                    {item.rank}
                  </span>
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Search History */}
          <div className="search-page__history">
            <div className="search-page__history-header">
              <h3 className="search-page__history-title">Qidiruv tarixi</h3>
              <svg className="search-page__history-clear" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </div>
            <div className="search-page__history-tags">
              {historyTags.map((tag) => (
                <span key={tag} className="search-page__history-tag">{tag}</span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* State: Typing (suggestions) */}
      {state === 'typing' && (
        <div className="search-page__suggestions">
          {suggestions.map((item) => (
            <div key={item.text} className="search-page__suggestion-item">
              <svg className="search-page__suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <span className="search-page__suggestion-text">
                <span className="search-page__suggestion-highlight">{item.highlight}</span>
                {item.text.replace(item.highlight, '')}
              </span>
              <svg className="search-page__suggestion-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="17 11 12 6 7 11"/>
                <polyline points="17 18 12 13 7 18"/>
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* State: Results */}
      {state === 'results' && (
        <div className="search-page__results">
          <div className="search-page__results-header">
            <span className="search-page__results-count">124 ta natija</span>
            <div className="search-page__results-sort">
              <button className="search-page__sort-btn search-page__sort-btn--active">Ommabop</button>
              <button className="search-page__sort-btn">Narxi</button>
              <button className="search-page__sort-btn">Yangi</button>
              <button className="search-page__sort-btn">Baho</button>
            </div>
          </div>
          <div className="search-page__results-grid">
            {searchResults.map((product) => (
              <div key={product.id} className="search-page__result-card">
                <img
                  className="search-page__result-image"
                  src={`https://picsum.photos/seed/${product.seed}/400/400`}
                  alt={product.title}
                />
                <div className="search-page__result-info">
                  <div className="search-page__result-title">{product.title}</div>
                  <div className="search-page__result-price-row">
                    <span className="search-page__result-currency">so'm</span>
                    <span className="search-page__result-price">{product.price}</span>
                  </div>
                  <span className="search-page__result-sales">{product.sales}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
