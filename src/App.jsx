import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AgencyLayout, AgencyHome, AgencyPage, NotFoundPage } from './agency.jsx'

// Lazy-loaded demo suites to minimize initial agency bundle
const CafeLayout = lazy(() => import('./cafe.jsx').then(m => ({ default: m.CafeLayout })))
const CafePage = lazy(() => import('./cafe.jsx').then(m => ({ default: m.CafePage })))

const SchoolLayout = lazy(() => import('./school.jsx').then(m => ({ default: m.SchoolLayout })))
const SchoolPage = lazy(() => import('./school.jsx').then(m => ({ default: m.SchoolPage })))

const BusinessLayout = lazy(() => import('./business.jsx').then(m => ({ default: m.BusinessLayout })))
const BusinessPage = lazy(() => import('./business.jsx').then(m => ({ default: m.BusinessPage })))

const FitnessLayout = lazy(() => import('./fitness.jsx').then(m => ({ default: m.FitnessLayout })))
const FitnessPage = lazy(() => import('./fitness.jsx').then(m => ({ default: m.FitnessPage })))

const LegalLayout = lazy(() => import('./legal.jsx').then(m => ({ default: m.LegalLayout })))
const LegalPage = lazy(() => import('./legal.jsx').then(m => ({ default: m.LegalPage })))
const AgentDemoPage = lazy(() => import('./agent-demo.jsx'))

function DemoFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '14px',
      color: 'var(--text-dim, #888)',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      fontSize: '0.9rem',
    }}>
      <div style={{
        width: '26px',
        height: '26px',
        border: '2px solid rgba(120, 120, 120, 0.25)',
        borderTopColor: 'currentColor',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span>Loading interactive demo…</span>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const imageFallback = event => {
      if (event.target instanceof HTMLImageElement) {
        event.target.style.display = 'none'
        event.target.parentElement?.classList.add('image-fallback')
      }
    }
    document.addEventListener('error', imageFallback, true)
    return () => document.removeEventListener('error', imageFallback, true)
  }, [])

  return (
    <Routes>
      <Route element={<AgencyLayout />}>
        <Route path="/" element={<AgencyHome />} />
        {['services', 'work', 'about', 'contact'].map(path => (
          <Route key={path} path={path} element={<AgencyPage page={path} />} />
        ))}
        <Route path="/projects/ai-agent" element={<Suspense fallback={<DemoFallback />}><AgentDemoPage /></Suspense>} />
        {/* Real 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Code-split Concept Demo Suites */}
      <Route
        path="/projects/cafe"
        element={
          <Suspense fallback={<DemoFallback />}>
            <CafeLayout />
          </Suspense>
        }
      >
        {['', 'menu', 'about', 'contact', 'book'].map(path => (
          <Route
            key={path || 'home'}
            index={!path}
            path={path || undefined}
            element={
              <Suspense fallback={<DemoFallback />}>
                <CafePage page={path || 'home'} />
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route
        path="/projects/school"
        element={
          <Suspense fallback={<DemoFallback />}>
            <SchoolLayout />
          </Suspense>
        }
      >
        {['', 'about', 'academics', 'admissions', 'contact'].map(path => (
          <Route
            key={path || 'home'}
            index={!path}
            path={path || undefined}
            element={
              <Suspense fallback={<DemoFallback />}>
                <SchoolPage page={path || 'home'} />
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route
        path="/projects/business"
        element={
          <Suspense fallback={<DemoFallback />}>
            <BusinessLayout />
          </Suspense>
        }
      >
        {['', 'services', 'about', 'contact', 'book'].map(path => (
          <Route
            key={path || 'home'}
            index={!path}
            path={path || undefined}
            element={
              <Suspense fallback={<DemoFallback />}>
                <BusinessPage page={path || 'home'} />
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route
        path="/projects/fitness"
        element={
          <Suspense fallback={<DemoFallback />}>
            <FitnessLayout />
          </Suspense>
        }
      >
        {['', 'programs', 'coaches', 'book'].map(path => (
          <Route
            key={path || 'home'}
            index={!path}
            path={path || undefined}
            element={
              <Suspense fallback={<DemoFallback />}>
                <FitnessPage page={path || 'home'} />
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route
        path="/projects/legal"
        element={
          <Suspense fallback={<DemoFallback />}>
            <LegalLayout />
          </Suspense>
        }
      >
        {['', 'services', 'people', 'contact'].map(path => (
          <Route
            key={path || 'home'}
            index={!path}
            path={path || undefined}
            element={
              <Suspense fallback={<DemoFallback />}>
                <LegalPage page={path || 'home'} />
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  )
}
