// Blog post registry: map slugs to metadata and import markdown content via Vite ?raw
import nmsFreeRanger from './nms-free-ranger.md?raw';

export const posts = [
  {
    slug: 'nms-free-ranger',
    title: 'The NMS-Free Ranger: A Deep Dive on YOLOv10 for Real-Time Poaching Prevention',
    date: '2025-10-28',
    excerpt: "We're not just finding poachers; we're optimizing our inference pipeline, and it's a game-changer.",
    content: nmsFreeRanger,
  }
];

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug);
}
