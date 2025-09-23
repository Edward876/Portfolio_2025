// Central site configuration for easy personalization
// Update these values to customize your portfolio

const siteConfig = {
  name: 'Supratim Saha',
  roles: [
    'MACHINE LEARNING ENTHUSIAST',
    'AI/ML DEV',
    'PYTHON DEV',
    'JAVASCRIPT USER',
    'COMPUTER VISION EXPLORER',
    'CNN TINKERER',
    'OPEN‑SOURCE CONTRIBUTOR',
    'HACKATHON SPRINTER',
    'RESEARCH CURIOUS',
    'CREATIVE CODER'
  ],
  github: {
    username: 'Edward876',
    repos: ['brain-tumor-classifier', 'Shinichi-Bot-Telegram', 'Rebound', 'Algometric-Toolkit'] // user-specified repos
  },
  contactEmail: 'supratimsaha876@gmail.com',
  contacts: {
    // Provide your details; buttons render only if a value exists
    whatsapp: '+918509511195', // E.164 digits only e.g., '15551234567'
    instagram: 'https://www.instagram.com/k.__shinichi?igsh=MTl1bGpxZ2U2ZXhueA==',
    linkedin: 'https://www.linkedin.com/in/supratim-saha-548399233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    email: 'supratimsaha876@gmail.com',
    github: 'https://github.com/Edward876'
  },
  avatarUrl: 'https://github.com/Edward876.png',
  accentColor: '#7a6eea'
};

// Optional: rich, curated descriptions for project cards
export const projectDescriptions = {
  'Edward876/brain-tumor-classifier':
    'Deep‑learning brain tumor detection across MRI and CT modalities using MobileNet transfer learning. Includes a full preprocessing pipeline (normalization, resizing, dataset splits) and combines MRI+CT predictions for stronger consensus. Trained models and notebook workflows are provided for reproducible evaluation and single‑image inference.',
  'Edward876/Shinichi-Bot-Telegram':
    'A Java‑based Telegram bot for everyday media and learning workflows. Supports Pinterest image fetch, YouTube video/audio, Instagram reels/photos, free Udemy course discovery, and a books search/download flow—packaged behind friendly chat commands for fast results.',
  'Edward876/Rebound':
    'AI‑powered medical rehab assistant for athletes: symptom‑based injury detection, recovery time prediction, and tailored exercise guidance. Built with React + TypeScript + Tailwind; pairs structured data pipelines (Pathway) with fast LLM augmentation (Groq). Models and demos are deployed via HuggingFace Spaces.',
  'Edward876/Algometric-Toolkit':
    'A modern, cyberpunk‑styled toolkit to learn algorithms visually. Step through sorting, dynamic programming, and tree algorithms with play/pause, speed control, custom inputs, and detailed explanations—designed for clarity and teaching.'
};

// Certificates to render in the Skills & Certificates section
export const certificates = [
  {
    title: 'Programming in C++: A Hands-on Introduction',
    issuer: 'Codio',
    url: 'https://coursera.org/share/0ba546b56d701e4a0fcb4598f3e1308e'
  },
  {
    title: 'Algorithmic Toolbox',
    issuer: 'University of California San Diego',
    url: 'https://coursera.org/share/bec12be05551f793a4691deb4287a0ca'
  },
  {
    title: 'Operating Systems and You: Becoming a Power User',
    issuer: 'Google',
    url: 'https://coursera.org/share/4d81d69bc2af42d9fb3c7c508398030e'
  },
  {
    title: 'Neural Networks and Deep Learning',
    issuer: 'DeepLearning.AI',
    url: 'https://coursera.org/share/b3f471573aa3b02589e0619284ed2bcb'
  },
  {
    title: 'Peer-to-Peer Protocols and Local Area Networks',
    issuer: 'University of Colorado System',
    url: 'https://coursera.org/share/459e681a157a083b179c6e8fb592fc50'
  }
];

export default siteConfig;
