import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock3, MapPin } from 'lucide-react'
import { img } from './config.js'
import {
  ArrowLink, CtaLink, CustomCursor, DemoForm, Eyebrow, PageTransition,
  ScrollProgress, SiteFooter, SiteNav, SmoothScrollProvider, updatePageMeta, useCurrency
} from './shared.jsx'

const base = '/projects/cafe'
const brand = { name: 'Maison Ember', mark: 'M.', sub: 'HAZRATGANJ · LUCKNOW' }
const links = [['Home', base], ['Our menu', `${base}/menu`], ['Our story', `${base}/about`], ['Find us', `${base}/contact`]]
const dishes = [
  { name: 'Burrata & charred fig', category: 'Starters', priceINR: '640', priceUSD: '18', description: 'Creamy artisanal burrata, charred fig, basil oil, wood-fired sourdough.', image: 'photo-1608039829572-78524f79c4c7', vegetarian: true },
  { name: 'Wild mushroom truffle risotto', category: 'Main Course', priceINR: '890', priceUSD: '28', description: 'Arborio rice, Himalayan morels & wild mushrooms, aged parmesan, thyme.', image: 'photo-1476124369491-e7addf5db371', vegetarian: true },
  { name: 'Smoked herb roast chicken', category: 'Main Course', priceINR: '980', priceUSD: '32', description: 'Free-range chicken, Gondhoraj lemon, garden herbs, silky pan jus.', image: 'photo-1532550907401-a500c9a57435' },
  { name: 'Blood orange olive oil cake', category: 'Desserts', priceINR: '480', priceUSD: '14', description: 'Candied citrus, whipped mascarpone, toasted Kashmir almond.', image: 'photo-1578985545062-69928b1d9587', vegetarian: true },
  { name: 'Whipped ricotta hotcakes', category: 'Breakfast', priceINR: '560', priceUSD: '19', description: 'House ricotta, Mahabaleshwar berries, organic honey butter.', image: 'photo-1528207776546-365bb710ee93', vegetarian: true },
  { name: 'Ember botanical spritz', category: 'Beverages', priceINR: '420', priceUSD: '16', description: 'Zero-proof botanical aperitivo, blood orange, sparkling tonic, rosemary.', image: 'photo-1551024709-8f23befc6f87', vegetarian: true },
]
const cats = ['All', 'Breakfast', 'Starters', 'Main Course', 'Desserts', 'Beverages']
const fieldset = (kind) => [
  { name: 'name', label: 'Your name' },
  { name: 'email', label: 'Email address', type: 'email' },
  ...(kind === 'book'
    ? [
        { name: 'phone', label: 'Phone / WhatsApp (+91)', type: 'tel', placeholder: '+91 98765 43210' },
        { name: 'date', label: 'Date', type: 'date', min: new Date().toISOString().slice(0, 10) },
        { name: 'time', label: 'Preferred time', type: 'time' },
        { name: 'guests', label: 'Guests', type: 'number', min: '1', max: '12' },
      ]
    : []),
  { name: kind === 'book' ? 'requests' : 'message', label: kind === 'book' ? 'Special requests' : 'How can we help?', multiline: true, required: false, wide: true, placeholder: 'A little more detail…' },
]

export function CafeLayout() {
  useEffect(() => { document.documentElement.dataset.theme = 'cafe' }, [])
  return (
    <SmoothScrollProvider>
      <div className="demo-theme cafe-theme">
        <CustomCursor />
        <ScrollProgress />
        <div className="cafe-topline">
          <span>Seasonal wood-fired cooking · Hazratganj, Lucknow</span>
          <span><Clock3 size={13} /> Dinner &amp; All-day Café · Tue–Sun · 12pm–11pm</span>
        </div>
        <SiteNav brand={brand} links={links} cta={['Book a table', `${base}/book`]} theme="cafe" backTo={base} />
        <PageTransition />
        <SiteFooter
          brand={brand}
          home={base}
          note="Good food. Good company. Always room at our table in the heart of Lucknow."
          links={[
            ['Menu', `${base}/menu`],
            ['Our story', `${base}/about`],
            ['Book a table', `${base}/book`],
            ['Find us', `${base}/contact`],
          ]}
        />
      </div>
    </SmoothScrollProvider>
  )
}

export function CafePage({ page }) {
  useEffect(() => {
    const titles = { home: 'A neighbourhood table in Lucknow', menu: 'Seasonal menu', about: 'Our story', contact: 'Find us in Hazratganj', book: 'Reserve your table' }
    updatePageMeta(`${titles[page]} — Maison Ember`, `${titles[page]} at Maison Ember, a contemporary neighbourhood restaurant & café concept in Hazratganj, Lucknow crafted by elev8rix.`)
  }, [page])

  if (page === 'home') return (
    <main className="cafe-home">
      <section className="cafe-hero">
        <img src={img('photo-1414235077428-338989a2e8c0', 1800)} alt="Warm, candlelit dining room at Maison Ember" decoding="async" fetchPriority="high" />
        <div className="cafe-hero-shade" />
        <div className="cafe-hero-content">
          <Eyebrow>Seasonal, soulful, shared · Hazratganj</Eyebrow>
          <h1>A neighbourhood<br />table, <i>reimagined.</i></h1>
          <p>Honest local produce, wood-fired craft, and the kind of unhurried Lucknow evening that makes you stay for one more cup.</p>
          <div className="hero-actions">
            <CtaLink to={`${base}/book`} secondary>Reserve your seat</CtaLink>
            <ArrowLink to={`${base}/menu`} light>See the menu</ArrowLink>
          </div>
        </div>
        <span className="cafe-hero-caption">26° 51′ N · 80° 56′ E · Hazratganj, Lucknow</span>
      </section>

      <section className="cafe-intro wrap">
        <div>
          <Eyebrow>Welcome to Maison Ember</Eyebrow>
          <h2>Fire at the heart.<br /><i>Season on the plate.</i></h2>
        </div>
        <p>We cook with regional harvests, make room for one more at the table, and believe the best meals are the ones that turn into long conversations.</p>
        <ArrowLink to={`${base}/about`}>A little about us</ArrowLink>
      </section>

      <section className="cafe-feature wrap">
        <div className="cafe-feature-image">
          <img src={img(dishes[1].image, 950)} alt="Wild mushroom risotto served at Maison Ember" loading="lazy" decoding="async" />
        </div>
        <div className="cafe-feature-copy">
          <Eyebrow>From the kitchen</Eyebrow>
          <h2>Good things<br />grow <i>slowly.</i></h2>
          <p>Our menu follows the season and the market. Familiar comfort, carefully sourced from Indian farms and artisanal producers.</p>
          <div className="dish-highlight">
            <span>Tonight’s signature</span>
            <b>Wild mushroom truffle risotto</b>
            <span>Himalayan morels · aged parmesan · fresh thyme</span>
          </div>
          <ArrowLink to={`${base}/menu`}>Explore the full menu</ArrowLink>
        </div>
      </section>

      <section className="cafe-dishes wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>For the table</Eyebrow>
            <h2>A taste of <i>what’s on.</i></h2>
          </div>
          <ArrowLink to={`${base}/menu`}>All dishes</ArrowLink>
        </div>
        <div className="dish-grid">
          {dishes.slice(0, 3).map(dish => <DishCard dish={dish} key={dish.name} />)}
        </div>
      </section>

      <section className="cafe-visit">
        <div className="wrap visit-inner">
          <div>
            <Eyebrow>Come find us</Eyebrow>
            <h2>There’s a place<br /><i>for you here.</i></h2>
            <p><MapPin size={16} /> 18 Park Road, Hazratganj, Lucknow, UP 226001</p>
          </div>
          <div className="visit-hours">
            <span>Tuesday – Thursday</span><b>12:00 – 10:30 pm</b>
            <span>Friday – Sunday</span><b>12:00 – 11:30 pm</b>
            <span>Monday</span><b>Kitchen rest day</b>
          </div>
          <CtaLink to={`${base}/book`}>Save your seat</CtaLink>
        </div>
      </section>
    </main>
  )

  if (page === 'menu') return (
    <main className="cafe-subpage wrap">
      <div className="sub-hero">
        <Eyebrow>From our kitchen, with care</Eyebrow>
        <h1>What’s <i>in season.</i></h1>
        <p>Our menus change with the harvest. Pricing is displayed automatically in your regional currency.</p>
      </div>
      <MenuBrowser />
    </main>
  )

  if (page === 'about') return (
    <main className="cafe-subpage">
      <div className="wrap sub-hero">
        <Eyebrow>The Maison Ember story</Eyebrow>
        <h1>A little fire.<br /><i>A lot of heart.</i></h1>
        <p>We wanted to create a space in Lucknow that felt like the warmest part of being invited home.</p>
      </div>
      <section className="cafe-story wrap">
        <img src={img('photo-1559339352-11d035aa65de', 1100)} alt="The intimate interior of Maison Ember" loading="lazy" decoding="async" />
        <div>
          <Eyebrow>Our kind of hospitality (Tehzeeb)</Eyebrow>
          <h2>Local hands.<br /><i>Open doors.</i></h2>
          <p>Maison Ember began with a simple question: what if dining out felt less hurried and more like gathering around a family table? We build our menu around regional growers, artisanal bakers, and small-batch roasters.</p>
          <p>There’s no rush to turn the table. Just honest ingredients, Lucknow warmth, and space to reconnect.</p>
          <div className="chef-note">
            <span>In the kitchen</span>
            <b>Chef Aanya Mehra</b>
            <span>Cooking by season, always.</span>
          </div>
        </div>
      </section>
      <div className="cafe-about-gallery wrap">
        {['photo-1517248135467-4c7edcad34c4', 'photo-1414235077428-338989a2e8c0', 'photo-1559339352-11d035aa65de'].map((id, i) => (
          <img key={id} src={img(id, 700)} alt={['A table set for dinner', 'An evening in the dining room', 'The restaurant interior'][i]} loading="lazy" decoding="async" />
        ))}
      </div>
    </main>
  )

  if (page === 'book') return (
    <main className="cafe-subpage wrap">
      <div className="sub-hero">
        <Eyebrow>We’ll set the table</Eyebrow>
        <h1>Save your <i>seat.</i></h1>
        <p>Planning an evening with us in Hazratganj? Share a few details and we’ll hold a table for you in this interactive demo.</p>
      </div>
      <div className="form-page">
        <DemoForm title="Table reservation request" button="Request a table" storage="maison-ember-bookings" fields={fieldset('book')} />
        <aside className="reservation-aside">
          <img src={img('photo-1414235077428-338989a2e8c0', 650)} alt="Warm evening dining at Maison Ember" loading="lazy" decoding="async" />
          <h3>A note from elev8rix</h3>
          <p>This is an interactive hospitality concept built by elev8rix. Your reservation request is saved locally in your browser.</p>
          <span>For private dining over 8 guests, please reach out directly.</span>
        </aside>
      </div>
    </main>
  )

  return (
    <main className="cafe-subpage wrap">
      <div className="sub-hero">
        <Eyebrow>Find your way here</Eyebrow>
        <h1>Come on <i>in.</i></h1>
        <p>We’d love to host you. For a quick question or a private celebration, we’re listening.</p>
      </div>
      <div className="contact-layout cafe-contact">
        <div className="cafe-contact-info">
          <h2>Maison Ember</h2>
          <p><MapPin size={16} />18 Park Road, Hazratganj<br />Lucknow, Uttar Pradesh 226001</p>
          <p><Clock3 size={16} />Tue–Thu 12–10:30pm · Fri–Sun 12–11:30pm</p>
          <a className="map-link" href="https://maps.google.com/?q=Hazratganj+Lucknow" target="_blank" rel="noreferrer">Open in Google Maps <ArrowRight size={15} /></a>
          <div className="map-card">
            <span className="map-pin"><MapPin size={21} /></span>
            <b>MAISON EMBER</b>
            <small>HAZRATGANJ · LUCKNOW</small>
          </div>
        </div>
        <DemoForm title="Send us a note" button="Send note" storage="maison-ember-messages" fields={fieldset('contact')} />
      </div>
    </main>
  )
}

function MenuBrowser() {
  const [active, setActive] = useState('All')
  const reduceMotion = useReducedMotion()
  const shown = active === 'All' ? dishes : dishes.filter(d => d.category === active)
  return (
    <>
      <div className="menu-filters" role="group" aria-label="Filter dishes by category">
        {cats.map(c => (
          <button
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={active === c ? 'active' : ''}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.p key={active} className="menu-count" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
        {shown.length} {shown.length === 1 ? 'dish' : 'dishes'} · prepared fresh in our kitchen
      </motion.p>
      <motion.div layout className="dish-grid menu-grid">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map(d => <DishCard dish={d} reduceMotion={reduceMotion} key={d.name} />)}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

function DishCard({ dish, reduceMotion }) {
  const [currency] = useCurrency()
  const displayPrice = currency === 'INR' ? `₹${dish.priceINR}` : `$${dish.priceUSD}`
  return (
    <motion.article
      layout
      className="dish-card"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: reduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="dish-image">
        <img src={img(dish.image, 760)} alt={dish.name} loading="lazy" decoding="async" />
        <span>{dish.category}</span>
      </div>
      <div className="dish-title">
        <h3>
          {dish.name}
          {dish.vegetarian && <span className="veg-dot" aria-label="Vegetarian" title="Vegetarian" />}
        </h3>
        <b>{displayPrice}</b>
      </div>
      <p>{dish.description}</p>
    </motion.article>
  )
}
