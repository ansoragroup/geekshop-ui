import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapse, CollapsePanel } from './Collapse';
import { Tag } from '../Tag';

const meta = {
  title: 'Data Display/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 24, background: '#F5F5F5', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultActiveKey: ['1'],
    children: [
      <CollapsePanel key="1" panelKey="1" title="Yetkazib berish">
        Standart yetkazib berish 3-5 ish kuni ichida amalga oshiriladi. Express yetkazib berish 1-2 ish kuni.
      </CollapsePanel>,
      <CollapsePanel key="2" panelKey="2" title="To'lov usullari">
        Uzcard, Humo, Visa, Mastercard kartalari orqali to'lash mumkin. Naqd pul bilan ham to'lash mumkin.
      </CollapsePanel>,
      <CollapsePanel key="3" panelKey="3" title="Qaytarish siyosati">
        Mahsulotni 14 kun ichida qaytarish mumkin. Mahsulot ishlatilmagan va original qadoqda bo'lishi kerak.
      </CollapsePanel>,
    ],
  },
};

export const Accordion: Story = {
  args: {
    accordion: true,
    defaultActiveKey: '1',
    children: [
      <CollapsePanel key="1" panelKey="1" title="Umumiy ma'lumot">
        iPhone 15 Pro Max - Apple kompaniyasining eng so'nggi flagman smartfoni. A17 Pro chipset, titanium ramka va USB-C port bilan jihozlangan.
      </CollapsePanel>,
      <CollapsePanel key="2" panelKey="2" title="Texnik xususiyatlar">
        Ekran: 6.7 dyuym Super Retina XDR OLED. Protsessor: A17 Pro. Xotira: 256GB / 512GB / 1TB.
      </CollapsePanel>,
      <CollapsePanel key="3" panelKey="3" title="Kafolat">
        1 yil rasmiy kafolat. GeekShop Verify orqali tekshirilgan original mahsulot.
      </CollapsePanel>,
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    children: [
      <CollapsePanel key="1" panelKey="1" title="Mavjud bo'lim">
        Bu bo'limni ochish va yopish mumkin.
      </CollapsePanel>,
      <CollapsePanel key="2" panelKey="2" title="O'chirilgan bo'lim" disabled>
        Bu kontent ko'rinmaydi.
      </CollapsePanel>,
      <CollapsePanel key="3" panelKey="3" title="Yana bir bo'lim">
        Bu ham ochiladi.
      </CollapsePanel>,
    ],
  },
};

export const WithExtra: Story = {
  args: {
    defaultActiveKey: ['faq1'],
    children: [
      <CollapsePanel key="faq1" panelKey="faq1" title="Buyurtma qanday beriladi?" extra={<Tag color="primary" size="sm">Mashhur</Tag>}>
        Mahsulotni tanlang, savatga qo'shing va to'lov sahifasiga o'ting. Manzilni kiriting va to'lov usulini tanlang.
      </CollapsePanel>,
      <CollapsePanel key="faq2" panelKey="faq2" title="Yetkazib berish qancha turadi?">
        Toshkent shahri bo'ylab bepul yetkazib berish. Viloyatlarga 15,000 so'mdan.
      </CollapsePanel>,
      <CollapsePanel key="faq3" panelKey="faq3" title="Mahsulotni qaytarish mumkinmi?" extra="14 kun">
        Ha, mahsulotni 14 kun ichida qaytarish mumkin. Shartlar: mahsulot ishlatilmagan, original qadoqda.
      </CollapsePanel>,
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState<string[]>(['panel1']);

    return (
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, color: '#999' }}>
          Active: {activeKey.join(', ') || 'none'}
        </div>
        <Collapse activeKey={activeKey} onChange={setActiveKey}>
          <CollapsePanel panelKey="panel1" title="Birinchi bo'lim">
            Birinchi bo'lim kontenti.
          </CollapsePanel>
          <CollapsePanel panelKey="panel2" title="Ikkinchi bo'lim">
            Ikkinchi bo'lim kontenti.
          </CollapsePanel>
          <CollapsePanel panelKey="panel3" title="Uchinchi bo'lim">
            Uchinchi bo'lim kontenti.
          </CollapsePanel>
        </Collapse>
      </div>
    );
  },
};

export const ProductSpecs: Story = {
  args: {
    accordion: true,
    defaultActiveKey: 'specs',
    children: [
      <CollapsePanel key="specs" panelKey="specs" title="Texnik xususiyatlar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#999' }}>Brend</span>
            <span>Apple</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#999' }}>Model</span>
            <span>iPhone 15 Pro Max</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#999' }}>Xotira</span>
            <span>256 GB</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#999' }}>Rang</span>
            <span>Natural Titanium</span>
          </div>
        </div>
      </CollapsePanel>,
      <CollapsePanel key="desc" panelKey="desc" title="Tavsif">
        Apple iPhone 15 Pro Max eng yangi A17 Pro protsessori bilan jihozlangan. Titanium korpus va 48MP kamera tizimi.
      </CollapsePanel>,
      <CollapsePanel key="reviews" panelKey="reviews" title="Sharhlar" extra="128 ta">
        Barcha sharhlarni ko'rish uchun pastga qarang.
      </CollapsePanel>,
    ],
  },
};
