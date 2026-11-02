import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AgencyLayout, AgencyHome, AgencyPage } from './agency.jsx'
import { CafeLayout, CafePage } from './cafe.jsx'
import { SchoolLayout, SchoolPage } from './school.jsx'
import { BusinessLayout, BusinessPage } from './business.jsx'
import { FitnessLayout, FitnessPage } from './fitness.jsx'
import { LegalLayout, LegalPage } from './legal.jsx'

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
  return <Routes>
    <Route element={<AgencyLayout />}>
      <Route path="/" element={<AgencyHome />} />
      {['services', 'work', 'about', 'contact'].map(path => <Route key={path} path={path} element={<AgencyPage page={path} />} />)}
    </Route>
    <Route path="/projects/cafe" element={<CafeLayout />}>
      {['', 'menu', 'about', 'contact', 'book'].map(path => <Route key={path || 'home'} index={!path} path={path || undefined} element={<CafePage page={path || 'home'} />} />)}
    </Route>
    <Route path="/projects/school" element={<SchoolLayout />}>
      {['', 'about', 'academics', 'admissions', 'contact'].map(path => <Route key={path || 'home'} index={!path} path={path || undefined} element={<SchoolPage page={path || 'home'} />} />)}
    </Route>
    <Route path="/projects/business" element={<BusinessLayout />}>
      {['', 'services', 'about', 'contact', 'book'].map(path => <Route key={path || 'home'} index={!path} path={path || undefined} element={<BusinessPage page={path || 'home'} />} />)}
    </Route>
    <Route path="/projects/fitness" element={<FitnessLayout />}>
      {['', 'programs', 'coaches', 'book'].map(path => <Route key={path || 'home'} index={!path} path={path || undefined} element={<FitnessPage page={path || 'home'} />} />)}
    </Route>
    <Route path="/projects/legal" element={<LegalLayout />}>
      {['', 'services', 'people', 'contact'].map(path => <Route key={path || 'home'} index={!path} path={path || undefined} element={<LegalPage page={path || 'home'} />} />)}
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
