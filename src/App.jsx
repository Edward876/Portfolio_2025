import Sections from './components/Sections';
import BlobCursor from './components/BlobCursor';
import './App.css';

export default function App() {
  return (
    <>
      <Sections />
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
