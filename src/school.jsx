import { useEffect } from 'react'
import { BookOpen, CalendarDays, MapPin, MoveUpRight } from 'lucide-react'
import { img } from './config.js'
import {
  ArrowLink, CtaLink, CustomCursor, DemoForm, Eyebrow, PageTransition,
  ScrollProgress, SiteFooter, SiteNav, SmoothScrollProvider, updatePageMeta
} from './shared.jsx'

const base = '/projects/school'
const brand = { name: 'Northfield', sub: 'INTERNATIONAL ACADEMY · LUCKNOW', mark: 'N' }
const links = [['Home', base], ['Our school', `${base}/about`], ['Academics', `${base}/academics`], ['Admissions', `${base}/admissions`], ['Contact', `${base}/contact`]]
const formFields = [
  { name: 'parent', label: 'Parent / guardian name' },
  { name: 'email', label: 'Email address', type: 'email' },
  { name: 'phone', label: 'Phone / WhatsApp (+91)', type: 'tel', placeholder: '+91 98765 43210', required: false },
  { name: 'student', label: 'Student name' },
  { name: 'grade', label: 'Stage of interest', options: ['Early Years (Nursery–KG)', 'Primary (Grades 1–5)', 'Middle School (Grades 6–8)', 'Senior School (Grades 9–12 · CBSE / IB)'] },
  { name: 'message', label: 'Tell us a little more', multiline: true, wide: true, required: false, placeholder: 'Questions about curriculum, campus tours, or admissions…' },
]

export function SchoolLayout() {
  useEffect(() => { document.documentElement.dataset.theme = 'school' }, [])
  return (
    <SmoothScrollProvider>
      <div className="demo-theme school-theme">
        <CustomCursor />
        <ScrollProgress />
        <div className="school-banner">
          <span>Learning with curiosity. Growing with purpose · Gomti Nagar Campus, Lucknow</span>
          <span>Admissions for 2026–27 Academic Session <b>Now open</b></span>
        </div>
        <SiteNav brand={brand} links={links} cta={['Enquire now', `${base}/admissions`]} theme="school" backTo={base} />
        <main><PageTransition /></main>
        <SiteFooter
          brand={brand}
          home={base}
          note="A welcoming K–12 learning community in Lucknow for curious minds and thoughtful futures."
          links={[
            ['Our school', `${base}/about`],
            ['Academics', `${base}/academics`],
            ['Admissions', `${base}/admissions`],
            ['Contact', `${base}/contact`],
          ]}
        />
      </div>
    </SmoothScrollProvider>
  )
}

export function SchoolPage({ page }) {
  useEffect(() => {
    const titles = { home: 'Learn with curiosity', about: 'Our school', academics: 'Learning at every stage', admissions: 'Admissions 2026–27', contact: 'Contact our campus' }
    updatePageMeta(`${titles[page]} — Northfield International Academy`, `${titles[page]} at Northfield International Academy, a K–12 school concept in Gomti Nagar, Lucknow crafted by elev8rix.`)
  }, [page])

  if (page === 'home') return (
    <>
      <section className="school-hero">
        <img src={img('photo-1509062522246-3755977927d7', 1800)} alt="Bright classroom where students learn together" />
        <div className="school-hero-overlay" />
        <div className="wrap school-hero-content">
          <Eyebrow>A place to become · Gomti Nagar, Lucknow</Eyebrow>
          <h1>Curious minds.<br /><span>Brighter futures.</span></h1>
          <p>At Northfield, learning is a shared adventure. We help every child discover what they care about—combining Indian values with global inquiry.</p>
          <CtaLink to={`${base}/about`} secondary>Discover Northfield</CtaLink>
        </div>
        <div className="school-hero-foot">
          <span>Learn. Belong. Become.</span>
          <span>K–12 · CBSE &amp; IB Pathways</span>
        </div>
      </section>

      <section className="school-intro wrap">
        <div>
          <Eyebrow>Welcome to Northfield</Eyebrow>
          <h2>Room to learn.<br /><span>Space to grow.</span></h2>
        </div>
        <div>
          <p>We’re a progressive K–12 campus in Lucknow from early years through Grade 12. With dedicated educators, modern STEM &amp; arts studios, and lush green grounds, every student finds their voice.</p>
          <ArrowLink to={`${base}/about`}>Meet our school</ArrowLink>
        </div>
      </section>

      <section className="school-programs">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>Learning, at every stage</Eyebrow>
              <h2>Find your <span>next.</span></h2>
            </div>
            <ArrowLink to={`${base}/academics`}>Explore academics</ArrowLink>
          </div>
          <div className="program-grid">
            {[
              ['01', 'Primary (Grades 1–5)', 'A joyful start to lifelong learning, built on foundational literacy, numeracy, arts, and wonder.', 'photo-1503454537195-1dcabb73ffb9'],
              ['02', 'Middle School (Grades 6–8)', 'The space to connect ideas across sciences and humanities, build confidence, and collaborate.', 'photo-1509062522246-3755977927d7'],
              ['03', 'Senior School (Grades 9–12)', 'Rigorous academic preparation, robotics & innovation labs, and university career counselling.', 'photo-1503676260728-1c00da094a0b'],
            ].map(([n, title, desc, photo]) => (
              <article key={title} className="program-card">
                <img src={img(photo, 700)} alt={`${title} students learning together`} loading="lazy" />
                <div>
                  <span>{n} / 03</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <ArrowLink to={`${base}/academics`}>Explore this stage</ArrowLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="school-difference wrap">
        <div className="difference-photo">
          <img src={img('photo-1529390079861-591de354faf5', 1000)} alt="Students working together on a classroom project" loading="lazy" />
          <span>Learning happens together.</span>
        </div>
        <div>
          <Eyebrow>What makes a day here</Eyebrow>
          <h2>Known by name.<br /><span>Encouraged to think.</span></h2>
          <p>Our educators know that every child arrives with their own strengths, questions, and way of seeing the world. We keep class sizes small so every student flourishes.</p>
          <div className="school-facts">
            <div><b>15:1</b><span>Student-to-teacher ratio for personal mentorship</span></div>
            <div><b>12 Acres</b><span>Green Wi-Fi enabled campus in Gomti Nagar Extension</span></div>
            <div><b>100%</b><span>Holistic focus on academics, sports, and performing arts</span></div>
          </div>
          <ArrowLink to={`${base}/about`}>Our approach to learning</ArrowLink>
        </div>
      </section>

      <section className="school-events">
        <div className="wrap events-inner">
          <div>
            <Eyebrow>Come and see for yourself</Eyebrow>
            <h2>Your Northfield<br /><span>story starts here.</span></h2>
            <p>We’d love to welcome your family for a guided campus tour in Lucknow. Start a conversation with our admissions counsellors.</p>
            <CtaLink to={`${base}/admissions`}>Explore admissions</CtaLink>
          </div>
          <div className="event-card">
            <CalendarDays size={21} />
            <span>SATURDAY CAMPUS TOURS · 10:00 AM</span>
            <h3>Open mornings</h3>
            <p>Meet our principal and faculty, tour the classrooms and sports arena, and ask the questions that matter to your family.</p>
            <ArrowLink to={`${base}/contact`}>Book a campus tour</ArrowLink>
          </div>
        </div>
      </section>
    </>
  )

  if (page === 'about') return (
    <>
      <div className="school-page-hero">
        <div className="wrap">
          <Eyebrow>Our school</Eyebrow>
          <h1>A community for<br /><span>every possibility.</span></h1>
          <p>Northfield is a school where care and curiosity go hand in hand—and where each student is encouraged to become more fully themselves.</p>
        </div>
      </div>
      <section className="school-story wrap">
        <img src={img('photo-1529390079861-591de354faf5', 1050)} alt="Students collaborating in a bright classroom" />
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2>Growing together,<br /><span>every day.</span></h2>
          <p>Northfield International Academy is an interactive school concept designed by elev8rix around a simple belief: young people learn best when they feel safe enough to ask questions and supported enough to take thoughtful risks.</p>
          <p>Our community brings together students, families, and educators across Lucknow who care about character as much as academic excellence.</p>
        </div>
      </section>
      <section className="school-values">
        <div className="wrap values-grid">
          {[
            ['Our mission', 'To create a learning community where every student is known, challenged, and encouraged to grow.'],
            ['Our vision', 'A future where young people meet the world with confidence, compassion, and lifelong curiosity.'],
            ['Our promise', 'We show up with care, listen closely, and partner with parents at every step.'],
          ].map(([t, d], i) => (
            <article key={t}>
              <Eyebrow>0{i + 1} / NORTHFIELD</Eyebrow>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="school-leadership wrap">
        <Eyebrow>From our Principal</Eyebrow>
        <blockquote>“A great education helps children see what’s possible—and gives them the values and confidence to take part in making it real.”</blockquote>
        <p>— Dr. Kavita Raghavan · Principal (Illustrative Profile)</p>
      </section>
    </>
  )

  if (page === 'academics') return (
    <>
      <div className="school-page-hero">
        <div className="wrap">
          <Eyebrow>Academics at Northfield</Eyebrow>
          <h1>Learning made<br /><span>meaningful.</span></h1>
          <p>Strong foundations, generous questions, and the space to connect ideas across STEM, humanities, languages, and arts.</p>
        </div>
      </div>
      <section className="academic-list wrap">
        {[
          ['01', 'Primary Education (Grades 1–5)', 'Curiosity comes first. Through hands-on exploration, bilingual literacy, mathematics, creative arts, and outdoor play, students build strong foundations.', 'photo-1503454537195-1dcabb73ffb9'],
          ['02', 'Middle School (Grades 6–8)', 'Students connect ideas across subjects, build coding and lab skills, and develop independence and teamwork.', 'photo-1509062522246-3755977927d7'],
          ['03', 'Senior School (Grades 9–12)', 'Thoughtful academic challenge across Science, Commerce, and Humanities streams with dedicated mentorship for Indian and global universities.', 'photo-1503676260728-1c00da094a0b'],
        ].map(([n, t, d, photo]) => (
          <article key={n}>
            <div className="academic-num">{n}</div>
            <div>
              <h2>{t}</h2>
              <p>{d}</p>
              <span>NEP 2020 Aligned · Inquiry-led curriculum</span>
            </div>
            <img src={img(photo, 700)} alt={`${t} at Northfield`} loading="lazy" />
          </article>
        ))}
      </section>
      <section className="school-bottom-cta">
        <div className="wrap">
          <h2>Good questions start<br /><span>great conversations.</span></h2>
          <CtaLink to={`${base}/admissions`}>Ask about admissions</CtaLink>
        </div>
      </section>
    </>
  )

  if (page === 'admissions') return (
    <>
      <div className="school-page-hero">
        <div className="wrap">
          <Eyebrow>Admissions 2026–27</Eyebrow>
          <h1>Start with a<br /><span>conversation.</span></h1>
          <p>Choosing a school is personal. We’re here to help your family explore whether Northfield feels like the right home for your child.</p>
        </div>
      </div>
      <section className="admissions-grid wrap">
        <div>
          <h2>Getting to know<br /><span>Northfield.</span></h2>
          <p>There’s no better way to understand a school than to visit our campus in Gomti Nagar. Here’s a simple guide to the process.</p>
          <div className="admissions-steps">
            {[
              ['01', 'Submit an online enquiry', 'Share a few details about your child and the grade you’re exploring.'],
              ['02', 'Campus tour & interaction', 'We’ll arrange a personal tour so you can meet our teachers and see a school day in action.'],
              ['03', 'Registration & onboarding', 'Our admissions team guides you through documentation, fee structure, and transport routes.'],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="documents">
            <BookOpen size={19} />
            <div>
              <b>Helpful documents</b>
              <p>Birth certificate, previous school report cards, Aadhaar / ID copy, and passport-size photographs as your application progresses.</p>
            </div>
          </div>
          <p className="school-demo-note">This is an interactive education concept built by elev8rix. No real admissions status is represented.</p>
        </div>
        <DemoForm title="Ask our admissions team" button="Send admissions enquiry" storage="northfield-admissions" fields={formFields} />
      </section>
    </>
  )

  return (
    <>
      <div className="school-page-hero">
        <div className="wrap">
          <Eyebrow>We’re here to help</Eyebrow>
          <h1>Come say<br /><span>hello.</span></h1>
          <p>We’d be happy to answer a question or schedule a campus visit for your family in Lucknow.</p>
        </div>
      </div>
      <section className="contact-layout wrap school-contact">
        <div>
          <h2>Northfield International Academy</h2>
          <p><MapPin size={18} /> Sector 7, Gomti Nagar Extension<br />Lucknow, Uttar Pradesh 226010</p>
          <p>School office hours<br />Monday–Saturday · 8:00 am–3:30 pm</p>
          <p>+91 522 401 8820<br />admissions@northfield.edu.in</p>
          <a className="map-link" href="https://maps.google.com/?q=Gomti+Nagar+Extension+Lucknow" target="_blank" rel="noreferrer">Open in Google Maps <MoveUpRight size={16} /></a>
          <div className="school-map">NORTHFIELD <span><MapPin size={22} /></span> GOMTI NAGAR · LUCKNOW</div>
        </div>
        <DemoForm title="Send a question" button="Send an enquiry" storage="northfield-contact" fields={formFields} />
      </section>
    </>
  )
}
