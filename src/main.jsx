import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './index.css'
import App from './App.jsx'

function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.7 : 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 2), // easeOutQuad
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.2
    })

    let rafId = 0
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // let PixelBlast/GradualBlur still receive pointer events normally
    document.documentElement.style.scrollBehavior = 'auto'

    // Recalculate on content size changes so we can reach absolute bottom with wheel
    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        lenis.resize()
      })
      ro.observe(document.documentElement)
      ro.observe(document.body)
    }

    // Recalculate on load/resize as a fallback
    const onLoadOrResize = () => lenis.resize()
    window.addEventListener('load', onLoadOrResize)
    window.addEventListener('resize', onLoadOrResize)

    // Expose for debugging (optional)
    // eslint-disable-next-line no-underscore-dangle
    window.__lenis = lenis

    const onAnchorClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href === '#' || a.hasAttribute('data-no-smooth')) return
      const targetEl = document.querySelector(href)
      if (targetEl) {
        e.preventDefault()
        // small negative offset to avoid hugging the top edge
        lenis.scrollTo(targetEl, { offset: -8 })
      }
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      if (rafId) cancelAnimationFrame(rafId)
      if (ro) ro.disconnect()
      window.removeEventListener('load', onLoadOrResize)
      window.removeEventListener('resize', onLoadOrResize)
      lenis.destroy()
    }
  }, [])
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
)
