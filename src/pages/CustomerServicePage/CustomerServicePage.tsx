import { useState, useCallback, useRef, useEffect } from 'react';
import { NavBar, Container, Input, Button, Chip, Avatar, useGeekShop } from '../../components';
import styles from './CustomerServicePage.module.scss';

/* ---------- Icons ---------- */

const SendIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const OrderIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const PaymentIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const ReturnIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);

const DeliveryIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* ---------- Types ---------- */

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/* ---------- FAQ chips data ---------- */

const faqChips = [
  { key: 'orderStatus', icon: <OrderIcon />, labelKey: 'customerService.orderStatus' },
  { key: 'paymentIssue', icon: <PaymentIcon />, labelKey: 'customerService.paymentIssue' },
  { key: 'returnItem', icon: <ReturnIcon />, labelKey: 'customerService.returnItem' },
  { key: 'deliveryInfo', icon: <DeliveryIcon />, labelKey: 'customerService.deliveryInfo' },
];

/* ---------- Component ---------- */

export interface CustomerServicePageProps {
  /** Whether to show example messages */
  hasMessages?: boolean;
}

export const CustomerServicePage: React.FC<CustomerServicePageProps> = ({ hasMessages = true }) => {
  const { t } = useGeekShop();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'bot-greeting',
      type: 'bot',
      text: t('customerService.greeting'),
      timestamp: '14:00',
    },
  ];

  const exampleMessages: ChatMessage[] = hasMessages
    ? [
        {
          id: 'user-1',
          type: 'user',
          text: t('customerService.userMessage'),
          timestamp: '14:02',
        },
        {
          id: 'bot-1',
          type: 'bot',
          text: t('customerService.botReply'),
          timestamp: '14:02',
          action: {
            label: t('customerService.trackOrder'),
            onClick: () => {},
          },
        },
      ]
    : [];

  const [messages, setMessages] = useState<ChatMessage[]>([...initialMessages, ...exampleMessages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString('uz-UZ', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot reply
    setTimeout(() => {
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        text: t('customerService.greeting'),
        timestamp: new Date().toLocaleTimeString('uz-UZ', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  }, [inputValue, t]);

  const handleFaqChip = useCallback(
    (chipKey: string) => {
      const chip = faqChips.find((c) => c.key === chipKey);
      if (!chip) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        text: t(chip.labelKey),
        timestamp: new Date().toLocaleTimeString('uz-UZ', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, userMsg]);
    },
    [t]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className={styles.page}>
      {/* NavBar */}
      <NavBar title={t('page.customerService')} showBack onBack={() => {}} />

      {/* Messages area */}
      <div className={styles.messagesArea}>
        <Container>
          {/* Bot intro */}
          <div className={styles.botIntro}>
            <Avatar
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=64&h=64&fit=crop"
              alt={t('customerService.botName')}
              size="lg"
            />
            <span className={styles.botName}>{t('customerService.botName')}</span>
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageRow} ${
                msg.type === 'user' ? styles.messageUser : styles.messageBot
              }`}
            >
              <div
                className={`${styles.bubble} ${
                  msg.type === 'user' ? styles.bubbleUser : styles.bubbleBot
                }`}
              >
                <p className={styles.bubbleText}>{msg.text}</p>
                {msg.action && (
                  <button type="button" className={styles.actionBtn} onClick={msg.action.onClick}>
                    {msg.action.label}
                  </button>
                )}
              </div>
              <span className={styles.timestamp}>{msg.timestamp}</span>
            </div>
          ))}

          {/* FAQ chips (shown after greeting) */}
          {messages.length <= 1 && (
            <div className={styles.faqSection}>
              <span className={styles.faqTitle}>{t('customerService.faqTitle')}</span>
              <div className={styles.faqGrid}>
                {faqChips.map((chip) => (
                  <Chip
                    key={chip.key}
                    label={t(chip.labelKey)}
                    icon={chip.icon}
                    variant="outlined"
                    size="md"
                    onSelect={() => handleFaqChip(chip.key)}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </Container>
      </div>

      {/* Input bar */}
      <div className={styles.inputBar}>
        <div className={styles.inputWrap}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('customerService.inputPlaceholder')}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={!inputValue.trim()}
          aria-label={t('customerService.send')}
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
};
