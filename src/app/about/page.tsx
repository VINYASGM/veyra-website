'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

const EXPERTISE = [
  {
    icon: '🧬',
    area: 'AI Research',
    description: 'Deep expertise in large language models, reinforcement learning from human feedback, and adaptive decision systems.',
  },
  {
    icon: '🧠',
    area: 'Cognitive Science',
    description: 'Research-backed understanding of memory consolidation, metacognition, zone of proximal development, and knowledge transfer.',
  },
  {
    icon: '📚',
    area: 'Education Design',
    description: 'Decades of combined experience in curriculum design, pedagogical theory, and evidence-based instructional methods.',
  },
  {
    icon: '⚡',
    area: 'Software Engineering',
    description: 'Production-grade systems built for scale, reliability, and real-time adaptive performance across all platforms.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Mission */}
      <section className={`section ${styles.mission}`}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Our Mission</p>
            <h1 className="section-title">
              Making expert tutoring{' '}
              <span className="text-gradient">accessible to every learner</span>
            </h1>
          </motion.div>

          <motion.div
            className={styles.missionContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p>
              To make expert-level, personalized tutoring accessible to every learner — while
              building the <strong>metacognitive skills</strong> to learn anything, independently, for life.
            </p>
            <p>
              Human tutoring is the gold standard in education. One-on-one instruction produces
              outcomes two standard deviations above classroom averages. But it doesn&apos;t scale,
              doesn&apos;t persist across domains, and cannot maintain perfect memory.
            </p>
            <p>
              Veyra collapses four historically separate functions — <em>assessment, curriculum
              design, instruction, and adaptation</em> — into one continuous loop. The result is an
              AI that echoes expert tutor quality at infinite scale, with perfect memory, available 24/7.
            </p>
            <p>
              But we go further. Veyra doesn&apos;t just teach you content — it trains your
              <strong> metacognitive abilities</strong>: calibration (knowing what you know and don&apos;t
              know), self-monitoring, strategic planning, and epistemic humility. The goal isn&apos;t
              dependency on Veyra — it&apos;s building learners who can learn anything on their own.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className={`section ${styles.vision}`}>
        <div className="container">
          <motion.div
            className={styles.visionCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Our Vision</p>
            <h2 className={styles.visionTitle}>
              A world where education continuously adapts to you —{' '}
              <span className="text-gradient">not the other way around.</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* What Makes Veyra Different */}
      <section className={`section ${styles.different}`}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">What Makes Us Different</p>
            <h2 className="section-title">
              Not another course platform.{' '}
              <span className="text-gradient">A cognitive partner.</span>
            </h2>
          </motion.div>

          <motion.div
            className={styles.diffGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                title: 'Persistent Model',
                desc: 'Unlike apps that reset each session, Veyra maintains a continuous, evolving model of your knowledge state — forever.',
              },
              {
                title: 'Metacognitive Growth',
                desc: 'We don\'t just fill knowledge gaps. We train the underlying cognitive machinery — your ability to self-assess, plan, and transfer learning.',
              },
              {
                title: 'Sequential Decisions',
                desc: 'Every pedagogical decision — what to teach, how, when to revisit — is optimized for long-term skill acquisition, not short-term engagement.',
              },
              {
                title: 'Cross-Domain Intelligence',
                desc: 'Learning physics helps your programming. Veyra detects and leverages transfer opportunities across your entire knowledge graph.',
              },
            ].map((item) => (
              <motion.div key={item.title} className="card" variants={fadeUp} transition={{ duration: 0.5 }}>
                <h3 className={styles.diffTitle}>{item.title}</h3>
                <p className={styles.diffDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
      <section className={`section ${styles.expertise}`}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Our Expertise</p>
            <h2 className="section-title">
              Built by people who{' '}
              <span className="text-gradient">understand learning</span>
            </h2>
          </motion.div>

          <motion.div
            className={styles.expertiseGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {EXPERTISE.map((item) => (
              <motion.div key={item.area} className="card" variants={fadeUp} transition={{ duration: 0.5 }}>
                <span className={styles.expertiseIcon}>{item.icon}</span>
                <h3 className={styles.expertiseArea}>{item.area}</h3>
                <p className={styles.expertiseDesc}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
