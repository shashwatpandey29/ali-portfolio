import { useEffect } from 'react'
import { ArrowUpRight, Dumbbell, HeartPulse, Users, Zap } from 'lucide-react'
import { img } from './config.js'
import {
  ArrowLink, CtaLink, CustomCursor, DemoForm, Eyebrow, PageTransition,
  ScrollProgress, SiteFooter, SiteNav, SmoothScrollProvider, updatePageMeta
} from './shared.jsx'

const base = '/projects/fitness'
const brand = { name: 'Forge Athletics', mark: 'F', sub: 'TRAIN WITH PURPOSE · LUCKNOW' }
const links = [['Home', base], ['Programs', `${base}/programs`], ['Coaches', `${base}/coaches`], ['Your first session', `${base}/book`]]
const programs = [
  { title: 'Strength lab', note: 'Build strength with a plan that meets you where you are.', detail: 'Small group · 50 min', icon: Dumbbell },
  { title: 'Conditioning club', note: 'Engine-building intervals with expert pacing and real recovery.', detail: 'All levels · 45 min', icon: HeartPulse },
  { title: 'Personal coaching', note: 'One-to-one coaching around your goals, history, and schedule.', detail: 'By appointment · 60 min', icon: Users },
]

export function FitnessLayout() {
  useEffect(() => { document.documentElement.dataset.theme = 'fitness' }, [])
  return <SmoothScrollProvider>
    <div className="demo-theme fitness-theme">
      <CustomCursor /><ScrollProgress />
      <div className="fitness-topline"><span>TRAIN WITH PURPOSE · MOVE FOR LIFE</span><span>GOMTI NAGAR · LUCKNOW</span></div>
      <SiteNav brand={brand} links={links} cta={['Book a trial', `${base}/book`]} theme="fitness" backTo={base} />
      <PageTransition />
      <SiteFooter brand={brand} home={base} note="A coaching-first training club built around strong foundations, good people, and progress that lasts." links={[
        ['Training programs', `${base}/programs`], ['Meet the coaches', `${base}/coaches`], ['Book a trial', `${base}/book`], ['Studio home', '/'],
      ]} />
    </div>
  </SmoothScrollProvider>
}

export function FitnessPage({ page }) {
  useEffect(() => {
    const titles = { home: 'Train with purpose', programs: 'Training programs', coaches: 'Meet your coaches', book: 'Book your first session' }
    updatePageMeta(`${titles[page]} — Forge Athletics`, `${titles[page]} at Forge Athletics, an interactive fitness club concept by elev8rix.`)
  }, [page])

  if (page === 'programs') return <main className="vertical-subpage wrap">
    <div className="vertical-heading"><Eyebrow>Find your kind of strong</Eyebrow><h1>Training with<br /><em>a little more intention.</em></h1><p>Choose a coached session that fits your goals, then build consistency one good hour at a time.</p></div>
    <div className="fitness-program-grid">{programs.map(({ title, note, detail, icon: Icon }, i) => <article className="fitness-program" key={title}><span className="vertical-index">0{i + 1}</span><Icon size={22} /><h2>{title}</h2><p>{note}</p><small>{detail}</small><ArrowLink to={`${base}/book`}>Try this session</ArrowLink></article>)}</div>
    <section className="fitness-callout"><div><Eyebrow>Not sure where to begin?</Eyebrow><h2>We’ll help you<br /><em>find your starting point.</em></h2></div><CtaLink to={`${base}/book`}>Book a no-pressure trial</CtaLink></section>
  </main>

  if (page === 'coaches') return <main className="vertical-subpage wrap">
    <div className="vertical-heading"><Eyebrow>Good coaching changes everything</Eyebrow><h1>Here for your<br /><em>next strong step.</em></h1><p>Our concept coaching team pairs careful instruction with the encouragement to keep showing up.</p></div>
    <section className="fitness-coach-feature"><img src={img('photo-1567013127542-490d757e51fc', 1300)} alt="Coach guiding an athlete through a strength session" loading="lazy" decoding="async" /><div><span className="vertical-index">HEAD COACH · STRENGTH</span><h2>Progress starts<br />with good form.</h2><p>Forge coaching is built around clear cues, smart progressions, and an environment where every level belongs.</p><CtaLink to={`${base}/book`}>Meet us on the floor</CtaLink></div></section>
    <p className="vertical-disclaimer">Forge Athletics is a fictional interactive concept. Team details and training information are illustrative.</p>
  </main>

  if (page === 'book') return <main className="vertical-subpage wrap">
    <div className="vertical-heading"><Eyebrow>Your first hour is on us</Eyebrow><h1>Start where<br /><em>you are.</em></h1><p>Tell us what you’re looking for. A coach will help you choose a comfortable first session.</p></div>
    <div className="vertical-form-layout"><DemoForm title="Book a trial session" button="Save trial request" storage="forge-athletics-trials" fields={[
      { name: 'name', label: 'Your name' }, { name: 'email', label: 'Email address', type: 'email' },
      { name: 'phone', label: 'Phone / WhatsApp', type: 'tel' },
      { name: 'goal', label: 'What would you like to work on?', options: ['Build strength', 'Improve fitness', 'Move with less pain', 'Find a routine', 'Not sure yet'] },
      { name: 'experience', label: 'Training experience', options: ['New to training', 'Getting back into it', 'Training regularly'] },
      { name: 'notes', label: 'Anything else we should know?', multiline: true, wide: true, required: false },
    ]} /><aside className="vertical-note"><Zap size={20} /><h2>No pressure.<br />Just a good first session.</h2><p>A coach will walk you through the space, understand your goals, and help you find the right class.</p><span>Interactive concept · Your request stays in this browser.</span></aside></div>
  </main>

  return <main className="fitness-home">
    <section className="fitness-hero"><img src={img('photo-1534438327276-14e5300c3a48', 2000)} alt="Training floor at a modern strength and conditioning gym" decoding="async" fetchPriority="high" /><div className="fitness-hero-shade" /><div className="fitness-hero-copy"><Eyebrow>Strength · Conditioning · Community</Eyebrow><h1>Earn your<br /><em>next level.</em></h1><p>Training that meets you where you are—and gives you a reason to come back tomorrow.</p><div className="hero-actions"><CtaLink to={`${base}/book`}>Book your first session</CtaLink><ArrowLink to={`${base}/programs`} light>Explore training</ArrowLink></div><div className="fitness-proof"><span><b>01</b> Coaching first</span><span><b>02</b> Progress that lasts</span><span><b>03</b> Every body belongs</span></div></div><a className="fitness-scroll" href="#training">SCROLL TO EXPLORE <ArrowUpRight size={13} /></a></section>
    <section className="fitness-intro wrap" id="training"><div><Eyebrow>Welcome to Forge</Eyebrow><h2>Strong is built<br /><em>together.</em></h2></div><p>Forge is a training club for people who want more from their movement—and less noise around getting started. Coaches, classes, and clear progressions help you make training your own.</p></section>
    <section className="wrap fitness-programs"><div className="vertical-section-head"><div><Eyebrow>Find your rhythm</Eyebrow><h2>Three ways to<br /><em>show up.</em></h2></div><ArrowLink to={`${base}/programs`}>All training programs</ArrowLink></div><div className="fitness-program-grid">{programs.map(({ title, note, detail, icon: Icon }, i) => <article className="fitness-program" key={title}><span className="vertical-index">0{i + 1}</span><Icon size={22} /><h3>{title}</h3><p>{note}</p><small>{detail}</small><ArrowLink to={`${base}/programs`}>Explore session <ArrowUpRight size={14} /></ArrowLink></article>)}</div></section>
    <section className="fitness-visit"><div className="fitness-visit-image"><img src={img('photo-1579758629938-03607ccdbaba', 1300)} alt="Athletes training together in a group class" loading="lazy" decoding="async" /></div><div><Eyebrow>Make the first move</Eyebrow><h2>Your first session<br /><em>starts right here.</em></h2><p>Meet a coach, explore the space, and try a session that fits. No pressure to have it all figured out.</p><CtaLink to={`${base}/book`}>Book a free trial</CtaLink></div></section>
    <p className="vertical-disclaimer wrap">Forge Athletics is a fictional interactive concept created by elev8rix. Contact details, schedules, and offers are illustrative.</p>
  </main>
}
