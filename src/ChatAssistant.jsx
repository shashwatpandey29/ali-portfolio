import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, RotateCcw, Send, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const welcomeMessage = {
  role: 'assistant',
  content: "Hi, I'm Elev8rix — your guide to what our studio can build. Tell me what you're working on, or ask about websites, apps, AI agents, or getting started.",
}

const suggestions = ['I need a custom AI agent', 'What can you build for my business?', 'How do we get started?']

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([welcomeMessage])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const reducedMotion = useReducedMotion()
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)
  const widgetRef = useRef(null)

  function closeChat() {
    setOpen(false)
    requestAnimationFrame(() => launcherRef.current?.focus())
  }

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'end' })
  }, [messages, sending, reducedMotion])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = event => {
      if (event.key === 'Escape') closeChat()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = event => {
      if (!widgetRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  async function sendMessage(value = draft, retry = false) {
    const content = value.trim()
    if (!content || sending || content.length > 1200) return

    const userMessage = { role: 'user', content }
    const thread = retry
      ? messages.filter(message => !message.isError).slice(-12)
      : [...messages, userMessage].slice(-12)
    setMessages(thread)
    if (!retry) setDraft('')
    setSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ messages: thread }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        const error = new Error(result.error || 'The assistant is unavailable right now.')
        error.code = result.code
        throw error
      }
      setMessages(current => [...current, { role: 'assistant', content: result.reply }].slice(-13))
    } catch (error) {
      setMessages(current => [...current, {
        role: 'assistant',
        content: error.message || 'I hit a temporary issue. Please try again or email elev8rix@gmail.com.',
        isError: true,
        code: error.code,
      }].slice(-13))
    } finally {
      setSending(false)
      requestAnimationFrame(() => { if (open) inputRef.current?.focus() })
    }
  }

  function retryLastMessage() {
    const previousUserMessage = [...messages].reverse().find(message => message.role === 'user')
    if (previousUserMessage) sendMessage(previousUserMessage.content, true)
  }

  function resetConversation() {
    setMessages([welcomeMessage])
    setDraft('')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  return (
    <div className="elev8rix-chat-widget" ref={widgetRef}>
      <AnimatePresence>
        {open && (
          <motion.section
            id="elev8rix-chat-panel"
            className="elev8rix-chat-panel"
            role="dialog"
            aria-label="Chat with Elev8rix"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <header className="elev8rix-chat-header">
              <div className="elev8rix-chat-avatar" aria-hidden="true">
                <svg viewBox="0 0 42 42" focusable="false">
                  <path d="M21 8V4h6V2" fill="none" stroke="#e8e1ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="6" y="9" width="30" height="25" rx="9" fill="#19172f" stroke="#9a8be4" strokeWidth="1.5" />
                  <path d="M15 19v5m12-5v5m-9 4c2 1.5 4 1.5 6 0" fill="none" stroke="#a8edff" strokeWidth="2.3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="elev8rix-chat-heading">
                <strong>Elev8rix</strong>
                <span>Studio guide · AI assistant</span>
              </div>
              <button type="button" className="elev8rix-chat-icon-button" aria-label="Start a new conversation" title="New conversation" onClick={resetConversation} disabled={sending}>
                <RotateCcw size={16} />
              </button>
              <button type="button" className="elev8rix-chat-icon-button" aria-label="Close chat" onClick={closeChat}>
                <X size={18} />
              </button>
            </header>

            <div className="elev8rix-chat-messages" aria-live="polite" aria-relevant="additions text">
              <div className="elev8rix-chat-note">A little about what you're building is a great place to start.</div>
              {messages.map((message, index) => (
                <div className={`elev8rix-chat-message ${message.role === 'user' ? 'from-visitor' : 'from-elev8rix'}${message.isError ? ' is-error' : ''}`} key={`${index}-${message.role}`}>
                  {message.isError ? (
                    <>
                      <span>{message.content}</span>
                      <div className="elev8rix-chat-error-actions">
                        <button type="button" onClick={retryLastMessage} disabled={sending}>Try again</button>
                        <a href="mailto:elev8rix@gmail.com">Email the team</a>
                      </div>
                    </>
                  ) : message.content}
                </div>
              ))}
              {messages.length === 1 && !sending && (
                <div className="elev8rix-chat-suggestions" aria-label="Suggested questions">
                  {suggestions.map(suggestion => (
                    <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}<ArrowUpRight size={13} /></button>
                  ))}
                </div>
              )}
              {sending && (
                <div className="elev8rix-chat-message from-elev8rix elev8rix-chat-typing" role="status" aria-label="Elev8rix is replying">
                  <i /><i /><i />
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form className="elev8rix-chat-compose" onSubmit={event => { event.preventDefault(); sendMessage() }}>
              <label className="elev8rix-chat-sr-only" htmlFor="elev8rix-chat-input">Message Elev8rix</label>
              <textarea
                ref={inputRef}
                id="elev8rix-chat-input"
                value={draft}
                onChange={event => {
                  const nextDraft = event.target.value.slice(0, 1200)
                  setDraft(nextDraft)
                  event.currentTarget.style.height = 'auto'
                  event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 104)}px`
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Ask us anything…"
                aria-describedby="elev8rix-chat-compose-hint"
                rows={1}
                maxLength={1200}
                disabled={sending}
              />
              <button type="submit" className="elev8rix-chat-send" aria-label="Send message" disabled={sending || !draft.trim()}>
                <Send size={16} />
              </button>
              <div className="elev8rix-chat-compose-hint" id="elev8rix-chat-compose-hint">
                <span>Enter to send · Shift + Enter for a new line</span>
                <span>{draft.length}/1200</span>
              </div>
            </form>
            <div className="elev8rix-chat-footer">
              <span>AI can make mistakes. Please don't share sensitive information.</span>
              <Link to="/contact" onClick={() => setOpen(false)}>Talk to the team</Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        type="button"
        className={`elev8rix-chat-launcher${open ? ' is-open' : ''}`}
        aria-label={open ? 'Close Elev8rix chat' : 'Chat with Elev8rix'}
        aria-expanded={open}
        aria-controls={open ? 'elev8rix-chat-panel' : undefined}
        title={open ? 'Close chat' : 'Ask Elev8rix'}
        onClick={() => { if (open) closeChat(); else setOpen(true) }}
        whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      >
        <span className="elev8rix-chat-mascot" aria-hidden="true">
          <svg viewBox="0 0 100 112" role="presentation" focusable="false">
            <defs>
              <linearGradient id="elev8rix-bot-shell" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#B8D4FF" />
                <stop offset=".55" stopColor="#8EAEF4" />
                <stop offset="1" stopColor="#7187DB" />
              </linearGradient>
              <linearGradient id="elev8rix-bot-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8877F1" />
                <stop offset="1" stopColor="#5545BE" />
              </linearGradient>
            </defs>
            <ellipse className="mascot-shadow" cx="50" cy="104" rx="26" ry="4.5" />
            <g className="mascot-antenna" fill="none" stroke="#EEE9FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 12V7h8V3h8" />
              <circle cx="68" cy="3" r="2.3" fill="#A99AFF" stroke="none" />
            </g>
            <path className="mascot-arm mascot-arm-left" d="M25 67c-8 1-11 8-11 15 0 4 2 7 5 7s5-2 5-6l2-7" />
            <path className="mascot-arm mascot-arm-right" d="M75 67c8 1 11 8 11 15 0 4-2 7-5 7s-5-2-5-6l-2-7" />
            <path className="mascot-leg" d="M39 82v10c0 4 3 6 7 6s6-2 6-5v-9m0 0v11c0 3 2 5 6 5s7-2 7-6V82" />
            <path className="mascot-body" d="M34 65c0-5 5-8 16-8s16 3 16 8v20c0 4-4 7-8 7H42c-4 0-8-3-8-7z" fill="url(#elev8rix-bot-body)" />
            <path className="mascot-chest" d="M44 69h12" />
            <path className="mascot-shell" d="M18 34c0-7 5-12 11-13 3-9 11-14 21-14s18 5 21 14c7 1 11 6 11 13v25c0 8-6 14-14 14H32c-8 0-14-6-14-14z" fill="url(#elev8rix-bot-shell)" />
            <path className="mascot-shell-line" d="M24 28c2-3 5-4 8-4m36 0c3 0 6 1 8 4" />
            <rect className="mascot-face" x="27" y="31" width="46" height="35" rx="12" />
            <path className="mascot-eye" d="M38 44v7m24-7v7" />
            <path className="mascot-smile" d="M45 56c3 2 7 2 10 0" />
            <circle className="mascot-cheek" cx="33" cy="56" r="2" />
            <circle className="mascot-cheek" cx="67" cy="56" r="2" />
          </svg>
        </span>
        <span className="elev8rix-chat-close-mark" aria-hidden="true"><X size={13} strokeWidth={2.4} /></span>
        <span className="elev8rix-chat-tooltip" aria-hidden="true">{open ? 'Close chat' : 'Ask Elev8rix'}</span>
        <span className="elev8rix-chat-sr-only">{open ? 'Close Elev8rix chat' : 'Chat with Elev8rix'}</span>
      </motion.button>
    </div>
  )
}
