import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Asterisk, Check, CheckCheck, Clock, Copy, Loader2, Mail, MapPin, MessageCircle, MoveUpRight, Phone, Send, Sparkles } from 'lucide-react'
import { agency, concepts, img } from './config.js'
import { agencyServices as services } from './data/services.js'
import ChatAssistant from './ChatAssistant.jsx'
import {
  ArrowLink, CtaLink, DemoForm, Eyebrow, PageTransition, Reveal,
  ScrollProgress, SiteFooter, SiteNav, updatePageMeta,
  GradientOrb, CustomCursor, SmoothScrollProvider, StaggerContainer, StaggerItem, useCurrency
} from './shared.jsx'

const nav = [['Home', '/'], ['Services', '/services'], ['Our work', '/work'], ['About', '/about'], ['Contact', '/contact']]
const projects = concepts

/* ─────────────────────────────────────────────────────── */
export function AgencyLayout() {
  const { pathname } = useLocation()
  const isAgentDemo = pathname === '/projects/ai-agent'
  return (
    <SmoothScrollProvider>
      <div className="agency-theme">
        <CustomCursor />
        <ScrollProgress />
        <div className="concept-ribbon">
          <span><Asterisk size={12} /> {agency.name} · India · Working worldwide</span>
          <Link to="/contact">Start a conversation <ArrowRight size={12} /></Link>
        </div>
        <SiteNav
          brand={{ name: agency.name, mark: agency.mark, sub: 'INDIA' }}
          links={nav}
          cta={["Let's talk", '/contact']}
          mobileCta={['Talk through a project', '/contact']}
          backTo="/"
        />
        <PageTransition />
        <SiteFooter
          brand={{ name: agency.name, mark: agency.mark }}
          note="An independent digital engineering & design studio in India, crafting next-generation websites, web apps, and AI systems for ambitious brands worldwide."
          links={[
            ['Services', '/services'],
            ['Selected work', '/work'],
            ['About elev8rix', '/about'],
            ['Contact', '/contact'],
            ['Maison Ember demo', '/projects/cafe'],
            ['Northfield demo', '/projects/school'],
            ['UrbanNest demo', '/projects/business'],
            ['Forge Athletics demo', '/projects/fitness'],
            ['Alder & Rowe demo', '/projects/legal'],
            ['Custom AI agent demo', '/projects/ai-agent'],
            ['Email us', `mailto:${agency.email}`],
          ]}
        />
        {!isAgentDemo && <ChatAssistant />}
      </div>
    </SmoothScrollProvider>
  )
}

/* ─── Hero ───────────────────────────────────────────── */
function HeroSection() {
  const reduceMotion = useReducedMotion()
  const fade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: d } })
  }

  return (
    <section className="agency-hero">
      {/* Background layers */}
      <div className="hero-bg" />
      <div className="hero-grid-lines" />
      <GradientOrb color="electric" size={600} top="-100px" left="-100px" opacity={0.35} />
      <GradientOrb color="glow" size={500} top="100px" right="-80px" opacity={0.25} />
      <GradientOrb color="lime" size={350} bottom="-80px" left="30%" opacity={0.15} />

      <div className="hero-content wrap">
        <div className="hero-copy">
          <motion.div custom={0} initial="hidden" animate="visible" variants={fade}>
            <Eyebrow>elev8rix · Elevate your business</Eyebrow>
          </motion.div>

          <motion.h1 custom={0.08} initial="hidden" animate="visible" variants={fade}>
            Make digital<br />
            work <em>smarter.</em>
          </motion.h1>

          <motion.p className="hero-lead" custom={0.16} initial="hidden" animate="visible" variants={fade}>
            We design and build digital experiences that help growing businesses reach higher—from first impression to everyday operations.
          </motion.p>

          <motion.div className="hero-actions" custom={0.24} initial="hidden" animate="visible" variants={fade}>
            <CtaLink to="/contact">Talk through a project</CtaLink>
            <ArrowLink to="/work">Explore concept work</ArrowLink>
          </motion.div>

          <motion.div className="hero-caption" custom={0.35} initial="hidden" animate="visible" variants={fade}>
            <span className="caption-line" />
            <span>Strategy, design &amp; engineering · India</span>
          </motion.div>
        </div>

        {/* Hero art — floating card stack */}
        <div className="hero-art" aria-label="A collection of digital experiences">
          <motion.div
            className="hero-card-main"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link className="hero-card hero-card-link" to="/projects/cafe" aria-label="Explore the Maison Ember hospitality concept">
              <img src="/images/hero-cafe.jpg" alt="Maison Ember hospitality concept preview" decoding="async" fetchPriority="high" />
              <div className="hero-card-label">
                <span>01 / Concept · Hospitality</span>
                <b>Maison Ember</b>
                <small>Explore live concept <ArrowRight size={12} /></small>
              </div>
            </Link>
          </motion.div>

          <motion.div
            className="hero-card-sub"
            initial={{ opacity: 0, x: -16, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link className="hero-card hero-card-bordered hero-card-link" to="/projects/school" aria-label="Explore the Northfield education concept">
              <img src="/images/hero-school.jpg" alt="Northfield International education concept preview" decoding="async" fetchPriority="high" />
              <div className="hero-card-label">
                <span>02 / Concept · Education</span>
                <b>Northfield International</b>
                <small>Explore live concept <ArrowRight size={12} /></small>
              </div>
            </Link>
          </motion.div>

          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Sparkles size={18} style={{ marginBottom: 4 }} />
            <span style={{ fontSize: 9 }}>elev8rix</span>
            <span style={{ fontSize: 9 }}>Digital · IN</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Agency Home ────────────────────────────────────── */
export function AgencyHome() {
  useEffect(() => {
    updatePageMeta(
      `${agency.name} — Elevate your business`,
      'elev8rix elevates your business with considered websites, apps, and AI automation for growing teams in hospitality, fitness, legal, education, and services.'
    )
  }, [])

  return (
    <main>
      <HeroSection />

      {/* Seamless Rotating Capabilities Marquee */}
      <div className="ticker" aria-label="Core Capabilities">
        <div className="ticker-track" aria-hidden="true">
          {[...Array(6)].map((_, rep) =>
            ['Strategy', 'UI/UX Design', 'Full-Stack Dev', 'AI Automation'].map((item, i) => (
              <span key={`a-${rep}-${i}`} className="ticker-item">
                <span className="ticker-text">{item}</span>
                <span className="ticker-star">✦</span>
              </span>
            ))
          )}
          {[...Array(6)].map((_, rep) =>
            ['Strategy', 'UI/UX Design', 'Full-Stack Dev', 'AI Automation'].map((item, i) => (
              <span key={`b-${rep}-${i}`} className="ticker-item">
                <span className="ticker-text">{item}</span>
                <span className="ticker-star">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Intro */}
      <section className="section wrap">
        <div className="intro-section">
          <Reveal>
            <div>
              <Eyebrow>Rooted in India · Built for the world</Eyebrow>
              <h2 className="section-h2">Clear thinking.<br /><em>Higher impact.</em></h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <p className="section-lead">
                elev8rix is built around one idea: make useful digital experiences that move a business forward. We bring strategy, design, and engineering together around the people your business serves.
              </p>
              <ArrowLink to="/about">Get to know elev8rix</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesPreview />
      <WorkPreview />
      <ProcessSection />
      <ContactCta />
    </main>
  )
}

/* ─── Interactive Services Section (Services We Provide) ─── */
function ServicesPreview() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [currency] = useCurrency()
  const activeService = services[activeIdx] || services[0]
  const [
    activeName,
    activeDesc,
    ActiveIcon,
    activeDeliverables = [],
    activeTimeline = '2–4 weeks',
    activePrice = { INR: 'From ₹45,000', USD: 'From $950' }
  ] = activeService

  return (
    <section className="section services-section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Services we provide</Eyebrow>
            <h2 className="section-h2">Digital, end to <em>end.</em></h2>
          </div>
          <p>Explore deliverables and indicative starting prices based on your region. Final scope and schedule are confirmed after discovery.</p>
        </div>

        {/* Interactive Showcase Panel (Great on Mobile & Desktop) */}
        <div className="services-showcase">
          {/* Pill / Tab selector (horizontally scrollable on mobile) */}
          <div className="service-tabs" role="tablist" aria-label="Services we provide">
            {services.map(([name, , Icon], i) => {
              const isSelected = i === activeIdx
              return (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`service-tab${isSelected ? ' active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className="service-tab-num">0{i + 1}</span>
                  <Icon size={16} className="service-tab-icon" />
                  <span className="service-tab-name">{name}</span>
                </button>
              )
            })}
          </div>

          {/* Spotlight Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeName}-${currency}`}
              className="service-spotlight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="spotlight-main">
                <div className="spotlight-badge-row">
                  <span className="spotlight-index">0{activeIdx + 1} / 0{services.length}</span>
                  <span className="spotlight-timeline"><Clock size={12} /> Avg. {activeTimeline}</span>
                  <span className="spotlight-price">{activePrice[currency]}</span>
                </div>
                <h3>{activeName}</h3>
                <p>{activeDesc}</p>
                <div className="spotlight-actions">
                  <CtaLink to="/contact">Book this service</CtaLink>
                  <ArrowLink to="/services">View full scope</ArrowLink>
                </div>
              </div>

              <div className="spotlight-deliverables">
                <div className="spotlight-icon-box">
                  <ActiveIcon size={28} strokeWidth={1.5} />
                </div>
                <h4>Key Deliverables &amp; Stack</h4>
                <div className="deliverable-chips">
                  {activeDeliverables.map(item => (
                    <span key={item} className="deliverable-chip">
                      <Check size={13} /> {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="center-link">
          <ArrowLink to="/services">Explore all {services.length} capabilities &amp; deliverables</ArrowLink>
        </div>
      </div>
    </section>
  )
}

/* ─── Work Preview ───────────────────────────────────── */
function WorkPreview() {
  const reduceMotion = useReducedMotion()
  return (
    <section className="section work-section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Selected concepts</Eyebrow>
            <h2 className="section-h2">Different stories.<br /><em>Made tangible.</em></h2>
          </div>
          <p>Explore tailored digital experiences for hospitality, education, home services, fitness, and legal practices, plus a hands-on custom AI agent prototype.</p>
        </div>

        <div className="project-grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <Link to={`/projects/${p.slug}`} className="project-card">
                <div className="project-photo">
                  <img src={p.preview} alt={`${p.name} concept website preview`} loading="lazy" decoding="async" />
                  <div className="project-overlay" />
                  <span className="concept-tag">Concept project · Live demo</span>
                  <span className="project-number">0{i + 1}</span>
                  <span className="project-open"><MoveUpRight size={18} /></span>
                </div>
                <div className="project-info">
                  <div>
                    <span className="project-category">{p.category}</span>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                  </div>
                  <ArrowRight size={18} />
                </div>
                <div className="tag-row">
                  {p.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="concept-disclaimer">
          <Asterisk size={13} />
          These self-initiated concepts are prototypes, not commissioned client work. Open any card to explore the full experience.
        </p>
      </div>
    </section>
  )
}

/* ─── Process Section ────────────────────────────────── */
function ProcessSection() {
  const steps = ['Listen & discover', 'Shape the strategy', 'Design the experience', 'Build with care', 'Test & refine', 'Launch & scale']
  return (
    <section className="section process-section">
      <div className="wrap process-grid">
        <Reveal>
          <div>
            <Eyebrow>A clear path forward</Eyebrow>
            <h2 className="section-h2">Thoughtful from<br /><em>first hello.</em></h2>
            <p className="section-lead" style={{ marginTop: 16 }}>
              Whether you're based in India or half a world away, we work as an extension of your team with transparent sprints and direct communication.
            </p>
            <CtaLink to="/contact" secondary>Talk through an idea</CtaLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="process-list">
            {steps.map((step, i) => (
              <div className="process-item" key={step}>
                <span>0{i + 1}</span>
                <b>{step}</b>
                <ArrowRight size={15} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Contact CTA ────────────────────────────────────── */
function ContactCta() {
  return (
    <section className="section contact-cta">
      <div className="cta-glow-bg" />
      <GradientOrb color="electric" size={700} top="50%" left="50%" opacity={0.08}
        style={{ transform: 'translate(-50%, -50%)' }} />
      <div className="wrap cta-content">
        <Eyebrow>Good things start with a conversation</Eyebrow>
        <h2>Have a bold<br />idea? <em>We're in.</em></h2>
        <p>Tell us what you're building. We'll respond within 24 hours with clear thoughts, timeline estimates, and next steps.</p>
        <div className="cta-actions">
          <CtaLink to="/contact">Start a project</CtaLink>
          <ArrowLink to="/work">See our work first</ArrowLink>
        </div>
      </div>
    </section>
  )
}

/* ─── Agency Pages ───────────────────────────────────── */
export function AgencyPage({ page }) {
  const [expandedService, setExpandedService] = useState(0)
  const [currency] = useCurrency()

  useEffect(() => {
    const titles = {
      services: 'Digital engineering, WebGL & AI services',
      work: 'Selected interactive concept projects',
      about: 'About elev8rix · India',
      contact: 'Start a project conversation',
    }
    updatePageMeta(
      `${titles[page]} — ${agency.name}`,
      `${titles[page]} from ${agency.name}, an independent digital engineering & design studio in India.`
    )
  }, [page])

  if (page === 'services') return (
    <main className="inner-page">
      <div className="wrap inner-hero">
        <Eyebrow>Services we provide</Eyebrow>
        <h1>Good ideas deserve<br /><em>great execution.</em></h1>
        <p>We bring strategy, design, and full-stack engineering together to move from "what if?" to digital products that make a measurable impact.</p>
      </div>
      <section className="wrap inner-services">
        <StaggerContainer className="service-grid">
          {services.map(([name, desc, Icon, deliverables = [], timeline = '2–4 weeks', price = {}], i) => {
            const isExpanded = expandedService === i
            return (
              <StaggerItem key={name}>
                <article
                  className={`service-tile${isExpanded ? ' expanded' : ''}`}
                  onClick={() => setExpandedService(isExpanded ? -1 : i)}
                  onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
                    e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
                  }}
                >
                  <div className="service-top">
                    <span>0{i + 1}</span>
                    <span className="tile-time"><Clock size={11} /> {timeline} · {price[currency]}</span>
                    <div className="tile-icon-wrap">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                  </div>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <div className="service-deliverables">
                    {deliverables.map(item => (
                      <span key={item} className="deliverable-chip">
                        <Check size={12} /> {item}
                      </span>
                    ))}
                  </div>
                  <div className="service-footer">
                    <ArrowLink to="/contact">Book this service ({price[currency]})</ArrowLink>
                    {name === 'Custom AI agents' && <Link className="service-demo-link" to="/projects/ai-agent">Try the live demo <MoveUpRight size={13} /></Link>}
                    <MoveUpRight size={16} className="tile-arrow-inline" />
                  </div>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </section>
      <ProcessSection />
      <ContactCta />
    </main>
  )

  if (page === 'work') return (
    <main className="inner-page">
      <div className="wrap inner-hero">
        <Eyebrow>Selected concepts</Eyebrow>
        <h1>Good work in<br /><em>different worlds.</em></h1>
          <p>Each interactive concept explores what thoughtful design and fast engineering can do for growing businesses, including a hands-on custom AI agent prototype.</p>
      </div>
      <WorkPreview />
      <ContactCta />
    </main>
  )

  if (page === 'about') return (
    <main className="inner-page">
      <div className="wrap inner-hero">
        <Eyebrow>About {agency.name}</Eyebrow>
        <h1>Independent studio.<br /><em>Direct collaboration.</em></h1>
        <p>{agency.name} is an independent digital design and engineering studio in India. We work directly with growing teams to plan and build websites, web apps, and practical AI automations.</p>
      </div>
      <section className="about-feature wrap">
        <img src="/images/about-team.jpg" alt="elev8rix digital design and engineering team" loading="lazy" decoding="async" />
        <Reveal>
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2>Close collaboration.<br /><em>Clear decisions.</em></h2>
            <p>Direct communication means you work directly with the engineers and designers shaping the product. We make the process visible, the scope clear, and every micro-interaction count.</p>
          </div>
        </Reveal>
      </section>
      <section className="wrap values-grid">
        {[
          ['Elevate with intent', 'We start by understanding the people, market realities, and growth opportunities around your project.'],
          ['Engineering Craft', 'From 60fps animations to sub-second page loads, we care about the technical details that make products feel effortless.'],
          ['True Partnership', 'Based in India and working across timezones, we collaborate with honest conversations and shared ownership.']
        ].map(([title, desc], i) => (
          <Reveal key={title} delay={i * 0.08}>
            <article>
              <Eyebrow>0{i + 1}</Eyebrow>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          </Reveal>
        ))}
      </section>
      <ContactCta />
    </main>
  )

  // Contact page with dynamic INR / USD budget ranges
  const budgetOptions = currency === 'INR'
    ? ['Under ₹50,000', '₹50,000 – ₹1,50,000', '₹1,50,000 – ₹3,50,000', '₹3,50,000 – ₹8,00,000', '₹8,00,000+', 'Not sure yet']
    : ['Under $1,000', '$1,000 – $2,500', '$2,500 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet']

  return (
    <main className="inner-page">
      <div className="wrap inner-hero">
        <Eyebrow>Let's start somewhere</Eyebrow>
        <h1>Have an idea?<br /><em>Let's talk.</em></h1>
        <p>Share a little about what you're working on. We'll follow up within 24 hours with a few thoughtful questions and a clear next step.</p>
        <div className="contact-email">
          <Mail size={18} />
          <a href={`mailto:${agency.email}`}>{agency.email}</a>
          <CopyEmailButton email={agency.email} />
        </div>
      </div>
      <section className="wrap contact-layout">
        <div>
          <h2>A good place to begin.</h2>
          <p>Tell us the shape of the challenge, the people it matters to, and what a better outcome looks like for your business.</p>
          <div className="contact-detail">
            <span>Direct channels</span>
            <div className="contact-direct-link">
              <a href={`mailto:${agency.email}`} className="direct-channel-item">
                <Mail size={15} />
                <span>{agency.email}</span>
              </a>
              <CopyEmailButton email={agency.email} />
            </div>
            <a href={`tel:+917007864516`} className="direct-channel-item">
              <Phone size={15} />
              <span>+91 70078 64516 <small>(Direct Call)</small></span>
            </a>
            <a href={agency.whatsapp} target="_blank" rel="noreferrer" className="direct-channel-item whatsapp-channel">
              <MessageCircle size={15} />
              <span>+91 70078 64516 <small>(WhatsApp Chat)</small></span>
            </a>
          </div>
          <div className="contact-detail">
            <span>Response guarantee</span>
            <b>⚡ Response in under 4 hours · Mon–Sat</b>
          </div>
          <div className="contact-detail">
            <span>Our studio</span>
            <b><MapPin size={14} /> {agency.location}</b>
          </div>
        </div>
        <AgencyContactForm budgetOptions={budgetOptions} />
      </section>
    </main>
  )
}

/* ─── Contact Form Helper Components ─────────────────── */
function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = (e) => {
    e.preventDefault()
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`copy-email-btn${copied ? ' copied' : ''}`}
      title="Copy email to clipboard"
      aria-label="Copy email address"
    >
      {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  )
}

function AgencyContactForm({ budgetOptions }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    service: '',
    budget: '',
    description: '',
    consent: false,
    _hp: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    if (!formData.consent) {
      setStatus('error')
      setErrorMessage('Please confirm your consent before submitting.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      // 1. Submit through controlled backend (MongoDB Atlas storage + automated email forward)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          business: formData.business || '',
          service: formData.service || '',
          budget: formData.budget || '',
          description: formData.description,
          consent: formData.consent,
          _hp: formData._hp || '',
        }),
      })

      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        setStatus('success')
        return
      }

      throw new Error(data?.error || data?.message || 'Server error')
    } catch (err) {
      console.warn('Backend submission failed, trying direct FormSubmit fallback:', err)

      // 2. Direct FormSubmit fallback with activated secure token
      try {
        const token = agency.formsubmitToken || '168804c9df11efbdf863c6198c2a34ad'
        const fsRes = await fetch(`https://formsubmit.co/ajax/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            Name: formData.name,
            Email: formData.email,
            'Phone / WhatsApp': formData.phone || 'Not provided',
            Company: formData.business || 'Not provided',
            Service: formData.service || 'General inquiry',
            'Estimated Budget': formData.budget || 'Not specified',
            Message: formData.description,
            _subject: `New client inquiry from ${formData.name} via elev8rix`,
            _template: 'table',
            _captcha: 'false',
          }),
        })

        const fsData = await fsRes.json().catch(() => null)
        if (fsRes.ok && (fsData?.success === 'true' || fsData?.success === true)) {
          setStatus('success')
          return
        }
      } catch (fsErr) {
        console.warn('Direct FormSubmit fallback also failed:', fsErr)
      }

      setStatus('error')
      setErrorMessage(
        'Could not transmit automatically via server. Please click below to send directly through your mail app or WhatsApp.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-success-card" role="status">
        <div className="contact-success-icon">
          <Check size={28} />
        </div>
        <h3>Message delivered to elev8rix!</h3>
        <p className="contact-success-lead">
          Thank you, <strong>{formData.name}</strong>. Your inquiry has been sent directly to <strong>{agency.email}</strong>.
        </p>
        <p className="contact-success-sub">
          We treat every project with urgency. Our team typically reviews and responds within <strong>2–4 hours</strong> (guaranteed within 24 hours).
        </p>
        <div className="contact-success-actions">
          <a
            href={`https://wa.me/917007864516?text=${encodeURIComponent(
              `Hi elev8rix, I just submitted an inquiry on your website for ${formData.service || 'a project'}. My name is ${formData.name}.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle size={16} /> Quick-chat on WhatsApp now
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus('idle')
              setFormData({ name: '', email: '', phone: '', business: '', service: '', budget: '', description: '', consent: false, _hp: '' })
            }}
            className="btn btn-ghost"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  const fallbackMailto = `mailto:${agency.email}?subject=${encodeURIComponent(
    `Project enquiry from ${formData.name || 'Client'}${formData.business ? ` - ${formData.business}` : ''}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.business}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nProject details:\n${formData.description}`
  )}`

  return (
    <form className="demo-form agency-contact-form" onSubmit={handleSubmit}>
      <div className="form-header-row">
        <div>
          <h3>Start a project conversation</h3>
          <p className="form-subtitle">Tell us about your project — we'll reply to your email within 24 hours.</p>
        </div>
      </div>

      {status === 'error' && (
        <div className="form-error-banner" role="alert">
          <p>{errorMessage}</p>
          <div className="error-actions">
            <a href={fallbackMailto} className="btn btn-primary btn-sm">
              <Mail size={14} /> Open prefilled email
            </a>
            <a
              href={`https://wa.me/917007864516?text=${encodeURIComponent(
                `Hi elev8rix, I'm reaching out about a project: ${formData.name} (${formData.email})`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <MessageCircle size={14} /> Send via WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Honeypot field for spam prevention */}
      <input
        type="text"
        name="_hp"
        value={formData._hp}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }}
        aria-hidden="true"
      />

      <div className="field-grid">
        <label className="field">
          <span>Your name <b className="required-star">*</b></span>
          <input
            required
            name="name"
            placeholder="e.g. Shashwat Pandey"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Work email <b className="required-star">*</b></span>
          <input
            required
            type="email"
            name="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Phone / WhatsApp <small>(Optional)</small></span>
          <input
            type="tel"
            name="phone"
            placeholder="+91 0000000000"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Company / Organization <small>(Optional)</small></span>
          <input
            name="business"
            placeholder="Brand or venture name"
            value={formData.business}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Service required</span>
          <select name="service" value={formData.service} onChange={handleChange}>
            <option value="">Select a service</option>
            <option value="Website design & development">Website design & development</option>
            <option value="Web application">Web application (SaaS / Portal)</option>
            <option value="Mobile application">Mobile application (iOS & Android)</option>
            <option value="AI automation">AI automation & Agents</option>
            <option value="E-commerce">E-commerce Storefront</option>
            <option value="UI/UX design">UI/UX Design & Prototyping</option>
            <option value="API & integrations">API & System Integrations</option>
            <option value="Website optimization">Website Optimization & Speed</option>
            <option value="Full digital transformation">Full digital transformation</option>
          </select>
        </label>

        <label className="field">
          <span>Estimated budget</span>
          <select name="budget" value={formData.budget} onChange={handleChange}>
            <option value="">Select an investment range</option>
            {budgetOptions.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="field wide">
          <span>Tell us about your project <b className="required-star">*</b></span>
          <textarea
            required
            name="description"
            rows={4}
            placeholder="What are your goals, required features, timeline, or reference links you admire?"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <div className="field wide consent-field">
          <label className="consent-checkbox-label">
            <input
              type="checkbox"
              name="consent"
              required
              checked={formData.consent}
              onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
            />
            <span>
              I agree to elev8rix processing my contact details to reply to this project enquiry. We respect your confidentiality and never share your data.
            </span>
          </label>
        </div>
      </div>

      <div className="form-submit-row">
        <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 size={16} className="btn-spinner" />
              <span>Sending message to elev8rix…</span>
            </>
          ) : (
            <>
              <span>Send project enquiry</span>
              <Send size={15} />
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export function NotFoundPage() {
  useEffect(() => {
    updatePageMeta(
      'Page Not Found (404) · elev8rix',
      'The requested page could not be found on elev8rix.',
      '/404'
    )
  }, [])

  return (
    <main className="inner-page not-found-page">
      <div className="wrap not-found-wrap">
        <Eyebrow>404 / Page Not Found</Eyebrow>
        <h1>This page has drifted.<br /><em>Let's get you back on track.</em></h1>
        <p>
          The page you're looking for doesn't exist, has been reorganized, or the link may have a typo.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Return to Homepage
          </Link>
          <Link to="/services" className="btn btn-ghost">
            Explore Services
          </Link>
          <Link to="/work" className="btn btn-ghost">
            View Live Demos
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}
