import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import config from '../config'
import './ChatWidget.css'

const { name, shortName, phone, phoneTel, city, region } = config.business
const areas = config.business.serviceAreas.filter((a) => a !== 'And More').join(', ')

const responses = [
  { keys: ['hi', 'hello', 'hey', 'sup', 'yo'], reply: `Hey! 👋 Welcome to ${shortName}. I can help you with pricing, services, or getting a free estimate. What can I help you with today?` },
  { keys: ['price', 'cost', 'how much', 'pricing', 'rate'], reply: "Our pricing depends on your lawn size and service type. The best way to get an accurate number is our free on-site estimate — no obligation. Want me to help you set one up?" },
  { keys: ['services', 'what do you do', 'offer', 'what do you offer'], reply: "We offer lawn maintenance, sod installation, irrigation systems, mulch & river rock, tree services, and full landscaping. Which one are you interested in?" },
  { keys: ['estimate', 'quote', 'free estimate'], reply: `We'd love to give you a free estimate! You can use our Lawn Estimator tool to get an instant range, or call us at ${phone} to schedule an on-site visit. Which works better for you?` },
  { keys: ['area', 'service area', city.toLowerCase(), 'where', 'location'], reply: `We serve ${areas} and surrounding ${region} areas. Are you in one of these areas?` },
  { keys: ['hours', 'available', 'when', 'schedule', 'open'], reply: `We're available ${config.business.hours}. Want to schedule something?` },
  { keys: ['license', 'insured', 'bonded', 'insurance'], reply: `Yes! ${name} is fully licensed, insured, and bonded. You're in good hands 👍` },
  { keys: ['spanish', 'español', 'habla', 'espanol'], reply: "¡Sí, se habla español! No hay problema. ¿En qué podemos ayudarte?" },
  { keys: ['lawn maintenance', 'mowing', 'mow', 'edging', 'trimming'], reply: "Our lawn maintenance includes mowing, edging, trimming, and blowing. We offer weekly and bi-weekly plans tailored to your yard. Want a free estimate?" },
  { keys: ['irrigation', 'sprinkler', 'drip'], reply: "We install and repair sprinkler and drip irrigation systems. We'll design a custom setup for your property. Want us to come take a look?" },
  { keys: ['sod', 'turf', 'grass installation', 'new lawn'], reply: "We do professional sod and turf installation — perfect for getting an instant lush lawn. We handle prep, delivery, and installation. Interested in a free estimate?" },
  { keys: ['mulch', 'river rock', 'ground cover', 'rock'], reply: "We install decorative mulch and river rock to protect your plants and boost curb appeal. It's one of our most popular add-ons!" },
  { keys: ['tree', 'stump', 'trimming trees'], reply: "We offer tree trimming, removal, and stump grinding by experienced pros. Safety first — we handle it all cleanly and efficiently." },
  { keys: ['hardscape', 'cement', 'landscaping', 'concrete', 'patio', 'walkway'], reply: "We do full landscaping, cement work, garden design, and hardscape construction. These are custom projects — best to schedule a free consultation." },
  { keys: ['thank', 'thanks', 'appreciate'], reply: `You're welcome! 😊 Don't hesitate to reach out anytime. You can also call or text us at ${phone}.` },
  { keys: ['bye', 'goodbye', 'later', 'see ya'], reply: `Thanks for chatting! Have a great day 🌿 Call us anytime at ${phone}.` },
]

const DEFAULT_REPLY = `That's a great question! For the most accurate answer, give us a call or text at ${phone} and we'll help you out personally 👊`

function getReply(input) {
  const lower = input.toLowerCase()
  for (const r of responses) {
    if (r.keys.some((k) => lower.includes(k))) return r.reply
  }
  return DEFAULT_REPLY
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [hasOpened, setHasOpened] = useState(false)
  const [showDot, setShowDot] = useState(false)
  const bodyRef = useRef(null)
  const location = useLocation()

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return
    const timer = setTimeout(() => {
      if (!hasOpened) {
        setShowDot(true)
      }
    }, 8000)
    return () => clearTimeout(timer)
  }, [location.pathname, hasOpened])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages])

  if (isMobile) return null

  const handleOpen = () => {
    setOpen(true)
    setShowDot(false)
    if (!hasOpened) {
      setHasOpened(true)
      setMessages([{ from: 'bot', text: "Hey there! 👋 Need help with your lawn? I'm here to answer any questions!" }])
    }
  }

  const handleSend = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((prev) => [...prev, { from: 'user', text }])
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getReply(text) }])
    }, 600)
  }

  return (
    <>
      {!open && (
        <button className="chat-bubble" onClick={handleOpen} aria-label="Open chat">
          {showDot && <span className="chat-bubble__dot" />}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
          <span className="chat-bubble__label">Ask Us</span>
        </button>
      )}

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <img src="/Images/straightedgelogo.png" alt={shortName} className="chat-header__logo" />
            <div className="chat-header__info">
              <span className="chat-header__name">{shortName} Assistant</span>
              <span className="chat-header__status">Typically replies instantly</span>
            </div>
            <button className="chat-header__close" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg--${m.from}`}>
                <div className="chat-msg__bubble">{m.text}</div>
              </div>
            ))}
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              autoFocus
            />
            <button type="submit" aria-label="Send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
