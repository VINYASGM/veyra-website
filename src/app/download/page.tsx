'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const PLATFORMS = [
  {
    name: 'Windows',
    icon: '🪟',
    requirements: 'Windows 10+ (64-bit), 4GB RAM, 500MB disk space',
  },
  {
    name: 'macOS',
    icon: '🍎',
    requirements: 'macOS 12+ (Monterey), Apple Silicon or Intel, 4GB RAM',
  },
  {
    name: 'Linux',
    icon: '🐧',
    requirements: 'Ubuntu 20.04+, Fedora 35+, or Debian 11+, 4GB RAM',
  },
  {
    name: 'Android',
    icon: '📱',
    requirements: 'Android 10+, 3GB RAM, 200MB storage',
  },
  {
    name: 'iOS',
    icon: '📱',
    requirements: 'iOS 16+, iPhone 11 or later, iPad (8th gen+)',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function DownloadPage() {
  const [email, setEmail] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this would save to Firebase or Formspree
    setSubmitted(true);
  }

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
            <p className="section-label">Coming Soon</p>
            <h1 className="section-title">
              <span className="text-gradient">Veyra</span> is being built
            </h1>
            <p className="section-subtitle">
              We&apos;re crafting something extraordinary. Join the waitlist to be first in
              line when we launch on your platform.
            </p>
          </motion.div>

          <motion.div
            className={styles.platforms}
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {PLATFORMS.map((platform) => (
              <motion.button
                key={platform.name}
                className={`${styles.platformCard} ${selectedPlatform === platform.name ? styles.selected : ''}`}
                onClick={() => setSelectedPlatform(platform.name)}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
              >
                <span className={styles.platformIcon}>{platform.icon}</span>
                <h3 className={styles.platformName}>{platform.name}</h3>
                <p className={styles.platformReqs}>{platform.requirements}</p>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className={styles.waitlist}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>✓</span>
                <h3>You&apos;re on the list!</h3>
                <p>We&apos;ll notify you when Veyra launches{selectedPlatform ? ` on ${selectedPlatform}` : ''}.</p>
              </div>
            ) : (
              <form className={styles.waitlistForm} onSubmit={handleSubmit}>
                <h3 className={styles.waitlistTitle}>Join the waitlist</h3>
                <p className={styles.waitlistSubtitle}>
                  Get early access and be the first to know when we launch.
                </p>
                <div className={styles.waitlistRow}>
                  <input
                    type="email"
                    className="input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Notify Me
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
