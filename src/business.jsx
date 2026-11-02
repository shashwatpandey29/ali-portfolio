import { useEffect } from 'react'
import { ArrowRight, Check, Clock3, Hammer, MapPin, ShieldCheck, Wrench } from 'lucide-react'
import { img } from './config.js'
import {
  ArrowLink, CtaLink, CustomCursor, DemoForm, Eyebrow, PageTransition,
  ScrollProgress, SiteFooter, SiteNav, SmoothScrollProvider, updatePageMeta, useCurrency
} from './shared.jsx'

const base = '/projects/business'
const brand = { name: 'UrbanNest', sub: 'HOME & INTERIORS · LUCKNOW', mark: 'U' }
const links = [['Home', base], ['Services', `${base}/services`], ['Our approach', `${base}/about`], ['Contact', `${base}/contact`]]
const fields = [
  { name: 'name', label: 'Your name' },
  { name: 'email', label: 'Email address', type: 'email' },
  { name: 'phone', label: 'Phone / WhatsApp (+91)', type: 'tel', placeholder: '+91 98765 43210' },
  { name: 'service', label: 'What do you need help with?', options: ['Full Home Renovation', 'Modular Kitchen & Interiors', 'Plumbing & Waterproofing', 'Electrical & Smart Home', 'Painting & Wall Finishes', 'Annual Property Care'] },
  { name: 'property', label: 'Property type', options: ['Independent House / Villa', 'Apartment / Flat', 'Commercial / Office', 'Other'] },
  { name: 'date', label: 'Preferred site visit date', type: 'date', min: new Date().toISOString().slice(0, 10), required: false },
  { name: 'details', label: 'Tell us about the project', multiline: true, wide: true, placeholder: 'Locality in Lucknow, approximate sq. ft., or what you would like us to inspect…' },
]
const offerings = [
  ['Full home renovation', 'Thoughtful structural and civil improvements that make your home feel brand new.', 'photo-1600607687939-ce8a6c25118c', Hammer, { INR: 'From ₹45,000', USD: 'From $600' }],
  ['Plumbing & waterproofing', 'Leak detection, bathroom fittings, and terrace waterproofing handled with a clear plan.', 'photo-1621905251918-48416bd8575a', Wrench, { INR: 'From ₹1,499', USD: 'From $45' }],
  ['Electrical & smart home', 'Safe wiring upgrades, inverter setups, and modern architectural lighting.', 'photo-1621905252507-b35492cc74b4', ShieldCheck, { INR: 'From ₹999', USD: 'From $35' }],
  ['Painting & wall finishes', 'Dust-free preparation, texture coats, and weather-shield exterior finishes.', 'photo-1562259949-e8e7689d7828', Check, { INR: '₹18 / sq.ft.', USD: '$0.35 / sq.ft.' }],
  ['Modular interiors', 'Custom wardrobes, modular kitchens, and space-saving woodwork built to last.', 'photo-1600210492486-724fe5c67fb0', Hammer, { INR: 'From ₹85,000', USD: 'From $1,100' }],
  ['Annual property care', 'Responsive on-call maintenance for apartments, villas, and NRI-owned homes.', 'photo-1600566753086-00f18fb6b3ea', Wrench, { INR: '₹14,999 / yr', USD: '$220 / yr' }],
]

export function BusinessLayout() {
  useEffect(() => { document.documentElement.dataset.theme = 'business' }, [])
  return (
    <SmoothScrollProvider>
      <div className="demo-theme business-theme">
        <CustomCursor />
        <ScrollProgress />
        <div className="business-topline">
          <span>Trusted Home &amp; Interior Care across Lucknow</span>
          <a href="tel:+919876543210"><span className="status-dot" /> Site visits available today · +91 98765 43210</a>
        </div>
        <SiteNav brand={brand} links={links} cta={['Get a free estimate', `${base}/book`]} theme="business" backTo={base} />
        <main><PageTransition /></main>
        <SiteFooter
          brand={brand}
          home={base}
          note="Good work in your home should feel transparent, punctual, and stress-free from day one."
          links={[
            ['Services', `${base}/services`],
            ['Our approach', `${base}/about`],
            ['Request an estimate', `${base}/book`],
            ['Contact', `${base}/contact`],
          ]}
        />
      </div>
    </SmoothScrollProvider>
  )
}

export function BusinessPage({ page }) {
  useEffect(() => {
    const titles = { home: 'A better home starts here', services: 'Home & interior services', about: 'Our approach', book: 'Request a free site visit', contact: 'Contact UrbanNest Lucknow' }
    updatePageMeta(`${titles[page]} — UrbanNest Services`, `${titles[page]} from UrbanNest, a home renovation and property care concept in Lucknow crafted by Kriya Labs.`)
  }, [page])

  if (page === 'home') return (
    <>
      <section className="business-hero">
        <img src={img('photo-1600607687939-ce8a6c25118c', 1800)} alt="Light-filled, thoughtfully renovated home interior" />
        <div className="business-shade" />
        <div className="wrap business-hero-copy">
          <Eyebrow>Considered home services · Lucknow</Eyebrow>
          <h1>A better home<br />starts <em>right here.</em></h1>
          <p>From quick repairs to complete modular renovations across Gomti Nagar, Aliganj, and Hazratganj—UrbanNest makes caring for your home effortless.</p>
          <div className="hero-actions">
            <CtaLink to={`${base}/book`}>Book a free site visit</CtaLink>
            <ArrowLink to={`${base}/services`} light>Explore our services</ArrowLink>
          </div>
          <div className="business-trust">
            <span><Check size={15} /> Itemized INR / USD estimates</span>
            <span><Check size={15} /> Background-verified Lucknow team</span>
          </div>
        </div>
        <div className="business-hero-label">
          <span>Thoughtful improvements</span>
          <span>01 / HOME &amp; INTERIORS</span>
        </div>
      </section>

      <section className="business-intro wrap">
        <div>
          <Eyebrow>Care for your place</Eyebrow>
          <h2>Make home work<br /><em>better for you.</em></h2>
        </div>
        <p>A home is always evolving. We’re here to make civil work, interiors, and everyday repairs feel less complicated—with dedicated project supervisors and clear timelines.</p>
        <ArrowLink to={`${base}/about`}>How we work</ArrowLink>
      </section>

      <section className="business-services">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>Ways we can help</Eyebrow>
              <h2>Good hands for<br /><em>the work ahead.</em></h2>
            </div>
            <ArrowLink to={`${base}/services`}>All 6 services</ArrowLink>
          </div>
          <div className="business-offer-grid">
            {offerings.slice(0, 3).map((x, i) => <ServiceCard item={x} index={i} key={x[0]} />)}
          </div>
        </div>
      </section>

      <section className="business-process">
        <div className="wrap process-grid">
          <div>
            <Eyebrow>Simple from the start</Eyebrow>
            <h2>A clear plan.<br /><em>A clean finish.</em></h2>
            <p>We believe quality craftsmanship is only half the experience. From the first site inspection, you’ll know the exact scope, materials, and schedule.</p>
            <CtaLink to={`${base}/book`}>Talk about your project</CtaLink>
          </div>
          <div className="business-steps">
            {[
              ['01', 'Tell us what you need', 'Share your locality in Lucknow and a few details about the repair or renovation.'],
              ['02', 'Free site inspection', 'Our engineer visits your home to take measurements and discuss material options.'],
              ['03', 'Transparent BOQ estimate', 'You receive a clear, itemized estimate with zero hidden charges before work begins.'],
              ['04', 'Supervised execution', 'We protect your furniture, share daily WhatsApp updates, and hand over a spotless space.'],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <b>{t}</b>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="business-reassurance wrap">
        <div className="reassure-icon"><ShieldCheck size={34} /></div>
        <div>
          <Eyebrow>A neighbourly note</Eyebrow>
          <h2>Good work starts<br /><em>with listening.</em></h2>
          <p>UrbanNest is an interactive local service concept crafted by Kriya Labs to showcase high-converting lead generation and trust-building design.</p>
        </div>
        <div className="quote-placeholder">
          <span>Illustrative client feedback</span>
          <p>“They handled our entire 3BHK renovation in Gomti Nagar on schedule and kept every promise.”</p>
          <b>— Sample Homeowner Review</b>
        </div>
      </section>
    </>
  )

  if (page === 'services') return (
    <>
      <div className="business-page-hero">
        <div className="wrap">
          <Eyebrow>What we can help with</Eyebrow>
          <h1>Good hands for<br /><em>your home.</em></h1>
          <p>Whether it’s a single repair or a complete interior overhaul, start with a conversation and we’ll help you plan the right next step. Toggle ₹ INR / $ USD in the header.</p>
          <CtaLink to={`${base}/book`}>Request an estimate</CtaLink>
        </div>
      </div>
      <section className="wrap business-service-list">
        {offerings.map((item, i) => <ServiceCard item={item} index={i} key={item[0]} />)}
      </section>
    </>
  )

  if (page === 'about') return (
    <>
      <div className="business-page-hero">
        <div className="wrap">
          <Eyebrow>A little about UrbanNest</Eyebrow>
          <h1>Respect for your<br /><em>home and time.</em></h1>
          <p>We believe home services should feel human: honest advice, branded materials, a clear schedule, and craftspeople who care about the details.</p>
        </div>
      </div>
      <section className="business-story wrap">
        <img src={img('photo-1600607687939-ce8a6c25118c', 1100)} alt="A calm, well cared for living space" />
        <div>
          <Eyebrow>Our approach</Eyebrow>
          <h2>Make the work<br /><em>feel workable.</em></h2>
          <p>UrbanNest is a property services concept engineered by Kriya Labs around customer trust. It starts with listening well, explaining material choices clearly, and respecting your home at every step.</p>
          <p>From waterproofing a terrace before monsoon to designing a modular kitchen, the experience leaves you feeling looked after.</p>
          <ArrowLink to={`${base}/services`}>See what we can help with</ArrowLink>
        </div>
      </section>
      <section className="business-values">
        <div className="wrap values-grid">
          {[
            ['Respect', 'For your home, your neighbours, your schedule, and the way you like things done.'],
            ['Clarity', 'Plain language and an itemized BOQ estimate before any work begins.'],
            ['Care', 'Thoughtful details, from laser-level finishes to deep-cleaning before handover.'],
          ].map(([t, d], i) => (
            <article key={t}>
              <Eyebrow>0{i + 1}</Eyebrow>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="team-note wrap">
        <Eyebrow>The people who make it happen</Eyebrow>
        <h2>Friendly faces.<br /><em>Skilled hands.</em></h2>
        <p>In a live deployment, this section highlights verified site engineers, interior designers, and master technicians across Lucknow.</p>
        <div className="team-placeholder">
          <div>UN</div>
          <span>Verified Civil Engineers &amp; Interior Supervisors · Lucknow</span>
        </div>
      </section>
    </>
  )

  if (page === 'book') return (
    <>
      <div className="business-page-hero">
        <div className="wrap">
          <Eyebrow>Let’s take a look</Eyebrow>
          <h1>Tell us about<br /><em>your project.</em></h1>
          <p>Share what you need and we’ll arrange a convenient site visit. No pressure, just a helpful conversation.</p>
        </div>
      </div>
      <section className="wrap business-form-page">
        <DemoForm title="Book a free site visit & estimate" button="Request site visit" storage="urbannest-quotes" fields={fields} />
        <div className="quote-side">
          <img src={img('photo-1600566753086-00f18fb6b3ea', 750)} alt="Home interior ready for thoughtful improvements" />
          <h3>What happens next?</h3>
          <p>This interactive concept form by Kriya Labs saves your request locally in your browser so you can test the lead flow.</p>
          <div><Check size={16} /> Transparent itemized estimates</div>
          <div><Check size={16} /> Dedicated Lucknow site supervisor</div>
        </div>
      </section>
    </>
  )

  return (
    <>
      <div className="business-page-hero">
        <div className="wrap">
          <Eyebrow>Good to hear from you</Eyebrow>
          <h1>Here when<br /><em>you need us.</em></h1>
          <p>Have a quick question or want to talk through a renovation idea in Lucknow? Send us a note and we’ll be in touch.</p>
        </div>
      </div>
      <section className="contact-layout wrap business-contact">
        <div>
          <h2>UrbanNest Home Services</h2>
          <p><MapPin size={17} /> Serving Gomti Nagar, Hazratganj, Indira Nagar &amp; across Lucknow</p>
          <p><Clock3 size={17} /> Monday–Saturday · 9:00 am–7:00 pm</p>
          <p><a href="tel:+919876543210">+91 98765 43210</a><br /><a href="mailto:care@urbannest.in">care@urbannest.in</a></p>
          <a className="map-link" href="https://maps.google.com/?q=Lucknow+Uttar+Pradesh" target="_blank" rel="noreferrer">Service area map <ArrowRight size={15} /></a>
          <a className="whatsapp-link" href="https://wa.me/919876543210" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowRight size={15} /></a>
          <p className="business-disclaimer">Interactive concept crafted by Kriya Labs · Contact details are illustrative.</p>
        </div>
        <DemoForm
          title="Send us a note"
          button="Send message"
          storage="urbannest-contact"
          fields={[
            { name: 'name', label: 'Your name' },
            { name: 'email', label: 'Email address', type: 'email' },
            { name: 'phone', label: 'Phone / WhatsApp (+91)', type: 'tel', required: false },
            { name: 'service', label: 'Service of interest', options: offerings.map(o => o[0]), required: false },
            { name: 'message', label: 'How can we help?', multiline: true, wide: true },
          ]}
        />
      </section>
    </>
  )
}

function ServiceCard({ item, index }) {
  const [title, desc, photo, Icon, price = {}] = item
  const [currency] = useCurrency()
  return (
    <article className="business-service-card">
      <div className="b-service-photo">
        <img src={img(photo, 800)} alt={`${title} service concept`} loading="lazy" />
        <span>0{index + 1} · {price[currency] || 'Custom quote'}</span>
      </div>
      <div className="b-service-content">
        <Icon size={21} strokeWidth={1.5} />
        <h3>{title}</h3>
        <p>{desc}</p>
        <ArrowLink to={`${base}/book`}>Ask about this service</ArrowLink>
      </div>
    </article>
  )
}
