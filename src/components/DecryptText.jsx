import { useEffect, useRef, useState } from 'react';
import './DecryptText.css';

// Use ASCII-only scramble characters to avoid font fallback that can change line-height
const ASCII_SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}<>?/|-=+';

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DecryptText = ({
  items = [],
  interval = 1800,
  glitchDuration = 900,
  order = 'sequential', // 'sequential' | 'random'
  avoidImmediateRepeat = true,
  startIndex,
  className,
  style,
  scrambleCharset
}) => {
  const [ix, setIx] = useState(0);
  const [out, setOut] = useState('');
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const fromRef = useRef('');
  const toRef = useRef('');

  useEffect(() => {
    if (!items.length) return;
    let tSwitch;
    const chooseNextIndex = (current) => {
      if (order === 'random') {
        if (items.length === 1) return 0;
        let next;
        do {
          next = Math.floor(Math.random() * items.length);
        } while (avoidImmediateRepeat && next === current);
        return next;
      }
      // default sequential
      return (current + 1) % items.length;
    };
    const loop = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / glitchDuration);
      const len = Math.max(fromRef.current.length, toRef.current.length);
      let res = '';
      for (let i = 0; i < len; i++) {
        const reveal = i / len <= p;
        const target = toRef.current[i] || '';
        if (reveal) res += target;
        else {
          const pool = scrambleCharset && scrambleCharset.length ? scrambleCharset : ASCII_SCRAMBLE;
          res += pool[randRange(0, pool.length - 1)] || ' ';
        }
      }
      setOut(res);
      if (p < 1) rafRef.current = requestAnimationFrame(loop);
    };

    const setNext = () => {
      const nextIx = chooseNextIndex(ix);
      fromRef.current = out;
      toRef.current = items[nextIx];
      startRef.current = 0;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(loop);
      setIx(nextIx);
      tSwitch = setTimeout(setNext, interval);
    };

    // init first target
    if (!out) {
      const initialIndex =
        typeof startIndex === 'number' && startIndex >= 0 && startIndex < items.length
          ? startIndex
          : (order === 'random' ? Math.floor(Math.random() * items.length) : 0);
      fromRef.current = '';
      toRef.current = items[initialIndex];
      startRef.current = 0;
      rafRef.current = requestAnimationFrame(loop);
      setIx(initialIndex);
      tSwitch = setTimeout(setNext, interval);
    } else {
      tSwitch = setTimeout(setNext, interval);
    }

    return () => {
      if (tSwitch) clearTimeout(tSwitch);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, interval, glitchDuration, order, avoidImmediateRepeat, startIndex]);

  const cn = ["decrypt-text", className].filter(Boolean).join(' ');
  return (
    <span className={cn} style={style} aria-live="polite">{out}</span>
  );
};

export default DecryptText;
