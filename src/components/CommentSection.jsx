import { useEffect, useMemo, useState } from 'react';

function storageKey(slug){
  return `comments:${slug}`;
}

export default function CommentSection({ slug }){
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(slug));
      setComments(raw ? JSON.parse(raw) : []);
    } catch {
      setComments([]);
    }
  }, [slug]);

  const valid = useMemo(() => name.trim().length >= 2 && text.trim().length >= 2, [name, text]);

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const entry = { name: name.trim(), text: text.trim(), ts: Date.now() };
    const next = [entry, ...comments];
    setComments(next);
    try {
      localStorage.setItem(storageKey(slug), JSON.stringify(next));
    } catch {}
    setText('');
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ margin: '0 0 10px' }}>Comments</h3>
      <form onSubmit={submit} style={{ display: 'grid', gap: 10, maxWidth: 640 }}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(10,10,20,0.6)', color: 'inherit' }}
        />
        <textarea
          rows={4}
          placeholder="Write a comment..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
          style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(10,10,20,0.6)', color: 'inherit', resize: 'vertical' }}
        />
        <button disabled={!valid} style={{
          padding: '10px 14px', borderRadius: 12, fontWeight: 800,
          background: valid ? 'linear-gradient(120deg, #5f5bd6, #9d7cff)' : 'rgba(255,255,255,0.15)',
          color: '#0e0e14', border: '1px solid #b19eef', cursor: valid ? 'pointer' : 'not-allowed', width: 'fit-content'
        }}>Post</button>
      </form>

      <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
        {comments.length === 0 && <p style={{ opacity: 0.8 }}>No comments yet. Be the first to comment.</p>}
        {comments.map((c, idx) => (
          <div key={idx} style={{
            border: '1px solid rgba(255,255,255,0.14)', borderRadius: 10, padding: 12,
            background: 'rgba(255,255,255,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <strong>{c.name}</strong>
              <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>{new Date(c.ts).toLocaleString()}</span>
            </div>
            <p style={{ margin: '6px 0 0' }}>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
