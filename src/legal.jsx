import { useEffect } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Building2, FileText, Scale, ShieldCheck } from 'lucide-react'
import { img } from './config.js'
import {
  ArrowLink, CtaLink, CustomCursor, DemoForm, Eyebrow, PageTransition,
  ScrollProgress, SiteFooter, SiteNav, SmoothScrollProvider, updatePageMeta
} from './shared.jsx'

const base = '/projects/legal'
const brand = { name: 'Alder & Rowe', mark: 'A/R', sub: 'COUNSEL WITH CLARITY' }
const links = [['Home', base], ['Practice areas', `${base}/services`], ['Our people', `${base}/people`], ['Contact', `${base}/contact`]]
const practices = [
  { title: 'Business & contracts', note: 'Practical counsel for agreements, partnerships, and day-to-day business decisions.', icon: BriefcaseBusiness },
  { title: 'Property & real estate', note: 'Clear guidance for property transactions, leases, and related due diligence.', icon: Building2 },
  { title: 'Disputes & resolution', note: 'Measured representation focused on understanding the issue and your options.', icon: Scale },
  { title: 'Employment matters', note: 'Thoughtful support for workplace policies, contracts, and employment questions.', icon: FileText },
]

export function LegalLayout() {
  useEffect(() => { document.documentElement.dataset.theme = 'legal' }, [])
  return <SmoothScrollProvider>
    <div className="demo-theme legal-theme">
      <CustomCursor /><ScrollProgress />
      <div className="legal-topline"><span>INDEPENDENT COUNSEL · INDIA</span><span>BY APPOINTMENT · MON–FRI</span></div>
      <SiteNav brand={brand} links={links} cta={['Request a consultation', `${base}/contact`]} theme="legal" backTo={base} />
      <PageTransition />
      <SiteFooter brand={brand} home={base} note="Clear advice. Considered advocacy. A steady hand through important decisions." links={[
        ['Practice areas', `${base}/services`], ['Our people', `${base}/people`], ['Request a consultation', `${base}/contact`], ['Studio home', '/'],
      ]} />
    </div>
  </SmoothScrollProvider>
}

export function LegalPage({ page }) {
  useEffect(() => {
    const titles = { home: 'Counsel with clarity', services: 'Practice areas', people: 'Our people', contact: 'Request a consultation' }
    updatePageMeta(`${titles[page]} — Alder & Rowe`, `${titles[page]} at Alder & Rowe, a fictional law firm concept by elev8rix.`)
  }, [page])

  if (page === 'services') return <main className="legal-subpage wrap">
    <div className="legal-page-heading"><Eyebrow>How we can help</Eyebrow><h1>Sound guidance<br /><em>for consequential moments.</em></h1><p>We listen first, explain your options in plain language, and agree on a considered way forward.</p></div>
    <div className="legal-practice-grid">{practices.map(({ title, note, icon: Icon }, i) => <article key={title}><span className="vertical-index">0{i + 1}</span><Icon size={21} /><h2>{title}</h2><p>{note}</p><ArrowLink to={`${base}/contact`}>Discuss your needs</ArrowLink></article>)}</div>
    <p className="vertical-disclaimer">Alder & Rowe is a fictional law firm concept. Practice descriptions are illustrative and do not constitute legal advice or a claim of professional services.</p>
  </main>

  if (page === 'people') return <main className="legal-subpage wrap">
    <div className="legal-page-heading"><Eyebrow>Care in every conversation</Eyebrow><h1>People first.<br /><em>Always.</em></h1><p>Good counsel starts with understanding what matters to you, then making the next step feel clearer.</p></div>
    <section className="legal-counsel-feature"><div className="legal-counsel-image"><img src={img('photo-1580894732444-8ecded7900cd', 1200)} alt="A lawyer reviewing case materials at a desk" loading="lazy" decoding="async" /></div><div><span className="vertical-index">FOUNDING PARTNER · CONCEPT PROFILE</span><h2>Listen closely.<br />Advise clearly.</h2><p>Our concept team is designed around responsive communication, careful preparation, and advice you can understand.</p><CtaLink to={`${base}/contact`}>Request an introduction</CtaLink></div></section>
    <p className="vertical-disclaimer">The people and credentials shown in this concept are fictional and for design demonstration only.</p>
  </main>

  if (page === 'contact') return <main className="legal-subpage wrap">
    <div className="legal-page-heading"><Eyebrow>A considered first conversation</Eyebrow><h1>Tell us what<br /><em>brings you here.</em></h1><p>Share a few non-confidential details and we’ll follow up about a suitable next step.</p></div>
    <div className="vertical-form-layout legal-form-layout"><DemoForm title="Consultation request" button="Save request" storage="alder-rowe-enquiries" fields={[
      { name: 'name', label: 'Your name' }, { name: 'email', label: 'Email address', type: 'email' },
      { name: 'phone', label: 'Phone number', type: 'tel', required: false },
      { name: 'area', label: 'Area of support', options: ['Business & contracts', 'Property & real estate', 'Disputes & resolution', 'Employment matters', 'Not sure yet'] },
      { name: 'timing', label: 'When would you like to speak?', options: ['As soon as possible', 'Within a week', 'I am exploring options'] },
      { name: 'message', label: 'Brief, non-confidential summary', multiline: true, wide: true, required: false, placeholder: 'Please do not include sensitive or confidential details.' },
    ]} /><aside className="vertical-note legal-note"><ShieldCheck size={22} /><h2>Your privacy<br />deserves care.</h2><p>Please keep this first message general. Do not share confidential information, documents, or sensitive personal details through this concept form.</p><span>Interactive concept · Your request stays in this browser.</span></aside></div>
  </main>

  return <main className="legal-home">
    <section className="legal-hero"><div className="legal-hero-copy"><Eyebrow>Independent counsel · India</Eyebrow><h1>Clear counsel.<br /><em>Steady perspective.</em></h1><p>Thoughtful legal guidance for people and businesses navigating important decisions.</p><div className="hero-actions"><CtaLink to={`${base}/contact`}>Request a consultation</CtaLink><ArrowLink to={`${base}/services`}>Explore practice areas</ArrowLink></div><span className="legal-hero-caption">LISTEN WELL · ADVISE CLEARLY · ACT WITH CARE</span></div><div className="legal-hero-image"><img src={img('photo-1589829545856-d10d557cf95f', 1300)} alt="Law books and a balanced scale in a considered office" decoding="async" fetchPriority="high" /><span>COUNSEL WITH CLARITY</span></div></section>
    <section className="legal-trust-strip"><span>Direct partner attention</span><span>Plain-language advice</span><span>Considered next steps</span></section>
    <section className="legal-intro wrap"><div><Eyebrow>When the details matter</Eyebrow><h2>Understand the issue.<br /><em>See the way forward.</em></h2></div><p>Legal questions can feel complicated before a conversation even begins. We make space to understand the facts, explain the options, and help you decide what to do next.</p></section>
    <section className="legal-practices wrap"><div className="vertical-section-head"><div><Eyebrow>Our focus</Eyebrow><h2>Practical advice.<br /><em>Personal attention.</em></h2></div><ArrowLink to={`${base}/services`}>View all practice areas</ArrowLink></div><div className="legal-practice-grid">{practices.slice(0, 3).map(({ title, note, icon: Icon }, i) => <article key={title}><span className="vertical-index">0{i + 1}</span><Icon size={21} /><h3>{title}</h3><p>{note}</p><ArrowLink to={`${base}/services`}>Learn more <ArrowUpRight size={14} /></ArrowLink></article>)}</div></section>
    <section className="legal-approach"><div className="legal-approach-image"><img src={img('photo-1450101499163-c8848c66ca85', 1200)} alt="Careful review of legal documents" loading="lazy" decoding="async" /></div><div><Eyebrow>A steady hand</Eyebrow><h2>Good counsel is<br /><em>clear, careful, human.</em></h2><p>We take time to understand what is at stake, answer your questions directly, and keep you informed as matters progress.</p><CtaLink to={`${base}/contact`}>Start a conversation</CtaLink></div></section>
    <p className="vertical-disclaimer wrap">Alder & Rowe is a fictional interactive concept by elev8rix. It is not a real law firm, and its content is not legal advice.</p>
  </main>
}
