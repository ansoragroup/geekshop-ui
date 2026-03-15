import { useState } from 'react';
import {
  NavBar,
  SearchBar,
  TabFilter,
  Button,
  Divider,
  useGeekShop,
} from '../../components';
import styles from './FAQPage.module.scss';

/* ---------- SVG Icons ---------- */

const ChevronDown = ({ expanded }: { expanded: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ''}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

/* ---------- Props ---------- */

export type FAQPageProps = Record<string, never>;

/* ---------- FAQ data ---------- */

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'Buyurtmani qanday berishim mumkin?',
    answer: 'Mahsulotni tanlang, savatga qo\'shing, to\'lov usulini tanlang va buyurtmani tasdiqlang. Buyurtma berilgandan so\'ng, sizga tasdiqlash xabari yuboriladi.',
    category: 'order',
  },
  {
    id: '2',
    question: 'Buyurtmam qachon yetkaziladi?',
    answer: 'Toshkent shahri ichida 1-2 ish kuni, viloyatlarga 3-5 ish kuni ichida yetkaziladi. Aniq vaqtni buyurtma sahifasida kuzatishingiz mumkin.',
    category: 'order',
  },
  {
    id: '3',
    question: 'Qanday to\'lov usullari mavjud?',
    answer: 'UzCard, Humo, Visa, Mastercard kartalari, Payme, Click, naqd pul va nasiya orqali to\'lash mumkin.',
    category: 'payment',
  },
  {
    id: '4',
    question: 'Nasiya sharoitlari qanday?',
    answer: 'Nasiya 3, 6, 9 yoki 12 oyga beriladi. Foiz stavkasi 0% dan boshlanadi (tanlangan bank va muddat bo\'yicha farq qilishi mumkin).',
    category: 'payment',
  },
  {
    id: '5',
    question: 'Yetkazib berish narxi qancha?',
    answer: 'Toshkent shahri ichida 500 000 so\'mdan ortiq buyurtmalarga yetkazish bepul. Boshqa holatlarda yetkazish narxi 25 000 so\'mdan boshlanadi.',
    category: 'delivery',
  },
  {
    id: '6',
    question: 'Boshqa shaharlarga yetkazasizlarmi?',
    answer: 'Ha, O\'zbekistonning barcha viloyatlari va shaharlariga yetkazib beramiz. Viloyatlarga yetkazish muddati 3-5 ish kuni.',
    category: 'delivery',
  },
  {
    id: '7',
    question: 'Mahsulotni qaytarish mumkinmi?',
    answer: 'Ha, mahsulotni qabul qilganingizdan keyin 14 kun ichida qaytarishingiz mumkin. Mahsulot ishlatilmagan va original qadoqda bo\'lishi kerak.',
    category: 'return',
  },
  {
    id: '8',
    question: 'Qaytarish jarayoni qanday?',
    answer: 'Hisobingizga kiring → Buyurtmalar → Qaytarish so\'rovi → Sababni tanlang → Rasmlarni yuklang → Tasdiqlang. Pullaringiz 3-5 ish kuni ichida qaytariladi.',
    category: 'return',
  },
  {
    id: '9',
    question: 'Parolni qanday o\'zgartiraman?',
    answer: 'Sozlamalar → Xavfsizlik → Parolni o\'zgartirish. SMS orqali tasdiqlashdan keyin yangi parol o\'rnatishingiz mumkin.',
    category: 'account',
  },
  {
    id: '10',
    question: 'Hisobimni qanday o\'chirib yuboraman?',
    answer: 'Sozlamalar → Hisobni o\'chirish. Hisobingiz o\'chirilgandan keyin barcha ma\'lumotlar 30 kun ichida o\'chiriladi.',
    category: 'account',
  },
];

const categories = [
  { key: 'all', label: 'Barchasi' },
  { key: 'order', label: 'Buyurtma' },
  { key: 'payment', label: 'To\'lov' },
  { key: 'delivery', label: 'Yetkazish' },
  { key: 'return', label: 'Qaytarish' },
  { key: 'account', label: 'Hisob' },
];

/* ---------- Component ---------- */

export const FAQPage: React.FC<FAQPageProps> = () => {
  const { t } = useGeekShop();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredItems = faqItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.page}>
      <NavBar title={t('page.faq')} showBack onBack={() => {}} />

      {/* Search */}
      <div className={styles.searchWrap}>
        <SearchBar
          placeholder={t('faq.searchPlaceholder')}
          value={searchQuery}
          onChange={setSearchQuery}
          variant="filled"
        />
      </div>

      {/* Category tabs */}
      <div className={styles.tabsWrap}>
        <TabFilter
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          variant="pill"
        />
      </div>

      {/* FAQ list */}
      <div className={styles.content}>
        {filteredItems.length === 0 ? (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>{t('faq.noResults')}</p>
          </div>
        ) : (
          <div className={styles.faqList}>
            {filteredItems.map((item, index) => (
              <div key={item.id}>
                <div
                  className={styles.faqItem}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                  aria-expanded={expandedIds.has(item.id)}
                >
                  <span className={styles.question}>{item.question}</span>
                  <ChevronDown expanded={expandedIds.has(item.id)} />
                </div>
                {expandedIds.has(item.id) && (
                  <div className={styles.answer}>
                    <p className={styles.answerText}>{item.answer}</p>
                  </div>
                )}
                {index < filteredItems.length - 1 && <Divider variant="inset" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact support CTA */}
      <div className={styles.supportSection}>
        <Divider />
        <div className={styles.supportContent}>
          <p className={styles.supportText}>{t('faq.cantFind')}</p>
          <Button variant="primary" size="lg" block onClick={() => {}}>
            <span className={styles.supportBtnContent}>
              <HeadsetIcon />
              {t('faq.contactSupport')}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
