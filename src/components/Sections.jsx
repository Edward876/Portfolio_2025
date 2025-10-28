import PixelBlast from './PixelBlast';
import DecryptText from './DecryptText';
import GitHubCard from './GitHubCard';
import GradualBlur from './GradualBlur';
import FuzzyText from './FuzzyText';
import siteConfig, { certificates } from '../config';
import TrueFocus from './TrueFocus';
import ScrambledText from './ScrambledText';
import SpotlightCard from './SpotlightCard';
import PixelCard from './PixelCard';
import ProfileCard from './ProfileCard';
import SkillIcon from './SkillIcon';
import './Sections.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const roles = siteConfig.roles;

const UnifiedBackground = () => (
  <PixelBlast
    variant="circle"
    pixelSize={6}
    color={siteConfig.accentColor}
    patternScale={3}
    patternDensity={1.15}
    pixelSizeJitter={0.45}
    enableRipples
    rippleSpeed={0.42}
    rippleThickness={0.12}
    rippleIntensityScale={1.35}
    liquid
    liquidStrength={0.11}
    liquidRadius={1.2}
    liquidWobbleSpeed={5}
    speed={0.6}
    edgeFade={0.2}
    transparent
  />
);

export const PageScaffold = ({ children }) => (
  <div style={{ position: 'relative', minHeight: '100vh' }}>
    <UnifiedBackground />
    {/* Reserve space at bottom for the fixed GradualBlur overlay (8rem) plus a bit of safety */}
    <main style={{ position: 'relative', zIndex: 1, paddingBottom: '10rem' }}>{children}</main>
  </div>
);

export const Hero = () => {
  const ASCII_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const KANA_SET = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789/+=-*';
  const [scrambleSet, setScrambleSet] = useState(ASCII_SET);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 820px)');
    const apply = () => setScrambleSet(mq.matches ? KANA_SET : ASCII_SET);
    apply();
    try {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    } catch {
      // Safari
      mq.addListener(apply);
      return () => mq.removeListener(apply);
    }
  }, []);

  return (
  <header className="hero" style={{ display: 'grid', placeItems: 'center', padding: '7rem 1rem 5rem' }}>
    <div className="hero-grid" style={{ maxWidth: 1100, width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>
      <div style={{ position: 'relative' }}>
        <div style={{ marginBottom: 8 }}>
          <FuzzyText fontSize={'clamp(1.6rem, 5vw, 3.2rem)'} fontWeight={800} color={'#eae7ff'} baseIntensity={0.1} hoverIntensity={0.28} paddingX={0} paddingY={0}>
            Hi, I’m
          </FuzzyText>
          <FuzzyText fontSize={'clamp(2.2rem, 8vw, 5rem)'} fontWeight={900} color={'#f5f4ff'} baseIntensity={0.1} hoverIntensity={0.32} paddingX={0} paddingY={0}>
            {siteConfig.name}
          </FuzzyText>
        </div>
        <div style={{ marginTop: 10, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#a7ffef', fontSize: 'clamp(1.1rem, 2.6vw, 1.5rem)' }}>
          <DecryptText
            items={roles}
            interval={2800}
            glitchDuration={1500}
            order="random"
            avoidImmediateRepeat
            startIndex={0}
            scrambleCharset={'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789/+=-*'}
          />
        </div>
        <div style={{ marginTop: 18, maxWidth: 680, opacity: 0.9, fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)' }}>
          <ScrambledText radius={16} duration={1.0} scrambleChars={'.:'}>
            A tech enthusiast and machine learning developer specializing in computer vision and convolutional neural
            networks (CNNs), I thrive on exploring new technologies and creating innovative solutions. Proficient in
            Python and experienced in programming languages like C and JavaScript, I have a passion for simplifying
            complex tasks. Having participated in three hackathons and actively contributing to projects on GitHub, I’m
            always eager to collaborate, learn, and share knowledge to drive impactful advancements in the tech world.
          </ScrambledText>
        </div>
        <div className="hero-actions" style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
          <a href="#contact" style={btnStylePrimary}>Contact</a>
          <a href="#works" style={btnStyleGhost}>View Work</a>
          <Link to="/blogs" style={{ ...btnStyleGhost, textDecoration: 'none' }}>Blogs</Link>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <div className="profile-card-wrap" style={{ width: 240 }}>
          <ProfileCard
            avatarUrl={siteConfig.avatarUrl}
            name={siteConfig.name}
            title={roles[0]}
            handle={siteConfig.github?.username || 'handle'}
            status="Online"
            contactText="Contact"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            className="compact"
            onContactClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </div>
    <GradualBlur target="page" position="bottom" height="8rem" strength={3} divCount={8} curve="bezier" exponential opacity={1}
      style={{
        // On narrow screens, reduce opacity to lighten GPU load without changing layout
        opacity: typeof window !== 'undefined' && window.innerWidth <= 480 ? 0.8 : 1
      }}
    />
  </header>
);
};

const btnStylePrimary = {
  padding: '10px 16px',
  borderRadius: 12,
  background: 'linear-gradient(120deg, #5f5bd6, #9d7cff)',
  color: '#0e0e14',
  fontWeight: 700,
  textDecoration: 'none',
  border: '1px solid #b19eef',
};

const btnStyleGhost = {
  padding: '10px 16px',
  borderRadius: 12,
  background: 'color-mix(in oklab, #0e0e14 60%, transparent)',
  color: '#e7e7ff',
  fontWeight: 700,
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.16)'
};

export const Works = ({ username = siteConfig.github.username, repos = siteConfig.github.repos }) => (
  <section id="works" className="section-pad" style={{ padding: '5rem 1rem' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 1.5rem', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900 }}>
        <TrueFocus
          sentence="My Works"
          borderColor={siteConfig.accentColor}
          animationDuration={0.6}
          pauseBetweenAnimations={1.1}
        />
      </h2>
      <p className="works-subtitle" style={{ marginTop: 0, opacity: 0.85 }}>Highlights from my GitHub repositories.</p>
      <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
        {repos.map((r) => (
          <GitHubCard key={r} repoFullName={`${username}/${r}`} />
        ))}
      </div>
    </div>
  </section>
);

export const SkillsCerts = () => (
  <section id="skills" className="section-pad" style={{ padding: '5rem 1rem' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 1.5rem', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900 }}>
        <TrueFocus
          sentence="Skills & Certificates"
          borderColor={siteConfig.accentColor}
          animationDuration={0.6}
          pauseBetweenAnimations={1.1}
        />
      </h2>
      <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 }}>
        {[
          'JavaScript','Node.js','Express','Python','NumPy','pandas','TensorFlow','PyTorch','YOLO','Kaggle','Linux','OpenCV'
        ].map((skill, i) => (
          <PixelCard key={skill} variant={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'yellow' : 'pink'}>
            <span className="pixel-skill-label">
              <SkillIcon name={skill} size={16} />
              <span className="pixel-skill-text">{skill}</span>
            </span>
          </PixelCard>
        ))}
      </div>
      <div className="certs-grid" style={{ marginTop: 22, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {certificates.map((c) => (
          <SpotlightCard key={c.title} spotlightColor="rgba(122, 110, 234, 0.18)">
            <strong>{c.title}</strong>
            <p style={{ margin: '6px 0 10px', opacity: 0.85 }}>{c.issuer}</p>
            <a href={c.url} target="_blank" rel="noreferrer" style={{
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.05)',
              color: 'inherit',
              textDecoration: 'none',
              display: 'inline-block'
            }}>View</a>
          </SpotlightCard>
        ))}
      </div>
    </div>
  </section>
);

export const Contact = () => (
  <section id="contact" className="section-pad" style={{ padding: '5rem 1rem 7rem' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 1.5rem', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900 }}>
        <TrueFocus
          sentence="Get in touch"
          borderColor={siteConfig.accentColor}
          animationDuration={0.6}
          pauseBetweenAnimations={1.1}
        />
      </h2>
      <p style={{ opacity: 0.9 }}>Open to collaborations, research, and freelance. Reach me via:</p>
      <div className="contact-links" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 18 }}>
        {siteConfig.contacts?.whatsapp && (
          <a
            href={`https://wa.me/${siteConfig.contacts.whatsapp.replace(/[^\\d]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            style={{ ...btnStylePrimary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.91 11.91 0 0 0 12.01 0C5.38 0 .01 5.37.01 12c0 2.12.56 4.17 1.62 5.97L0 24l6.18-1.61A11.9 11.9 0 0 0 12 24c6.63 0 12.01-5.37 12.01-12s-5.38-12-12.01-12Zm0 0" fill="none"/><path d="M12.01 2.3c5.37 0 9.71 4.35 9.71 9.71s-4.34 9.71-9.71 9.71c-1.67 0-3.27-.42-4.68-1.22l-.33-.19-3.66.95.98-3.56-.2-.34A9.69 9.69 0 0 1 2.3 12C2.3 6.65 6.65 2.3 12 2.3Zm5.62 13.54c-.24.67-1.19 1.23-1.65 1.3-.42.07-.97.1-1.57-.1-.36-.11-.82-.27-1.41-.53-2.47-1.07-4.08-3.57-4.2-3.74-.12-.17-1-1.33-1-2.54 0-1.2.63-1.79.85-2.03.22-.24.48-.3.64-.3h.46c.15 0 .35-.05.55.42.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.17-.12.26-.25.4-.12.14-.26.31-.37.42-.12.12-.24.25-.1.49.14.24.62 1.01 1.33 1.64.92.82 1.69 1.08 1.93 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.39.65 1.63.77.24.12.4.18.46.28.06.1.06.59-.18 1.26Z"/></svg>
            WhatsApp
          </a>
        )}
        {siteConfig.contacts?.instagram && (
          <a
            href={siteConfig.contacts.instagram.startsWith('http') ? siteConfig.contacts.instagram : `https://instagram.com/${siteConfig.contacts.instagram}`}
            target="_blank"
            rel="noreferrer"
            style={{ ...btnStyleGhost, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z"/><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zM17.5 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg>
            Instagram
          </a>
        )}
        {siteConfig.contacts?.linkedin && (
          <a
            href={siteConfig.contacts.linkedin.startsWith('http') ? siteConfig.contacts.linkedin : `https://www.linkedin.com/in/${siteConfig.contacts.linkedin}`}
            target="_blank"
            rel="noreferrer"
            style={{ ...btnStyleGhost, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 5 2.12 5 3.5zM0 8.98h5V24H0zM8.98 8.98H14v2.05h.07c.7-1.33 2.4-2.73 4.94-2.73 5.28 0 6.25 3.48 6.25 8V24h-5v-6.9c0-1.64-.03-3.76-2.29-3.76-2.3 0-2.65 1.8-2.65 3.65V24h-5z"/></svg>
            LinkedIn
          </a>
        )}
        {siteConfig.contacts?.github && (
          <a
            href={siteConfig.contacts.github}
            target="_blank"
            rel="noreferrer"
            style={{ ...btnStyleGhost, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0012 0z"/></svg>
            GitHub
          </a>
        )}
        {(siteConfig.contacts?.email || siteConfig.contactEmail) && (
          <a
            href={`mailto:${siteConfig.contacts?.email || siteConfig.contactEmail}`}
            style={{ ...btnStyleGhost, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z"/></svg>
            Gmail
          </a>
        )}
      </div>
    </div>
  </section>
);

const inputStyle = {
  padding: '12px 14px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(10,10,20,0.6)',
  color: 'inherit'
};

export default function Sections() {
  return (
    <PageScaffold>
      <Hero />
      <Works />
      <SkillsCerts />
      <Contact />
    </PageScaffold>
  );
}
