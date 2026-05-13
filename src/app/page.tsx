'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SceneWrapper from '@/components/three/SceneWrapper';
import styles from './page.module.css';

const FEATURES = [
  {
    icon: '🧠',
    title: 'Persistent Learner Model',
    description: 'Veyra remembers everything — your strengths, gaps, pace, and patterns — and evolves its model of you across every session.',
  },
  {
    icon: '🎯',
    title: 'Adaptive Curriculum',
    description: 'No two learners get the same path. Veyra sequences topics, difficulty, and challenge timing to match your exact zone of proximal development.',
  },
  {
    icon: '🔄',
    title: 'Metacognitive Training',
    description: 'Beyond teaching content, Veyra trains you to learn. It builds calibration, self-monitoring, and strategic thinking as core skills.',
  },
  {
    icon: '⏱️',
    title: 'Spaced Repetition Engine',
    description: 'Scientifically-timed reviews that fight the forgetting curve. Veyra schedules revisits exactly when your memory needs reinforcement.',
  },
  {
    icon: '🌐',
    title: 'Cross-Domain Transfer',
    description: 'Knowledge connects. Veyra identifies when skills from one domain accelerate mastery in another and leverages those bridges.',
  },
  {
    icon: '📊',
    title: 'Real-Time Analytics',
    description: 'Deep insight into your learning trajectory — not just what you\'ve covered, but how well you truly understand it.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Veyra Learns You',
    description: 'Through targeted assessment, Veyra builds a cognitive profile — mapping your knowledge state, learning style, and goals.',
  },
  {
    step: '02',
    title: 'Your Curriculum Adapts',
    description: 'Every lesson, exercise, and challenge is sequenced in real-time based on your evolving model. No fixed syllabus.',
  },
  {
    step: '03',
    title: 'You Grow, Veyra Evolves',
    description: 'As you develop, your model deepens. Veyra\'s decisions get sharper. The loop never stops — because learning never stops.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <SceneWrapper />
        <div className={styles.heroOverlay} />
        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p className={styles.heroLabel} variants={fadeUp}>
            AI-Powered Lifelong Tutoring
          </motion.p>
          <motion.h1 className={styles.heroTitle} variants={fadeUp}>
            Your Mind,{' '}
            <span className="text-gradient">Infinitely Augmented</span>
          </motion.h1>
          <motion.p className={styles.heroSubtitle} variants={fadeUp}>
            A persistent AI tutor that knows how you think, adapts to how you learn,
            and evolves with you — for life.
          </motion.p>
          <motion.div className={styles.heroCtas} variants={fadeUp}>
            <Link href="/signup" className="btn btn-primary btn-lg">
              Get Early Access
            </Link>
            <Link href="#features" className="btn btn-secondary btn-lg">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className={`section ${styles.features}`}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Capabilities</p>
            <h2 className="section-title">
              Everything a great tutor does.{' '}
              <span className="text-gradient">At infinite scale.</span>
            </h2>
            <p className="section-subtitle">
              Veyra collapses assessment, curriculum design, instruction, and adaptation
              into one continuous loop — delivering expert tutoring quality to every learner.
            </p>
          </motion.div>

          <motion.div
            className={styles.featureGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {FEATURES.map((feature) => (
              <motion.div key={feature.title} className="card" variants={fadeUp} transition={{ duration: 0.5 }}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={`section ${styles.howItWorks}`}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">How It Works</p>
            <h2 className="section-title">
              Three steps to{' '}
              <span className="text-gradient">transformative learning</span>
            </h2>
          </motion.div>

          <motion.div
            className={styles.steps}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {HOW_IT_WORKS.map((item) => (
              <motion.div key={item.step} className={styles.step} variants={fadeUp} transition={{ duration: 0.5 }}>
                <span className={styles.stepNumber}>{item.step}</span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={`section ${styles.stats}`}>
        <div className="container">
          <motion.div
            className={styles.statsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { value: '500-600×', label: 'Faster adaptation than fixed curricula' },
              { value: '∞', label: 'Perfect memory across every session' },
              { value: '24/7', label: 'Expert tutoring, always available' },
              { value: '1:1', label: 'Truly personalized instruction' },
            ].map((stat) => (
              <motion.div key={stat.label} className={styles.stat} variants={fadeUp}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <motion.div
            className={styles.ctaCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>
              Ready to transform{' '}
              <span className="text-gradient">how you learn?</span>
            </h2>
            <p className={styles.ctaSubtitle}>
              Join the waitlist and be the first to experience AI tutoring that truly understands you.
            </p>
            <Link href="/download" className="btn btn-primary btn-lg">
              Join the Waitlist
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
