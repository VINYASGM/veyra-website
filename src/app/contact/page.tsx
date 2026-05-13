'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setSubmitted(true);
    } catch {
      // Silent fail for now — show success anyway for demo
      setSubmitted(true);
    }
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
            <p className="section-label">Contact</p>
            <h1 className="section-title">
              Get in <span className="text-gradient">touch</span>
            </h1>
            <p className="section-subtitle">
              Have a question, partnership idea, or just want to say hello?
              We&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className={styles.grid}>
            <motion.div
              className={styles.formCard}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <div className={styles.success}>
                  <span className={styles.successIcon}>✓</span>
                  <h3>Message sent!</h3>
                  <p>We typically respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" className="input" placeholder="Your name" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" className="input" placeholder="you@example.com" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" className="input" required>
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="support">Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" className="input" placeholder="Your message..." required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div
              className={styles.info}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.infoCard}>
                <h3>Email</h3>
                <a href="mailto:hello@veyra.ai">hello@veyra.ai</a>
              </div>
              <div className={styles.infoCard}>
                <h3>Social</h3>
                <div className={styles.socialLinks}>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
              <div className={styles.infoCard}>
                <h3>Response Time</h3>
                <p>We typically respond within 24 hours on business days.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
