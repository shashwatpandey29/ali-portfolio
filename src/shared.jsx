import { useLayoutEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpLeft, Check, Menu, X } from 'lucide-react'
import { saveDemo } from './config.js'

export function updatePageMeta(title, description) {
  document.title = title
  const set = (selector, attribute, value, create) => {
    let node = document.head.querySelector(selector)
    if (!node) { node = document.createElement(create); document.head.appendChild(node) }
    node.setAttribute(attribute, value)
  }
  set('meta[name="description"]', 'content', description, 'meta')
  set('meta[property="og:title"]', 'content', title, 'meta')
  set('meta[property="og:description"]', 'content', description, 'meta')
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }} />
}

export function PageTransition() {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return <AnimatePresence mode="wait" initial={false}>
    <motion.div key={pathname} className="route-transition" initial={{ opacity: 0, y: reduceMotion ? 0 : 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={{ duration: reduceMotion ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] }}>
      {outlet}
    </motion.div>
  </AnimatePresence>
}

export function Reveal({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function DemoForm({ title = 'Send an enquiry', button = 'Send enquiry', fields = [], storage = 'demo-submissions' }) {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  function submit(e) { e.preventDefault(); if (busy) return; setBusy(true); const data = Object.fromEntries(new FormData(e.currentTarget)); saveDemo(storage, data); setSent(true); setBusy(false) }
  if (sent) return <div className="form-success" role="status"><span className="success-icon"><Check size={20} /></span><div><strong>Thank you — we’ve got your details.</strong><p>This is a concept website. Your information was saved only in this browser; nothing was sent to a business.</p></div></div>
  return <form className="demo-form" onSubmit={submit}>
    <h3>{title}</h3><div className="field-grid">{fields.map(f => <label className={f.wide ? 'field wide' : 'field'} key={f.name}>{f.label}{f.options ? <select name={f.name} required={f.required !== false}><option value="">Choose one</option>{f.options.map(o => <option key={o}>{o}</option>)}</select> : f.multiline ? <textarea required={f.required !== false} name={f.name} placeholder={f.placeholder || ''} rows={4} /> : <input required={f.required !== false} name={f.name} type={f.type || 'text'} placeholder={f.placeholder || ''} min={f.min} max={f.max} />}</label>)}</div>
    <button className="button primary" disabled={busy}>{busy ? 'Saving…' : button}<ArrowRight size={16} /></button><p className="form-note">Demo form only · No real request will be sent.</p>
  </form>
}

export function SelectField({ label, name, options, required = true }) { return <label className="field">{label}<select name={name} required={required}><option value="">Choose one</option>{options.map(x => <option key={x}>{x}</option>)}</select></label> }
export function Eyebrow({ children }) { return <div className="eyebrow">{children}</div> }
export function ArrowLink({ to, children, light = false }) { return <Link className={`arrow-link${light ? ' light' : ''}`} to={to}>{children}<ArrowDownRight size={18} /></Link> }
export function CtaLink({ to, children, secondary = false }) { return <Link className={`button ${secondary ? 'secondary' : 'primary'}`} to={to}>{children}<ArrowRight size={16} /></Link> }

export function SiteNav({ brand, links, cta, theme = 'generic', backTo = '/' }) {
  const [open, setOpen] = useState(false)
  const isDemo = ['cafe', 'school', 'business'].includes(theme)
  return <header className={`site-nav ${theme}-nav`}><div className="nav-inner"><Link className="brand" to={backTo} onClick={() => setOpen(false)}><span className="brand-mark">{brand.mark || brand.name?.slice(0, 1)}</span><span>{brand.name}{brand.sub && <small>{brand.sub}</small>}</span></Link><button className="mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{links.map(([name, to]) => <NavLink key={to} onClick={() => setOpen(false)} to={to} end={to === backTo}>{name}</NavLink>)}{isDemo && <Link className="studio-return" to="/" onClick={() => setOpen(false)}><ArrowUpLeft size={14} /> Agency home</Link>}{cta && <Link className="nav-cta" to={cta[1]} onClick={() => setOpen(false)}>{cta[0]}<ArrowRight size={15} /></Link>}</nav></div></header>
}

export function SiteFooter({ brand, links, note, home = '/' }) { return <footer className="site-footer"><div className="footer-inner"><Link className="brand" to={home}><span className="brand-mark">{brand.mark || brand.name?.slice(0, 1)}</span><span>{brand.name}</span></Link><p>{note}</p><nav>{links.map(([name, to]) => <Link key={to} to={to}>{name}</Link>)}</nav><div className="footer-bottom"><span>© {new Date().getFullYear()} {brand.name}</span><span>Concept website · Interactive demo</span></div></div></footer> }
