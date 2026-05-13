'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const PLANS = [
  {
    name: 'Explorer',
    monthlyPrice: 2000,
    annualPrice: 20000,
    description: 'Start your AI-powered learning journey',
    features: [
      '2 knowledge domains',
      '30 AI tutor sessions/month',
      'Basic learner model',
      'Basic progress tracking',
      'Email support',
    ],
    notIncluded: [
      'Adaptive curriculum',
      'Spaced repetition',
      'Cross-domain transfer',
      'Offline mode',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 6000,
    annualPrice: 60000,
    description: 'The full Veyra experience — most popular',
    badge: 'Most Popular',
    features: [
      '10 knowledge domains',
      'Unlimited AI tutor sessions',
      'Full persistent learner model',
      'Adaptive curriculum',
      'Spaced repetition engine',
      'Detailed progress analytics',
      'Priority support',
    ],
    notIncluded: [
      'Cross-domain transfer',
      'Offline mode',
    ],
    highlighted: true,
  },
  {
    name: 'Elite',
    monthlyPrice: 15000,
    annualPrice: 150000,
    description: 'For serious learners who demand the best',
    features: [
      'Unlimited knowledge domains',
      'Unlimited AI tutor sessions',
      'Advanced cognitive modeling',
      'Adaptive curriculum',
      'Spaced repetition engine',
      'Cross-domain transfer',
      'Custom learning paths',
      'Deep analytics & insights',
      'Offline mode',
      'Dedicated support channel',
    ],
    notIncluded: [],
    highlighted: false,
  },
  {
    name: 'Mastery',
    monthlyPrice: 25000,
    annualPrice: 250000,
    description: 'The ultimate learning transformation',
    features: [
      'Everything in Elite',
      '4 one-on-one human expert sessions/month',
      'Custom curriculum design',
      'API access for integrations',
      'Early access to new features',
      'White-glove onboarding',
      'Guaranteed response times',
    ],
    notIncluded: [],
    highlighted: false,
  },
];

const FAQ = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'We offer a 14-day free trial on the Pro plan so you can experience the full Veyra system before committing.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets. All prices are in INR.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. Cancel anytime from your account settings. No hidden fees, no lock-in contracts.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your learner model and progress data are retained for 90 days after cancellation, giving you time to resubscribe without losing progress.',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN').format(price);
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Pricing</p>
            <h1 className="section-title">
              Invest in your{' '}
              <span className="text-gradient">growth</span>
            </h1>
            <p className="section-subtitle">
              Choose the plan that matches your learning ambition. All plans include access
              to Veyra&apos;s AI tutoring engine.
            </p>
          </motion.div>

          {/* Toggle */}
          <div className={styles.toggle}>
            <span className={!annual ? styles.toggleActive : ''}>Monthly</span>
            <button
              className={styles.toggleSwitch}
              onClick={() => setAnnual(!annual)}
              aria-label="Toggle billing period"
            >
              <span className={`${styles.toggleKnob} ${annual ? styles.toggleOn : ''}`} />
            </button>
            <span className={annual ? styles.toggleActive : ''}>
              Annual <span className={styles.saveBadge}>Save 17%</span>
            </span>
          </div>

          {/* Plans */}
          <motion.div
            className={styles.plans}
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                className={`${styles.planCard} ${plan.highlighted ? styles.highlighted : ''}`}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                {plan.badge && <span className={styles.badge}>{plan.badge}</span>}
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDesc}>{plan.description}</p>
                <div className={styles.price}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>
                    {formatPrice(annual ? plan.annualPrice : plan.monthlyPrice)}
                  </span>
                  <span className={styles.period}>/{annual ? 'year' : 'month'}</span>
                </div>
                <button className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} ${styles.planBtn}`}>
                  Get Started
                </button>
                <ul className={styles.featureList}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.3 4.3L6 11.6 2.7 8.3" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className={`${styles.featureItem} ${styles.notIncluded}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`section ${styles.faq}`}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Common questions</h2>
          </div>
          <div className={styles.faqList}>
            {FAQ.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={openFaq === i ? styles.faqOpen : ''}
                  >
                    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <motion.div
                    className={styles.faqAnswer}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
