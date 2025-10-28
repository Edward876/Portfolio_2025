import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { PageScaffold } from '../components/Sections';
import { getPostBySlug } from '../blogs/posts';
import CommentSection from '../components/CommentSection';
import './blog.css';

export default function BlogPost(){
  const { slug } = useParams();
  const post = useMemo(()=> getPostBySlug(slug), [slug]);

  // Clean markdown: remove YAML front matter and any leading metadata/placeholder headings
  const cleaned = useMemo(() => {
    if (!post?.content) return '';
    let s = post.content.trim();
    // strip YAML front matter --- ... --- at the start
    if (s.startsWith('---')) {
      const end = s.indexOf('\n---', 3);
      if (end !== -1) s = s.slice(end + 4).trimStart();
    }
    // remove standalone metadata lines accidentally left in content
    s = s
      .split('\n')
      .filter((line, idx) => {
        const L = line.trim();
        if (idx < 10) {
          if (/^(slug|title|date|excerpt)\s*:/i.test(L)) return false;
          if (/^#{1,6}\s*\*?\*?\s*Blog Title\s*:/i.test(L)) return false;
          if (/^#{1,6}\s*\*?\*?\s*Subtitle\s*:/i.test(L)) return false;
        }
        return true;
      })
      .join('\n')
      .replace(/^[-*_]{3,}\s*$/m, '');
    return s.trim();
  }, [post]);

  if(!post){
    return (
      <PageScaffold>
        <section className="section-pad" style={{ padding: '5rem 1rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h1 style={{ margin: 0 }}>Not found</h1>
            <p>The requested post does not exist.</p>
            <Link to="/blogs" style={{ textDecoration: 'none', color: 'inherit' }}>← Back to blogs</Link>
          </div>
        </section>
      </PageScaffold>
    );
  }

  return (
    <PageScaffold>
      <section className="section-pad" style={{ padding: '5rem 1rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="glass-panel blog-header">
            <div>
              <h1 style={{ margin: 0 }}>{post.title}</h1>
              <p style={{ opacity: 0.7, marginTop: 6 }}>{new Date(post.date).toLocaleDateString()}</p>
            </div>
            <div className="post-actions">
              <Link to="/" className="btn btn-ghost">Back home</Link>
              <Link to="/blogs" className="btn btn-primary">All blogs</Link>
            </div>
          </div>

          <article className="blog-content glass-panel" style={{ marginTop: 14 }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {cleaned}
            </ReactMarkdown>
          </article>

          <div className="glass-panel" style={{ marginTop: 14 }}>
            <CommentSection slug={post.slug} />
          </div>
        </div>
      </section>
    </PageScaffold>
  );
}
