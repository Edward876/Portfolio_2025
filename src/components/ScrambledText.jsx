import React, { useEffect, useMemo, useRef } from 'react';
import './ScrambledText.css';

// Lightweight scramble effect inspired by GSAP example
// Avoids premium plugins by doing our own per-char animation
const ScrambledText = ({
  radius = 100,
  duration = 1.2, // seconds
  speed = 0.5, // not used directly; kept for API parity
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef(null);
  const charRefs = useRef([]);
  const animMap = useRef(new Map()); // span -> { endAt, orig }
  const rafRef = useRef(0);

  const text = useMemo(() => {
    if (typeof children === 'string') return children;
    try {
      return React.Children.toArray(children).join('');
    } catch {
      return String(children ?? '');
    }
  }, [children]);

  // Split into words to prevent mid-word wrapping; preserve spaces as separate entries
  const words = useMemo(() => {
    const parts = text.split(/(\s+)/); // keep spaces
    return parts.map((part) => ({
      isSpace: /^\s+$/.test(part),
      chars: part.split('')
    }));
  }, [text]);

  useEffect(() => {
    const spans = charRefs.current;
    spans.forEach((span) => {
      if (span) {
        span.dataset.orig = span.textContent;
      }
    });
  }, [words]);

  useEffect(() => {
    const tick = () => {
      const now = performance.now();
      const toDelete = [];
      animMap.current.forEach((state, el) => {
        if (!el) {
          toDelete.push(el);
          return;
        }
        const remaining = state.endAt - now;
        if (remaining <= 0) {
          el.textContent = state.orig;
          toDelete.push(el);
        } else {
          // show random char
          const rand = scrambleChars.charAt(
            Math.floor(Math.random() * scrambleChars.length)
          );
          el.textContent = rand || state.orig;
        }
      });
      toDelete.forEach((el) => animMap.current.delete(el));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrambleChars]);

  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;
    const handleMove = (e) => {
      const spans = charRefs.current;
      spans.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          const factor = 1 - dist / radius; // closer -> longer scramble
          const endAt = performance.now() + duration * 1000 * factor;
          const orig = el.dataset.orig ?? el.textContent;
          animMap.current.set(el, { endAt, orig });
        }
      });
    };
    container.addEventListener('pointermove', handleMove);
    return () => container.removeEventListener('pointermove', handleMove);
  }, [radius, duration]);

  return (
    <div ref={rootRef} className={`scramble-block ${className}`} style={style}>
      <p style={{ wordBreak: 'normal', overflowWrap: 'anywhere' }}>
        {words.map((w, wi) =>
          w.isSpace ? (
            // preserve original spaces
            <span key={`sp-${wi}`} aria-hidden="true">{w.chars.join('')}</span>
          ) : (
            <span key={`w-${wi}`} className="scramble-word">
              {w.chars.map((ch, ci) => (
                <span
                  key={`c-${wi}-${ci}`}
                  ref={(el) => (charRefs.current[`${wi}-${ci}`] = el)}
                  className="scramble-char"
                >
                  {ch}
                </span>
              ))}
            </span>
          )
        )}
      </p>
    </div>
  );
};

export default ScrambledText;
