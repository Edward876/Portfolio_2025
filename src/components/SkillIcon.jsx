import React from 'react';

const Svg = ({ children, size = 18, viewBox = '0 0 24 24' }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

export default function SkillIcon({ name, size = 18 }) {
  const n = String(name || '').toLowerCase();

  if (n.includes('javascript') || n === 'js') {
    return (
      <Svg size={size}>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E"/>
        <text x="7" y="16" fontFamily="ui-sans-serif, system-ui" fontSize="10" fontWeight="800" fill="#111">JS</text>
      </Svg>
    );
  }

  if (n.includes('node')) {
    return (
      <Svg size={size}>
        <path d="M12 2l8 4.6v9.2L12 20 4 15.8V6.6L12 2z" fill="#83CD29"/>
        <text x="9.5" y="14" fontFamily="ui-sans-serif, system-ui" fontSize="7" fontWeight="800" fill="#111">N</text>
      </Svg>
    );
  }

  if (n.includes('express')) {
    return (
      <Svg size={size}>
        <rect x="2" y="4" width="20" height="16" rx="3" fill="#e5e7eb"/>
        <text x="5" y="16" fontFamily="ui-sans-serif, system-ui" fontSize="8" fontWeight="700" fill="#111">Ex</text>
      </Svg>
    );
  }

  if (n.includes('python')) {
    return (
      <Svg size={size}>
        <path d="M12 3c2.2 0 3 .9 3 3v2H9c-1.3 0-2-.7-2-2V6c0-2 1.3-3 3-3h2z" fill="#3776AB"/>
        <path d="M12 21c-2.2 0-3-.9-3-3v-2h6c1.3 0 2 .7 2 2v0c0 2-1.3 3-3 3h-2z" fill="#FFD43B"/>
        <circle cx="14.5" cy="6.5" r="0.9" fill="#fff"/>
        <circle cx="9.5" cy="17.5" r="0.9" fill="#111"/>
      </Svg>
    );
  }

  if (n.includes('numpy') || n === 'np') {
    return (
      <Svg size={size}>
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#4D77CF"/>
        <text x="6" y="16" fontFamily="ui-sans-serif, system-ui" fontSize="8" fontWeight="800" fill="#fff">NP</text>
      </Svg>
    );
  }

  if (n.includes('pandas')) {
    return (
      <Svg size={size}>
        <rect x="5" y="4" width="3" height="16" rx="1.5" fill="#8A2BE2"/>
        <rect x="10.5" y="6" width="3" height="12" rx="1.5" fill="#DA70D6"/>
        <rect x="16" y="5" width="3" height="14" rx="1.5" fill="#8A2BE2"/>
      </Svg>
    );
  }

  if (n.includes('tensorflow') || n === 'tf') {
    return (
      <Svg size={size}>
        <path d="M4 8l8-4 8 4-3 1.5V18l-3-1.5V10l-2 1v5l-3-1.5V9.5L7 8v6L4 12V8z" fill="#FF6F00"/>
      </Svg>
    );
  }

  if (n.includes('pytorch')) {
    return (
      <Svg size={size}>
        <path d="M12 3l1.8 1.8a7.5 7.5 0 1 1-1.8 0z" fill="#EE4C2C"/>
        <circle cx="14.8" cy="5.2" r="1.1" fill="#EE4C2C"/>
      </Svg>
    );
  }

  if (n.includes('yolo')) {
    return (
      <Svg size={size}>
        <circle cx="12" cy="12" r="9" fill="#6366F1"/>
        <circle cx="12" cy="12" r="4" fill="#e2e8f0"/>
      </Svg>
    );
  }

  if (n.includes('kaggle')) {
    return (
      <Svg size={size}>
        <path d="M6 5v14h2v-5l6 5h3l-7-6 7-8h-3l-6 7V5H6z" fill="#20BEFF"/>
      </Svg>
    );
  }

  if (n.includes('linux')) {
    return (
      <Svg size={size}>
        <circle cx="12" cy="8" r="3" fill="#111"/>
        <ellipse cx="12" cy="15" rx="6" ry="5" fill="#111"/>
        <circle cx="10.8" cy="7.5" r="0.6" fill="#fff"/>
        <circle cx="13.2" cy="7.5" r="0.6" fill="#fff"/>
        <polygon points="12,9.2 11,10.5 13,10.5" fill="#F59E0B"/>
      </Svg>
    );
  }

  if (n.includes('opencv')) {
    return (
      <Svg size={size}>
        <circle cx="7.5" cy="8" r="3" fill="#E11D48"/>
        <circle cx="16.5" cy="8" r="3" fill="#22C55E"/>
        <circle cx="12" cy="16" r="3" fill="#3B82F6"/>
      </Svg>
    );
  }

  // default generic chip
  return (
    <Svg size={size}>
      <rect x="4" y="6" width="16" height="12" rx="2" fill="#94a3b8"/>
      <path d="M6 8h12v8H6z" fill="#0f172a" opacity="0.7"/>
    </Svg>
  );
}
