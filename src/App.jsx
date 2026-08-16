import { useEffect, useRef, useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'

import Intro from './components/Intro'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import Work from './pages/Work'

function App() {
  const { pathname, hash } = useLocation()
  const lenisRef = useRef(null)

  const [selectedPlan, setSelectedPlan] = useState('')
  const [showIntro, setShowIntro] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
    setIntroComplete(true)

    document.body.style.overflow = ''
    document.body.style.height = ''
  }, [])

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }
  }, [showIntro])

  useEffect(() => {
    if (!introComplete) return

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      wheelMultiplier: 1,
      gestureOrientation: 'vertical',
      normalizeWheel: true,
      smoothWheel: true,
    })

    lenisRef.current = lenis

    let animationFrameId

    const raf = (time) => {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [introComplete])

  useEffect(() => {
    if (hash || !introComplete) return

    const frameId = requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, {
        immediate: true,
        force: true,
      })

      window.scrollTo(0, 0)
    })

    return () => cancelAnimationFrame(frameId)
  }, [pathname, hash, introComplete])

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName)
  }

  return (
    <>
      {/* Custom Cursor - Always visible */}
      <CustomCursor />

      {/* Intro */}
      {showIntro && <Intro onComplete={handleIntroComplete} />}

      {/* Website */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          pointerEvents: introComplete ? 'auto' : 'none',
          visibility: introComplete ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease',
          minHeight: '100vh',
        }}
      >
        <Navbar />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onSelectPlan={handleSelectPlan}
                  selectedPlan={selectedPlan}
                />
              }
            />
            <Route path="/work" element={<Work />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App