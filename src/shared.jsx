import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpLeft, Briefcase, Check, ChevronDown, Home, Info, Layers, Mail, Menu, MessageCircle, Moon, Sun, X } from 'lucide-react'
import { agency, concepts, saveDemo } from './config.js'

/* ─── Automatic Region & Location Currency Detection (INR ₹ / USD $) ─── */
function detectRegionalCurrency() {
  if (typeof window === 'undefined') return 'INR'
  try {
    const cached = sessionStorage.getItem('elev8rix_region_currency')
    if (cached === 'INR' || cached === 'USD') return cached

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const isIndianTz =
      tz === 'Asia/Kolkata' ||
      tz === 'Asia/Calcutta' ||
      new Date().getTimezoneOffset() === -330

    const langs = navigator.languages ? [...navigator.languages] : [navigator.language || '']
    const isIndianLocale = langs.some(l => /-IN$/i.test(l) || /^hi\b/i.test(l))

    return isIndianTz || isIndianLocale ? 'INR' : 'USD'
  } catch {
    return 'INR'
  }
}

export function useCurrency() {
  const [currency, setCurrencyState] = useState(detectRegionalCurrency)

  useEffect(() => {
    const onRegionUpdate = (e) => {
      if (e.detail === 'INR' || e.detail === 'USD') {
        setCurrencyState(e.detail)
      }
    }
    window.addEventListener('region-currency-resolved', onRegionUpdate)

    // Verify via lightweight IP country lookup once per session if not yet cached
    if (!sessionStorage.getItem('elev8rix_region_currency')) {
      fetch('https://api.country.is/')
        .then(r => (r.ok ? r.json() : null))
        .then(data => {
          if (data && data.country) {
            const resolved = data.country === 'IN' ? 'INR' : 'USD'
            sessionStorage.setItem('elev8rix_region_currency', resolved)
            setCurrencyState(resolved)
            window.dispatchEvent(new CustomEvent('region-currency-resolved', { detail: resolved }))
          }
        })
        .catch(() => {
          // Offline or blocked: keep timezone/locale detection
          sessionStorage.setItem('elev8rix_region_currency', detectRegionalCurrency())
        })
    }

    return () => window.removeEventListener('region-currency-resolved', onRegionUpdate)
  }, [])

  return [currency]
}

/* ─── Floating WhatsApp Quick-Chat Button ────────────── */
export function WhatsAppFloat() {
  return (
    <a
      href={agency.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Chat with elev8rix on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={20} />
      <span>WhatsApp</span>
    </a>
  )
}

/* ─── Theme Toggle ──────────────────────────────────── */
export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const syncTheme = (event) => setTheme(event.detail)
    window.addEventListener('elev8rix-theme-change', syncTheme)
    return () => window.removeEventListener('elev8rix-theme-change', syncTheme)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    window.dispatchEvent(new CustomEvent('elev8rix-theme-change', { detail: next }))
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

/* ─── Page Meta ─────────────────────────────────────── */
export function updatePageMeta(title, description, path = '') {
  document.title = title
  const baseUrl = 'https://elev8rix.vercel.app'
  const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '/')
  const canonicalUrl = `${baseUrl}${currentPath === '/' ? '' : currentPath}`
  const ogImage = `${baseUrl}/og-image.jpg`

  const setMeta = (selector, attribute, value, tagName = 'meta') => {
    let node = document.head.querySelector(selector)
    if (!node) {
      node = document.createElement(tagName)
      document.head.appendChild(node)
    }
    node.setAttribute(attribute, value)
    return node
  }

  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', canonicalUrl)
  setMeta('meta[property="og:image"]', 'content', ogImage)
  setMeta('meta[property="og:type"]', 'content', 'website')
  setMeta('meta[property="og:site_name"]', 'content', 'elev8rix')

  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
  setMeta('meta[name="twitter:image"]', 'content', ogImage)

  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalUrl)
}

/* ─── Scroll Progress Bar ────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  )
}

/* ─── Custom Cursor: Architectural Reticle + Context HUD ─── */
export function CustomCursor() {
  const coreRef = useRef(null)
  const reticleRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const pressedRef = useRef(false)
  const visibleRef = useRef(false)
  const [mode, setMode] = useState('default') // 'default' | 'action' | 'card' | 'service' | 'input'
  const [label, setLabel] = useState('')
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }

      // Zero-latency precision crosshair core
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const animate = () => {
      const dx = mouse.current.x - pos.current.x
      const dy = mouse.current.y - pos.current.y
      pos.current.x += dx * 0.24
      pos.current.y += dy * 0.24

      // Subtle kinetic tilt based on horizontal velocity
      const speed = Math.min(Math.hypot(dx, dy), 60)
      const tilt = Math.max(-12, Math.min(12, dx * 0.25))
      const scale = pressedRef.current ? 0.86 : 1 + speed * 0.0015

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onOver = (e) => {
      const target = e.target
      if (!target || typeof target.closest !== 'function') return

      const customLabelEl = target.closest('[data-cursor]')
      if (customLabelEl) {
        setMode('card')
        setLabel(customLabelEl.getAttribute('data-cursor') || 'EXPLORE ↗')
        return
      }

      if (target.closest('input, textarea, select')) {
        setMode('input')
        setLabel('')
        return
      }

      if (target.closest('.project-card, .dish-card, .program-card, .business-service-card')) {
        setMode('card')
        setLabel('EXPLORE ↗')
        return
      }

      if (target.closest('.bento-tile, .service-tile')) {
        setMode('service')
        setLabel('INSPECT')
        return
      }

      const interactive = target.closest('a, button, [role="button"]')
      if (interactive) {
        setMode('action')
        setLabel('')
        return
      }

      setMode('default')
      setLabel('')
    }

    const onDown = () => {
      pressedRef.current = true
      setPressed(true)
    }
    const onUp = () => {
      pressedRef.current = false
      setPressed(false)
    }
    const onLeaveWindow = () => {
      visibleRef.current = false
      setVisible(false)
    }
    const onEnterWindow = () => {
      visibleRef.current = true
      setVisible(true)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mousedown', onDown, { passive: true })
    document.addEventListener('mouseup', onUp, { passive: true })
    document.addEventListener('mouseleave', onLeaveWindow, { passive: true })
    document.addEventListener('mouseenter', onEnterWindow, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeaveWindow)
      document.removeEventListener('mouseenter', onEnterWindow)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Zero-lag precision crosshair core */}
      <div
        ref={coreRef}
        className={`cursor-core mode-${mode}${pressed ? ' is-pressed' : ''}${visible ? ' is-visible' : ''}`}
      >
        <span className="cursor-core-h" />
        <span className="cursor-core-v" />
      </div>

      {/* Kinetic 4-corner architectural reticle & context pill */}
      <div
        ref={reticleRef}
        className={`cursor-reticle mode-${mode}${pressed ? ' is-pressed' : ''}${visible ? ' is-visible' : ''}`}
      >
        <span className="reticle-corner tl" />
        <span className="reticle-corner tr" />
        <span className="reticle-corner bl" />
        <span className="reticle-corner br" />
        {label && <span className="reticle-label">{label}</span>}
      </div>
    </>
  )
}

/* ─── Lenis Smooth Scroll Provider (Desktop only) ────── */
export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Use native momentum scrolling on touch/mobile for zero lag
    if (window.matchMedia('(pointer: coarse), (hover: none)').matches) return

    let lenis
    let rafId
    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
        const raf = (time) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
        document.documentElement.classList.add('lenis')
      } catch { /* fallback to native */ }
    }
    init()
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
      document.documentElement.classList.remove('lenis')
    }
  }, [])
  return children
}

/* ─── Page Transition ────────────────────────────────── */
export function PageTransition() {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-transition"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Reveal on scroll ───────────────────────────────── */
export function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Stagger container ──────────────────────────────── */
export function StaggerContainer({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Gradient Orb ───────────────────────────────────── */
export function GradientOrb({ color = 'electric', size = 400, top, left, right, bottom, opacity = 0.5, style = {} }) {
  return (
    <div
      className={`orb orb-${color}`}
      aria-hidden="true"
      style={{
        width: size, height: size,
        top, left, right, bottom,
        opacity,
        ...style
      }}
    />
  )
}

/* ─── Demo Form ──────────────────────────────────────── */
export function DemoForm({ title = 'Send an enquiry', button = 'Send enquiry', fields = [], storage = 'demo-submissions', mode = 'demo', recipient = '', subject = 'Project enquiry' }) {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (busy) return
    const data = Object.fromEntries(new FormData(e.currentTarget))
    if (mode === 'mailto') {
      const body = fields.map(field => `${field.label}: ${data[field.name] || 'Not provided'}`).join('\n')
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(`${subject}${data.business ? ` — ${data.business}` : ''}`)}&body=${encodeURIComponent(body)}`
      setSent(true)
      window.location.href = mailto
      return
    }

    setBusy(true)
    saveDemo(storage, data)
    setSent(true)
    setBusy(false)
  }

  if (sent) return (
    <div className="form-success" role="status">
      <span className="success-icon"><Check size={20} /></span>
      <div>
        <strong>{mode === 'mailto' ? 'Your email draft is ready.' : "Thank you — we've got your details."}</strong>
        <p>{mode === 'mailto'
          ? <>Review the message and press Send in your email app. If no draft opened, email <a href={`mailto:${recipient}`}>{recipient}</a>.</>
          : 'This is a concept website. Your information was saved only in this browser; nothing was sent to a business.'}</p>
      </div>
    </div>
  )

  return (
    <form className="demo-form" onSubmit={submit}>
      <h3>{title}</h3>
      <div className="field-grid">
        {fields.map(f => (
          <label className={f.wide ? 'field wide' : 'field'} key={f.name}>
            {f.label}
            {f.options
              ? <select name={f.name} required={f.required !== false}>
                  <option value="">Choose one</option>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              : f.multiline
                ? <textarea required={f.required !== false} name={f.name} placeholder={f.placeholder || ''} rows={4} />
                : <input required={f.required !== false} name={f.name} type={f.type || 'text'} placeholder={f.placeholder || ''} />
            }
          </label>
        ))}
      </div>
      <button className="btn btn-primary" disabled={busy}>
        {busy ? 'Saving…' : button}
        <ArrowRight size={16} />
      </button>
      <p className="form-note">{mode === 'mailto'
        ? <>Opens a prefilled email to <a href={`mailto:${recipient}`}>{recipient}</a>. Nothing is sent until you press Send.</>
        : 'Demo form only · No real request will be sent.'}</p>
    </form>
  )
}

/* ─── Atoms ──────────────────────────────────────────── */
export function Eyebrow({ children }) { return <div className="eyebrow">{children}</div> }
export function ArrowLink({ to, children, light = false }) {
  return (
    <Link className={`arrow-link${light ? ' light' : ''}`} to={to}>
      {children}
      <ArrowDownRight size={16} />
    </Link>
  )
}
export function CtaLink({ to, children, secondary = false }) {
  return (
    <Link className={`btn ${secondary ? 'btn-ghost' : 'btn-primary'}`} to={to}>
      {children}
      <ArrowRight size={15} />
    </Link>
  )
}

/* ─── Site Nav ───────────────────────────────────────── */
export function SiteNav({ brand, links, cta, mobileCta, theme = 'generic', backTo = '/' }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false)
  const dropdownTimeoutRef = useRef(null)
  const location = useLocation()
  const isDemo = ['cafe', 'school', 'business', 'fitness', 'legal'].includes(theme)

  const handleWorkMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setWorkDropdownOpen(true)
  }

  const handleWorkMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setWorkDropdownOpen(false)
    }, 180)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false)
    setWorkDropdownOpen(false)
  }, [location.pathname])

  return (
    <>
      <header className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link className="brand" to={backTo} onClick={() => setOpen(false)}>
            <BrandMark brand={brand} />
            <span>
              <AgencyWordmark brand={brand} />
              {brand.sub && <small>{brand.sub}</small>}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-links" aria-label="Main navigation">
            {links.map(([name, to]) => {
              if (name === 'Our work' && !isDemo) {
                return (
                  <div
                    key={to}
                    className="nav-dropdown-wrapper"
                    onMouseEnter={handleWorkMouseEnter}
                    onMouseLeave={handleWorkMouseLeave}
                  >
                    <NavLink
                      to={to}
                      end={to === backTo}
                      className="nav-dropdown-trigger"
                      onClick={() => setWorkDropdownOpen(false)}
                    >
                      <span>{name}</span>
                      <ChevronDown size={13} className={`dropdown-chevron ${workDropdownOpen ? 'open' : ''}`} />
                    </NavLink>

                    <AnimatePresence>
                      {workDropdownOpen && (
                        <motion.div
                          className="nav-dropdown-menu"
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="dropdown-header">
                            <span className="dropdown-title">Interactive Concepts</span>
                            <span className="dropdown-count">{concepts.length} live demos</span>
                          </div>
                          <div className="dropdown-grid">
                            {concepts.map((c) => (
                              <Link
                                key={c.slug}
                                to={`/projects/${c.slug}`}
                                className="dropdown-item"
                                onClick={() => setWorkDropdownOpen(false)}
                              >
                                <div className="dropdown-item-meta">
                                  <span className="dropdown-item-name">{c.name}</span>
                                  <span className="dropdown-item-desc">{c.category}</span>
                                </div>
                                <ArrowRight size={13} className="dropdown-item-arrow" />
                              </Link>
                            ))}
                          </div>
                          <div className="dropdown-footer">
                            <Link
                              to="/work"
                              className="dropdown-footer-link"
                              onClick={() => setWorkDropdownOpen(false)}
                            >
                              <span>Explore all work & concepts</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              return (
                <NavLink key={to} to={to} end={to === backTo}>{name}</NavLink>
              )
            })}
            {isDemo && (
              <Link className="studio-return" to="/" onClick={() => setOpen(false)}>
                <ArrowUpLeft size={13} />
                elev8rix
              </Link>
            )}
            <ThemeToggle />
            {cta && (
              <Link className="nav-cta" to={cta[1]} onClick={() => setOpen(false)}>
                {cta[0]}
                <ArrowRight size={14} />
              </Link>
            )}
          </nav>

          {/* Mobile actions */}
          <div className="mobile-actions">
            <ThemeToggle />
            <button className="mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-overlay open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-menu-header">
              <div className="mobile-brand">
                <BrandMark brand={brand} />
                <AgencyWordmark brand={brand} />
              </div>
              <button className="close-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="mobile-menu-body">
              <nav className="mobile-nav-links" aria-label="Mobile navigation">
                {links.map(([name, to], i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={to}
                      end={to === backTo}
                      onClick={() => setOpen(false)}
                      className="mobile-nav-link"
                    >
                      <span className="mobile-nav-num">0{i + 1}</span>
                      <span className="mobile-nav-text">{name}</span>
                      <ArrowRight size={15} className="mobile-nav-arrow" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {!isDemo && (
                <div className="mobile-demos-section">
                  <div className="mobile-demos-label">Live Interactive Demos</div>
                  <div className="mobile-demos-chips">
                    {concepts.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/projects/${c.slug}`}
                        className="mobile-demo-chip"
                        onClick={() => setOpen(false)}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {isDemo && (
                <Link className="studio-return-mobile" to="/" onClick={() => setOpen(false)}>
                  <ArrowUpLeft size={14} /> Return to elev8rix studio
                </Link>
              )}
            </div>

            <div className="mobile-menu-footer">
              <a
                href={agency.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm mobile-menu-btn"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a
                href={`mailto:${agency.email}`}
                className="btn btn-ghost btn-sm mobile-menu-btn"
              >
                <Mail size={15} /> {agency.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Bottom Dock */}
      <nav className="mobile-bottom-dock" aria-label={mobileCta ? 'Project enquiry' : 'Mobile quick navigation'}>
        {mobileCta && location.pathname !== '/contact' ? (
          <Link className="mobile-dock-cta" to={mobileCta[1]} onClick={() => setOpen(false)}>
            {mobileCta[0]} <ArrowRight size={16} />
          </Link>
        ) : mobileCta && location.pathname === '/contact' ? (
          <a className="mobile-dock-cta mobile-dock-whatsapp" href={agency.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> Quick-chat on WhatsApp
          </a>
        ) : links.slice(0, 5).map(([name, to]) => {
          const lower = name.toLowerCase()
          const Icon = lower.includes('home') ? Home
            : lower.includes('service') || lower.includes('menu') || lower.includes('academic') ? Layers
            : lower.includes('work') || lower.includes('project') || lower.includes('admission') || lower.includes('quote') ? Briefcase
            : lower.includes('about') || lower.includes('story') ? Info
            : Mail
          return (
            <NavLink key={to} to={to} end={to === backTo} className="dock-item" onClick={() => setOpen(false)}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{name.split(' ')[0]}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}

/* ─── Site Footer ────────────────────────────────────── */
export function SiteFooter({ brand, links, note, home = '/' }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand" to={home}>
              <BrandMark brand={brand} />
              <AgencyWordmark brand={brand} />
            </Link>
            <p>{note}</p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <nav>
              {links.slice(0, Math.ceil(links.length / 2)).map(([name, to]) => (
                <Link key={to} to={to}>{name}</Link>
              ))}
            </nav>
          </div>
          <div className="footer-col">
            <h4>More</h4>
            <nav>
              {links.slice(Math.ceil(links.length / 2)).map(([name, to]) => (
                <Link key={to} to={to}>{name}</Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {brand.name} · Crafted in India</span>
          <span>elev8rix · Interactive Portfolio</span>
        </div>
      </div>
      <WhatsAppFloat />
    </footer>
  )
}

function BrandMark({ brand }) {
  return brand.name === agency.name
    ? <span className="brand-mark elev8rix-mark"><img src="/elev8rix-symbol.svg" alt="" /></span>
    : <span className="brand-mark">{brand.mark || brand.name?.slice(0, 1)}</span>
}

function AgencyWordmark({ brand }) {
  return brand.name === agency.name
    ? <span className="agency-wordmark">elev<span>8</span>rix</span>
    : <span>{brand.name}</span>
}
