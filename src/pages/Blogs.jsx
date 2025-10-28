import { Link } from 'react-router-dom';
import { posts } from '../blogs/posts';
import { PageScaffold } from '../components/Sections';
import '../index.css';
import './blog.css';

export default function Blogs() {
  return (
    <PageScaffold>
      <section className="section-pad" style={{ padding: '5rem 1rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div className="glass-panel" style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <h1 style={{ margin: 0, fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900 }}>Blogs</h1>
              <Link to="/" className="btn btn-primary">Back home</Link>
            </div>
            <p style={{ opacity: 0.9, margin: 0 }}>
              Explorations in computer vision, tooling, and build logs—fresh notes from projects in motion.
              Choose a post below to dive in.
            </p>
          </div>

          <div className="blogs-grid">
            {posts.map((p) => (
              <Link key={p.slug} to={`/blogs/${p.slug}`} className="glass-panel blog-card">
                <span className="blog-card__date">{new Date(p.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <h3 className="blog-card__title">{p.title}</h3>
                <p className="blog-card__excerpt">{p.excerpt}</p>
                <span className="blog-card__cta">Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageScaffold>
  );
}
