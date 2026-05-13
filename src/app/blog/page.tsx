import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on AI tutoring, metacognition, adaptive learning, and the future of education from the Veyra team.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className={styles.page}>
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Blog</p>
            <h1 className="section-title">
              Insights on{' '}
              <span className="text-gradient">learning & AI</span>
            </h1>
            <p className="section-subtitle">
              Explore the science behind adaptive learning, metacognition, and how AI is
              transforming education.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
                  <div className={styles.postMeta}>
                    <span>{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <span className={styles.readMore}>Read more →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
