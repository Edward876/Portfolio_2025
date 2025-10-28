import Sections from './components/Sections';
import BlobCursor from './components/BlobCursor';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sections />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
      <BlobCursor
        blobType="circle"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[28, 56, 36]}
        innerSizes={[8, 14, 10]}
        innerColor="rgba(255,255,255,0.85)"
        opacities={[0.55, 0.55, 0.55]}
        shadowColor="rgba(0,0,0,0.5)"
        shadowBlur={6}
        shadowOffsetX={6}
        shadowOffsetY={6}
        filterStdDeviation={24}
        useFilter={true}
        fastDuration={0.12}
        slowDuration={0.4}
        zIndex={50}
      />
    </>
  );
}
