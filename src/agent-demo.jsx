import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Bot, BookOpen, CalendarClock, Check, ChevronRight, CircleHelp, Headset, MessageCircle, RotateCcw, Send, ShieldCheck, Sparkles, UserRound, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Eyebrow, updatePageMeta } from './shared.jsx'

const agentProfiles = [
  {
    id: 'hospitality',
    short: 'Hospitality',
    name: 'Ember Concierge',
    business: 'Maison Ember · Guest support',
    initial: 'Hello! I’m Ember Concierge. I can help with the menu, visit planning, and common guest questions. What would you like to know?',
    knowledge: ['Guest information guide', 'Sample menu & dietary notes', 'Reservation policy'],
    tools: ['Reservation handoff', 'Team inbox'],
    prompts: ['Do you have vegetarian options?', 'Can I reserve a table for two?'],
    answer: message => {
      const text = message.toLowerCase()
      if (/book|reserv|table|visit|time|tonight/.test(text)) return {
        content: 'I can help prepare a reservation request for two. Share your preferred day and time, and the Maison Ember team can confirm availability. This preview does not place a real booking.',
        source: 'Reservation policy · confirmation stays with the team',
        action: 'Prepare a reservation handoff',
      }
      if (/veget|vegan|allerg|diet|menu|food/.test(text)) return {
        content: 'The sample menu includes seasonal vegetarian dishes. For allergies or dietary restrictions, I’d flag the request for the restaurant team to confirm directly before you order.',
        source: 'Sample menu · dietary requests require team confirmation',
        action: 'Ask the restaurant team',
      }
      return {
        content: 'I can help guests understand the menu, plan a visit, and prepare a reservation request. If a question needs a current availability check, I’ll pass it to the team instead of guessing.',
        source: 'Guest information guide · demo knowledge base',
        action: 'Show guest support options',
      }
    },
  },
  {
    id: 'fitness',
    short: 'Fitness',
    name: 'Forge Training Guide',
    business: 'Forge Athletics · Member support',
    initial: 'Welcome to Forge Athletics. I can explain the training programs, help you prepare for a first visit, or route a question to the coaching team.',
    knowledge: ['Programs & class guide', 'First visit checklist', 'Member support notes'],
    tools: ['Trial enquiry handoff', 'Coach follow-up'],
    prompts: ['What should I expect on my first visit?', 'Can I talk to a coach?'],
    answer: message => {
      const text = message.toLowerCase()
      if (/coach|person|human|talk|someone/.test(text)) return {
        content: 'Absolutely. I can prepare a note for the coaching team with your preferred contact method and goal. A coach should confirm details such as availability and suitability with you.',
        source: 'Member support notes · coach follow-up',
        action: 'Prepare a coach handoff',
      }
      if (/first|trial|start|begin|visit/.test(text)) return {
        content: 'For a first visit, bring comfortable training clothes and arrive a little early to meet the team. The coach can talk through your goals and help you choose an appropriate starting point. This concept does not make medical or training assessments.',
        source: 'First visit checklist · coaching guidance',
        action: 'Explore the fitness demo',
      }
      return {
        content: 'I can explain the sample programs and help with a first-visit enquiry. For personal training advice, injuries, or health concerns, I’ll route you to a qualified coach rather than make a recommendation here.',
        source: 'Programs & class guide · demo knowledge base',
        action: 'Ask a coach',
      }
    },
  },
  {
    id: 'legal',
    short: 'Legal',
    name: 'Alder Intake Assistant',
    business: 'Alder & Rowe · New enquiries',
    initial: 'Hello. I can explain how a first enquiry works and help identify the right next step. Please avoid sharing confidential or sensitive details in this demonstration.',
    knowledge: ['Practice overview', 'Consultation process', 'Privacy & intake guide'],
    tools: ['Consultation request handoff', 'Private team follow-up'],
    prompts: ['How does a first consultation work?', 'Can I speak to a person?'],
    answer: message => {
      const text = message.toLowerCase()
      if (/person|lawyer|solicitor|human|speak|talk/.test(text)) return {
        content: 'Of course. I can point you to the firm’s contact route so a person can follow up. Please keep case details and documents out of this demo chat.',
        source: 'Privacy & intake guide · human review required',
        action: 'Request a human follow-up',
      }
      if (/consult|first meeting|appointment|process/.test(text)) return {
        content: 'A first consultation usually begins with a conflict check and a brief outline of the matter, followed by the firm confirming whether it can assist. This prototype offers general process information only, not legal advice.',
        source: 'Consultation process · illustrative information',
        action: 'View the legal concept',
      }
      return {
        content: 'I can explain the enquiry process and share general information about the sample practice areas. I can’t assess a case or give legal advice; a qualified lawyer would need to review that with you.',
        source: 'Practice overview · no legal advice',
        action: 'Speak with the team',
      }
    },
  },
]

function BotAvatar({ small = false }) {
  return <span className={`agent-avatar${small ? ' small' : ''}`}><Bot size={small ? 16 : 19} strokeWidth={1.8} /></span>
}

function getDemoReply(profile, message) {
  return profile.answer(message)
}

export default function AgentDemoPage() {
  const [activeId, setActiveId] = useState(agentProfiles[0].id)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const feedRef = useRef(null)
  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const profile = agentProfiles.find(agent => agent.id === activeId) || agentProfiles[0]

  useEffect(() => {
    updatePageMeta('Custom AI agent demo — elev8rix', 'Try a simulated branded AI agent grounded in business knowledge, connected to tools, and designed with clear human handoff.', '/projects/ai-agent')
  }, [])

  useEffect(() => {
    setMessages([{ role: 'assistant', content: profile.initial }])
    setDraft('')
    setTyping(false)
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }, [activeId])

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [messages, typing, reduceMotion])

  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current) }, [])

  function sendMessage(value = draft) {
    const text = value.trim()
    if (!text || typing || text.length > 500) return
    setMessages(current => [...current, { role: 'user', content: text }])
    setDraft('')
    setTyping(true)
    timerRef.current = window.setTimeout(() => {
      setMessages(current => [...current, { role: 'assistant', ...getDemoReply(profile, text) }])
      setTyping(false)
    }, reduceMotion ? 80 : 420)
  }

  function resetConversation() {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setMessages([{ role: 'assistant', content: profile.initial }])
    setDraft('')
    setTyping(false)
    inputRef.current?.focus()
  }

  return (
    <main className="inner-page agent-demo-page">
      <section className="wrap agent-demo-hero">
        <Link to="/work" className="agent-back-link"><ArrowLeft size={14} /> All concepts</Link>
        <div className="agent-demo-heading">
          <div>
            <Eyebrow>Custom AI agents · Interactive prototype</Eyebrow>
            <h1>Knowledgeable by design.<br /><em>Thoughtful by default.</em></h1>
            <p>Switch the business, ask a question, and see how a purpose-built agent can use approved knowledge, guide a next step, and bring a person in when it matters.</p>
          </div>
          <div className="agent-demo-hero-note"><Sparkles size={18} /><span>One agent experience, shaped around each team’s voice, knowledge, and workflow.</span></div>
        </div>
      </section>

      <section className="wrap agent-demo-workspace" aria-label="Interactive custom AI agent demo">
        <div className="agent-demo-topline">
          <div><span className="agent-demo-label">CHOOSE A DEMO AGENT</span><span className="agent-demo-prototype"><span /> Prototype simulation</span></div>
          <span className="agent-demo-session">SESSION 01 · LOCAL PREVIEW</span>
        </div>

        <div className="agent-persona-tabs" role="tablist" aria-label="Choose business agent">
          {agentProfiles.map(agent => (
            <button
              key={agent.id}
              type="button"
              role="tab"
              aria-selected={activeId === agent.id}
              className={`agent-persona-tab${activeId === agent.id ? ' active' : ''}`}
              onClick={() => setActiveId(agent.id)}
            >
              <span className="agent-tab-icon">{agent.id === 'legal' ? <ShieldCheck size={16} /> : agent.id === 'fitness' ? <Workflow size={16} /> : <MessageCircle size={16} />}</span>
              <span>{agent.short}<small>{agent.name}</small></span>
              {activeId === agent.id && <Check size={15} />}
            </button>
          ))}
        </div>

        <div className="agent-demo-layout">
          <section className="agent-chat-card" aria-label={`${profile.name} conversation`}>
            <header className="agent-chat-header">
              <div className="agent-chat-identity"><BotAvatar /><span><strong>{profile.name}</strong><small>{profile.business}</small></span></div>
              <button type="button" className="agent-reset-button" onClick={resetConversation} aria-label="Reset conversation"><RotateCcw size={14} /> <span>Reset</span></button>
            </header>

            <div ref={feedRef} className="agent-chat-feed" aria-live="polite" aria-relevant="additions text">
              <div className="agent-feed-date">A SAMPLE CONVERSATION</div>
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={`${activeId}-${index}`}
                    className={`agent-message-row ${message.role}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {message.role === 'assistant' && <BotAvatar small />}
                    <div className="agent-message-stack">
                      <div className="agent-message-bubble">{message.content}</div>
                      {message.source && <div className="agent-source"><BookOpen size={11} /> {message.source}</div>}
                      {message.action && <div className="agent-action-preview"><CalendarClock size={13} /><span>{message.action}</span><span className="agent-action-preview-label">PREVIEW</span></div>}
                    </div>
                    {message.role === 'user' && <span className="agent-user-avatar"><UserRound size={15} /></span>}
                  </motion.div>
                ))}
              </AnimatePresence>
              {typing && <div className="agent-message-row assistant"><BotAvatar small /><div className="agent-typing" aria-label="Agent is responding"><i /><i /><i /></div></div>}
            </div>

            {messages.length === 1 && (
              <div className="agent-prompt-row">
                <span>TRY ASKING</span>
                {profile.prompts.map(prompt => <button key={prompt} type="button" onClick={() => sendMessage(prompt)}>{prompt}<ChevronRight size={13} /></button>)}
              </div>
            )}

            <form className="agent-composer" onSubmit={event => { event.preventDefault(); sendMessage() }}>
              <label className="elev8rix-chat-sr-only" htmlFor="agent-demo-input">Ask {profile.name} a question</label>
              <input
                id="agent-demo-input"
                ref={inputRef}
                value={draft}
                maxLength={500}
                onChange={event => setDraft(event.target.value)}
                placeholder={`Ask ${profile.short.toLowerCase()} support a question…`}
                disabled={typing}
              />
              <button type="submit" disabled={!draft.trim() || typing} aria-label="Send message"><Send size={15} /></button>
            </form>
            <p className="agent-demo-disclaimer"><CircleHelp size={12} /> Demonstration only. Responses are prewritten examples; no real system, booking, or business data is connected.</p>
          </section>

          <aside className="agent-config-card" aria-label="Demo agent configuration">
            <div className="agent-config-heading"><div><Eyebrow>Under the hood</Eyebrow><h2>Built around your business.</h2></div><span className="agent-config-spark"><Sparkles size={17} /></span></div>
            <p className="agent-config-copy">A production agent can be tailored to your approved information, brand voice, and the point where your team should take over.</p>

            <div className="agent-config-group">
              <div className="agent-config-label"><BookOpen size={14} /><span>Knowledge sources</span><span className="agent-config-count">{profile.knowledge.length}</span></div>
              <ul>{profile.knowledge.map(item => <li key={item}><span className="agent-file-icon"><BookOpen size={12} /></span><span>{item}</span><Check size={13} /></li>)}</ul>
            </div>

            <div className="agent-config-group">
              <div className="agent-config-label"><Workflow size={14} /><span>Connected actions</span><span className="agent-config-count">{profile.tools.length}</span></div>
              <ul>{profile.tools.map(item => <li key={item}><span className="agent-tool-icon"><ArrowUpRight size={12} /></span><span>{item}</span><span className="agent-tool-state">PREVIEW</span></li>)}</ul>
            </div>

            <div className="agent-human-card"><Headset size={16} /><span><strong>Human handoff stays available</strong><small>Route uncertainty and sensitive requests to your team.</small></span></div>
            <Link to="/contact" className="agent-build-cta">Build an agent for your team <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </section>

      <section className="wrap agent-demo-footnote">
        <span><ShieldCheck size={15} /> Clear boundaries, review steps, and privacy rules are designed into the real workflow.</span>
        <Link to="/services">Explore custom AI agent services <ArrowUpRight size={14} /></Link>
      </section>
    </main>
  )
}
