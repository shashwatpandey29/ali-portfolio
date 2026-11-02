import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Asterisk, Check, Clock, MapPin, MessageCircle, MoveUpRight, Phone, Sparkles } from 'lucide-react'
import { agency, concepts, img } from './config.js'
import { agencyServices as services } from './data/services.js'
import {
  ArrowLink, CtaLink, DemoForm, Eyebrow, PageTransition, Reveal,
  ScrollProgress, SiteFooter, SiteNav, updatePageMeta,
  GradientOrb, CustomCursor, SmoothScrollProvider, useCurrency
} from './shared.jsx'

const nav = [['Home', '/'], ['Services', '/services'], ['Our work', '/work'], ['About', '/about'], ['Contact', '/contact']]
const projects = concepts

/* ─────────────────────────────────────────────────────── */
export function AgencyLayout() {
  return (
    <SmoothScrollProvider>
      <div className="agency-theme">
        <CustomCursor />
        <ScrollProgress />
        <div className="concept-ribbon">
          <span><Asterisk size={12} /> {agency.name} · Lucknow, India · Working worldwide</span>
          <Link to="/contact">Start a conversation <ArrowRight size={12} /></Link>
        </div>
        <SiteNav
          brand={{ name: agency.name, mark: agency.mark, sub: 'LUCKNOW · INDIA' }}
          links={nav}
          cta={["Let's talk", '/contact']}
          mobileCta={['Talk through a project', '/contact']}
          backTo="/"
        />
        <PageTransition />
        <SiteFooter
          brand={{ name: agency.name, mark: agency.mark }}
          note="An independent digital engineering & design studio in Lucknow, India, crafting next-generation websites, web apps, and AI systems for ambitious brands worldwide."
          links={[
            ['Services', '/services'],
            ['Selected work', '/work'],
            ['About Kriya Labs', '/about'],
            ['Contact', '/contact'],
            ['Maison Ember demo', '/projects/cafe'],
            ['Northfield demo', '/projects/school'],
            ['UrbanNest demo', '/projects/business'],
            ['Email us', `mailto:${agency.email}`],
          ]}
        />
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
            <Eyebrow>Kriya Labs · Creative Action &amp; Engineering</Eyebrow>
          </motion.div>

          <motion.h1 custom={0.08} initial="hidden" animate="visible" variants={fade}>
            Make digital<br />
            work <em>harder.</em>
          </motion.h1>

          <motion.p className="hero-lead" custom={0.16} initial="hidden" animate="visible" variants={fade}>
            For growing businesses, Kriya Labs designs and builds websites, web apps, and practical AI automations around your customers, goals, and day-to-day work.
          </motion.p>

          <motion.div className="hero-actions" custom={0.24} initial="hidden" animate="visible" variants={fade}>
            <CtaLink to="/contact">Talk through a project</CtaLink>
            <ArrowLink to="/work">Explore concept work</ArrowLink>
          </motion.div>

          <motion.div className="hero-caption" custom={0.35} initial="hidden" animate="visible" variants={fade}>
            <span className="caption-line" />
            <span>Strategy, design &amp; engineering · Lucknow, India</span>
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
              <img src={img('photo-1414235077428-338989a2e8c0', 900)} alt="Warmly lit restaurant" />
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
              <img src={img('photo-1509062522246-3755977927d7', 500)} alt="Students collaborating" />
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
            <span style={{ fontSize: 9 }}>Kriya</span>
            <span style={{ fontSize: 9 }}>Labs · IN</span>
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
      `${agency.name} — Websites, Apps & AI Automation`,
      'Kriya Labs is a digital design and engineering studio in Lucknow, India, building websites, web apps, and practical AI automations for growing businesses.'
    )
  }, [])

  return (
    <main>
      <HeroSection />

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track" aria-hidden="true">
          {['Strategy', 'UI/UX Design', 'Full-Stack Dev', 'AI Automation', 'Mobile Apps', 'E-Commerce', 'Lucknow · India', 'Global Delivery'].map((x, i) => (
            <span key={i} style={{ padding: '0 28px', display: 'inline-flex', alignItems: 'center', gap: 28 }}>
              {x} <span style={{ color: 'var(--electric)', fontSize: 16 }}>✦</span>
            </span>
          ))}
          {['Strategy', 'UI/UX Design', 'Full-Stack Dev', 'AI Automation', 'Mobile Apps', 'E-Commerce', 'Lucknow · India', 'Global Delivery'].map((x, i) => (
            <span key={`b-${i}`} style={{ padding: '0 28px', display: 'inline-flex', alignItems: 'center', gap: 28 }}>
              {x} <span style={{ color: 'var(--electric)', fontSize: 16 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Intro */}
      <section className="section wrap">
        <div className="intro-section">
          <Reveal>
            <div>
              <Eyebrow>Rooted in Lucknow · Built for the world</Eyebrow>
              <h2 className="section-h2">Clarity first.<br /><em>Kriya always.</em></h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <p className="section-lead">
                "Kriya" means intentional, creative action. We bring strategy, design, and engineering together to make useful digital experiences for customers and the teams who serve them.
              </p>
              <ArrowLink to="/about">Get to know Kriya Labs</ArrowLink>
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
          <p>Explore deliverables and indicative {currency} starting prices. Final scope and schedule are confirmed after discovery.</p>
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
          <ArrowLink to="/services">Explore all {services.length} capabilities &amp; {currency} packages</ArrowLink>
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
          <p>Three self-initiated concepts showing how tailored digital experiences can support hospitality, education, and home-service businesses.</p>
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
                  <img src={p.preview} alt={`${p.name} concept website preview`} loading="lazy" />
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
              Whether you're a founder in Lucknow, Bengaluru, or half a world away, we work as an extension of your team with transparent sprints and direct communication.
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
      about: 'About Kriya Labs · Lucknow, India',
      contact: 'Start a project conversation',
    }
    updatePageMeta(
      `${titles[page]} — ${agency.name}`,
      `${titles[page]} from ${agency.name}, an independent digital engineering & design studio in Lucknow, India.`
    )
  }, [page])

  if (page === 'services') return (
    <main className="inner-page">
      <div className="wrap inner-hero">
        <Eyebrow>Services we provide · {currency} Pricing</Eyebrow>
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
                    <ArrowLink to="/contact">Book {name.split(' ')[0]} ({price[currency]})</ArrowLink>
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
        <p>Each interactive concept explores what thoughtful design and fast engineering can do for hospitality, education, and local service brands in India and beyond.</p>
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
        <p>{agency.name} is an independent digital design and engineering studio in Lucknow, India. We work directly with growing teams to plan and build websites, web apps, and practical AI automations.</p>
      </div>
      <section className="about-feature wrap">
        <img src="/previews/urbannest.png" alt="UrbanNest home-services concept website preview" loading="lazy" />
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
          ['Kriya (Intentional Action)', 'We start by understanding the people, market realities, and growth opportunities around your project.'],
          ['Engineering Craft', 'From 60fps animations to sub-second page loads, we care about the technical details that make products feel effortless.'],
          ['True Partnership', 'Based in Lucknow and working across timezones, we collaborate with honest conversations and shared ownership.']
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
          <MessageCircle size={18} />
          <a href={`mailto:${agency.email}`}>{agency.email}</a>
        </div>
      </div>
      <section className="wrap contact-layout">
        <div>
          <h2>A good place to begin.</h2>
          <p>Tell us the shape of the challenge, the people it matters to, and what a better outcome looks like for your business.</p>
          <div className="contact-detail">
            <span>Prefer email, call, or WhatsApp?</span>
            <a href={`mailto:${agency.email}`}>{agency.email} <ArrowRight size={14} /></a>
            <a href={`tel:+917007864516`}><Phone size={14} /> {agency.phone} (Call)</a>
            <a href={agency.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={14} /> {agency.phone} (WhatsApp)</a>
          </div>
          <div className="contact-detail">
            <span>Our studio</span>
            <b><MapPin size={14} /> {agency.location}</b>
          </div>
        </div>
        <DemoForm
          title={`Project enquiry (${currency})`}
          button="Open email draft"
          mode="mailto"
          recipient={agency.email}
          subject="Project enquiry — Kriya Labs"
          fields={[
            { name: 'name', label: 'Your name' },
            { name: 'email', label: 'Email address', type: 'email' },
            { name: 'phone', label: 'Phone / WhatsApp (+91)', type: 'tel', placeholder: '+91 70078 64516', required: false },
            { name: 'business', label: 'Company / Brand name', required: false },
            { name: 'service', label: 'Service required', options: ['Website design & development', 'Web application', 'Mobile application', 'AI automation', 'E-commerce', 'UI/UX design', 'API integration', 'Website optimization', 'Something else'], required: false },
            { name: 'budget', label: `Estimated budget (${currency})`, options: budgetOptions, required: false },
            { name: 'description', label: 'Tell us about your project', wide: true, required: false, placeholder: 'Goals, timeline, or links you would like to share…', multiline: true }
          ]}
        />
      </section>
    </main>
  )
}
