import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import './BlobCursor.css';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  // Prevent tween pile-ups on rapid move events
  useEffect(() => {
    gsap.defaults({ overwrite: 'auto' });
  }, []);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    e => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  useEffect(() => {
    const onMove = (e) => handleMove(e)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [handleMove])

  const isCoarsePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  return (
    <div ref={containerRef} className="blob-container" style={{ zIndex }}>
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div className="blob-main" style={{ filter: useFilter && !isCoarsePointer ? `url(#${filterId})` : undefined }}>
        {Array.from({ length: isCoarsePointer ? Math.min(1, trailCount) : trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => (blobsRef.current[i] = el)}
            className="blob"
            style={{
              width: isCoarsePointer ? Math.min(sizes[i] || sizes[0], 32) : sizes[i],
              height: isCoarsePointer ? Math.min(sizes[i] || sizes[0], 32) : sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${isCoarsePointer ? 4 : shadowOffsetX}px ${isCoarsePointer ? 4 : shadowOffsetY}px ${isCoarsePointer ? 4 : shadowBlur}px 0 ${shadowColor}`
            }}
          >
            <div
              className="inner-dot"
              style={{
                width: isCoarsePointer ? Math.min(innerSizes[i] || innerSizes[0], 10) : innerSizes[i],
                height: isCoarsePointer ? Math.min(innerSizes[i] || innerSizes[0], 10) : innerSizes[i],
                top: ( (isCoarsePointer ? Math.min(sizes[i] || sizes[0], 32) : sizes[i]) - (isCoarsePointer ? Math.min(innerSizes[i] || innerSizes[0], 10) : innerSizes[i]) ) / 2,
                left: ( (isCoarsePointer ? Math.min(sizes[i] || sizes[0], 32) : sizes[i]) - (isCoarsePointer ? Math.min(innerSizes[i] || innerSizes[0], 10) : innerSizes[i]) ) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
