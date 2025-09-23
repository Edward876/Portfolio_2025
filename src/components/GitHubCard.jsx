import { useEffect, useState } from 'react';
import ElectricBorder from './ElectricBorder';
import siteConfig, { projectDescriptions } from '../config';

const fetchRepo = async (fullName) => {
  const r = await fetch(`https://api.github.com/repos/${fullName}`);
  if (!r.ok) throw new Error('GitHub API error');
  return r.json();
};

const fetchLanguages = async (fullName) => {
  const r = await fetch(`https://api.github.com/repos/${fullName}/languages`);
  if (!r.ok) return null;
  return r.json();
};

const GitHubCard = ({ repoFullName }) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [langs, setLangs] = useState(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const d = await fetchRepo(repoFullName);
        if (!alive) return;
        setData(d);
        const l = await fetchLanguages(repoFullName);
        if (!alive) return;
        setLangs(l);
      } catch (e) {
        if (alive) setErr(e.message);
      }
    })();
    return () => { alive = false; };
  }, [repoFullName]);

  return (
    <ElectricBorder color="#7df9ff" speed={1} chaos={0.6} thickness={2} style={{ borderRadius: 14 }}>
      <a
        href={data?.html_url || `https://github.com/${repoFullName}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: 'inherit', textDecoration: 'none', display: 'block', borderRadius: 12 }}
      >
  <div style={{ padding: 14, background: 'color-mix(in oklab, #0a0a12 80%, transparent)', borderRadius: 12 }}>
          {!data && !err && <p style={{ opacity: 0.7 }}>Loading {repoFullName}…</p>}
          {err && <p style={{ color: '#f88' }}>{err}</p>}
          {data && (
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, alignItems: 'start' }}>
              <img src={data.owner?.avatar_url} alt={data.owner?.login} style={{ width: 40, height: 40, borderRadius: 8 }} />
              <div>
                <h3 style={{ margin: '2px 0 4px', fontSize: 18 }}>{data.full_name}</h3>
                <p style={{ margin: 0, opacity: 0.85, fontSize: 14, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {projectDescriptions?.[data.full_name] || data.description || 'No description'}
                </p>
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {langs && Object.keys(langs).slice(0, 6).map((k) => (
                    <span key={k} style={{ padding: '4px 8px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.04)', fontSize: 12, opacity: 0.9 }}>
                      {k}
                    </span>
                  ))}
                </div>
                <p style={{ margin: '8px 0 0', fontSize: 12, opacity: 0.75 }}>
                  ★ {data.stargazers_count} • ⑂ {data.forks_count} • {data.language}
                </p>
              </div>
            </div>
          )}
        </div>
      </a>
    </ElectricBorder>
  );
};

export default GitHubCard;
