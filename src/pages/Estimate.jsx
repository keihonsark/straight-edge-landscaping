import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import './Estimate.css'

const SERVICES = [
  {
    id: 'mowing',
    icon: '🌱',
    name: 'Lawn Mowing & Trimming',
    prices: { small: [45, 65], medium: [75, 95], large: [110, 145] },
    hasFreqDiscount: true,
  },
  {
    id: 'weed',
    icon: '🧹',
    name: 'Weed Control',
    prices: { small: [60, 80], medium: [90, 120], large: [140, 180] },
  },
  {
    id: 'fertilizer',
    icon: '🌿',
    name: 'Fertilizer Application',
    prices: { small: [55, 75], medium: [80, 110], large: [120, 160] },
  },
  {
    id: 'aeration',
    icon: '🕳️',
    name: 'Aeration',
    prices: { small: [75, 100], medium: [120, 160], large: [180, 240] },
  },
  {
    id: 'cleanup',
    icon: '🍂',
    name: 'Yard Clean-Up',
    prices: { small: [150, 200], medium: [225, 300], large: [300, 450] },
  },
  {
    id: 'sod',
    icon: '🏡',
    name: 'Sod Installation',
    prices: { small: [600, 900], medium: [1200, 1800], large: [2200, 3200] },
  },
  {
    id: 'tree',
    icon: '🌳',
    name: 'Tree Trimming',
    perUnit: [150, 250],
    unitLabel: 'How many trees?',
  },
  {
    id: 'stump',
    icon: '🪵',
    name: 'Stump Grinding',
    perUnit: [100, 175],
    unitLabel: 'How many stumps?',
  },
  {
    id: 'sprinkler-install',
    icon: '💧',
    name: 'Sprinkler System Install',
    flat: [800, 1800],
  },
  {
    id: 'sprinkler-repair',
    icon: '🔧',
    name: 'Sprinkler Repair',
    flat: [75, 200],
  },
  {
    id: 'drip',
    icon: '💦',
    name: 'Drip Irrigation',
    flat: [300, 750],
  },
  {
    id: 'hedge',
    icon: '✂️',
    name: 'Hedge Trimming',
    prices: { small: [80, 120], medium: [120, 180], large: [180, 280] },
  },
]

function getPriceHint(svc) {
  if (svc.flat) return `$${svc.flat[0]}–$${svc.flat[1]}`
  if (svc.perUnit) return `$${svc.perUnit[0]}–$${svc.perUnit[1]} each`
  return `From $${svc.prices.small[0]}`
}

function calcTotal(selected, units, yardSize, area, frequency) {
  let low = 0
  let high = 0

  selected.forEach((id) => {
    const svc = SERVICES.find((s) => s.id === id)
    if (!svc) return

    let sLow, sHigh

    if (svc.flat) {
      sLow = svc.flat[0]
      sHigh = svc.flat[1]
    } else if (svc.perUnit) {
      const count = units[id] || 1
      sLow = svc.perUnit[0] * count
      sHigh = svc.perUnit[1] * count
    } else {
      const p = svc.prices[yardSize] || svc.prices.medium
      sLow = p[0]
      sHigh = p[1]

      if (svc.hasFreqDiscount) {
        if (frequency === 'weekly') { sLow *= 0.85; sHigh *= 0.85 }
        else if (frequency === 'biweekly') { sLow *= 0.9; sHigh *= 0.9 }
      }
    }

    low += sLow
    high += sHigh
  })

  if (area === 'both') {
    low *= 1.6
    high *= 1.6
  }

  return [Math.round(low), Math.round(high)]
}

function formatPrice(n) {
  return n.toLocaleString('en-US')
}

function AnimatedPrice({ low, high }) {
  const [currentLow, setCurrentLow] = useState(0)
  const [currentHigh, setCurrentHigh] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    started.current = false
    const start = performance.now()
    const duration = 1200
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrentLow(Math.round(eased * low))
      setCurrentHigh(Math.round(eased * high))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [low, high])

  return (
    <span className="est-price__amount">
      ${formatPrice(currentLow)} – ${formatPrice(currentHigh)}
    </span>
  )
}

const STEP_TITLES = [
  "Let's Start With You",
  'Tell Us About Your Yard',
  'What Do You Need?',
  'Your Free Estimate',
]

export default function Estimate() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Step 1
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')

  // Step 2
  const [yardSize, setYardSize] = useState('medium')
  const [area, setArea] = useState('both')
  const [frequency, setFrequency] = useState('onetime')

  // Step 3
  const [selected, setSelected] = useState([])
  const [units, setUnits] = useState({})
  const [urgency, setUrgency] = useState('asap')

  const toggleService = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const setUnitCount = (id, val) => {
    setUnits((prev) => ({ ...prev, [id]: Math.max(1, parseInt(val) || 1) }))
  }

  const [totalLow, totalHigh] = calcTotal(selected, units, yardSize, area, frequency)

  const canNext = () => {
    if (step === 1) return phone.trim().length >= 7
    if (step === 2) return true
    if (step === 3) return selected.length > 0
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const body = {
      firstName,
      lastName,
      phone,
      address,
      city,
      yardSize,
      area,
      frequency,
      services: selected.map((id) => {
        const svc = SERVICES.find((s) => s.id === id)
        return svc ? `${svc.name}${svc.perUnit ? ` (x${units[id] || 1})` : ''}` : id
      }).join(', '),
      urgency,
      estimateRange: `$${formatPrice(totalLow)} – $${formatPrice(totalHigh)}`,
    }

    try {
      /* TODO: Replace with client Formspree endpoint */
      await fetch(config.business.formspreeId ? `https://formspree.io/f/${config.business.formspreeId}` : '#', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  const yardLabel = yardSize === 'small' ? 'Small (under 2,000 sq ft)' : yardSize === 'medium' ? 'Medium (2,000–5,000 sq ft)' : 'Large (5,000+ sq ft)'
  const areaLabel = area === 'front' ? 'Front Yard Only' : area === 'back' ? 'Back Yard Only' : 'Both (Front & Back)'
  const freqLabel = frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Bi-Weekly' : 'One-Time Visit'

  if (submitted) {
    return (
      <div className="est-page">
        <div className="est-header">
          <div className="container est-header__inner">
            <Link to="/" className="est-back">← Back to Home</Link>
          </div>
        </div>
        <div className="est-body">
          <div className="est-card est-success">
            <div className="est-success__check">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" stroke="#a0d400" strokeWidth="3" fill="none" className="est-success__circle" />
                <path d="M24 42l10 10 22-24" stroke="#7ab800" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" className="est-success__tick" />
              </svg>
            </div>
            <h2 className="est-success__title">Estimate Sent!</h2>
            <p className="est-success__text">
              {config.business.successMessage}
            </p>
            <p className="est-success__sub">
              Your estimated range: <strong>${formatPrice(totalLow)} – ${formatPrice(totalHigh)}</strong>
            </p>
            <Link to="/" className="est-btn est-btn--primary" style={{ marginTop: '2rem' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="est-page">
      {/* Header */}
      <div className="est-header">
        <div className="container est-header__inner">
          <Link to="/" className="est-back">← Back to Home</Link>
        </div>
      </div>

      {/* Progress */}
      <div className="est-progress">
        <div className="container">
          <div className="est-progress__bar">
            <div className="est-progress__fill" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
          <div className="est-progress__steps">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`est-progress__step ${s < step ? 'done' : ''} ${s === step ? 'active' : ''}`}>
                {s < step ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8l3 3 5-5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  s
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="est-body">
        <div className="est-card">
          <img src="/straightedgelogo.png" alt={config.business.name} className="est-card__logo" />
          <h2 className="est-card__title">{STEP_TITLES[step - 1]}</h2>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="est-step">
              <div className="est-row">
                <div className="est-field">
                  <label>First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                </div>
                <div className="est-field">
                  <label>Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                </div>
              </div>
              <div className="est-field">
                <label>Phone Number *</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" required />
              </div>
              <div className="est-row">
                <div className="est-field">
                  <label>Street Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St" />
                </div>
                <div className="est-field">
                  <label>City</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Your city" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="est-step">
              <p className="est-label">Yard Size</p>
              <div className="est-size-cards">
                {[
                  { val: 'small', icon: '🏠', label: 'Small', sub: 'Under 2,000 sq ft' },
                  { val: 'medium', icon: '🏡', label: 'Medium', sub: '2,000–5,000 sq ft' },
                  { val: 'large', icon: '🏘️', label: 'Large', sub: '5,000+ sq ft' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    className={`est-size-card ${yardSize === opt.val ? 'active' : ''}`}
                    onClick={() => setYardSize(opt.val)}
                    type="button"
                  >
                    <span className="est-size-card__icon">{opt.icon}</span>
                    <span className="est-size-card__label">{opt.label}</span>
                    <span className="est-size-card__sub">{opt.sub}</span>
                  </button>
                ))}
              </div>

              <p className="est-label">Yard Area</p>
              <div className="est-pills">
                {[
                  { val: 'front', label: 'Front Yard Only' },
                  { val: 'back', label: 'Back Yard Only' },
                  { val: 'both', label: 'Both (Front & Back)' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    className={`est-pill ${area === opt.val ? 'active' : ''}`}
                    onClick={() => setArea(opt.val)}
                    type="button"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <p className="est-label">Frequency</p>
              <div className="est-pills">
                {[
                  { val: 'onetime', label: 'One-Time Visit' },
                  { val: 'weekly', label: 'Weekly' },
                  { val: 'biweekly', label: 'Bi-Weekly' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    className={`est-pill ${frequency === opt.val ? 'active' : ''}`}
                    onClick={() => setFrequency(opt.val)}
                    type="button"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="est-step">
              <div className="est-services-grid">
                {SERVICES.map((svc) => (
                  <div key={svc.id} className="est-svc-card-wrap">
                    <button
                      className={`est-svc-card ${selected.includes(svc.id) ? 'active' : ''}`}
                      onClick={() => toggleService(svc.id)}
                      type="button"
                    >
                      <span className="est-svc-card__icon">{svc.icon}</span>
                      <span className="est-svc-card__name">{svc.name}</span>
                      <span className="est-svc-card__price">{getPriceHint(svc)}</span>
                    </button>
                    {svc.perUnit && selected.includes(svc.id) && (
                      <div className="est-svc-card__units">
                        <label>{svc.unitLabel}</label>
                        <input
                          type="number"
                          min="1"
                          value={units[svc.id] || 1}
                          onChange={(e) => setUnitCount(svc.id, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="est-label" style={{ marginTop: '2rem' }}>How soon do you need service?</p>
              <div className="est-pills">
                {[
                  { val: 'asap', label: 'ASAP' },
                  { val: 'thisweek', label: 'This Week' },
                  { val: 'exploring', label: 'Just Exploring' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    className={`est-pill ${urgency === opt.val ? 'active' : ''}`}
                    onClick={() => setUrgency(opt.val)}
                    type="button"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="est-step">
              <div className="est-price">
                <AnimatedPrice low={totalLow} high={totalHigh} />
              </div>

              <div className="est-summary">
                <div className="est-summary__row">
                  <span>Yard Size</span>
                  <span>{yardLabel}</span>
                </div>
                <div className="est-summary__row">
                  <span>Area</span>
                  <span>{areaLabel}</span>
                </div>
                <div className="est-summary__row">
                  <span>Frequency</span>
                  <span>{freqLabel}</span>
                </div>
                <div className="est-summary__divider" />
                {selected.map((id) => {
                  const svc = SERVICES.find((s) => s.id === id)
                  if (!svc) return null
                  let range
                  if (svc.flat) {
                    range = `$${svc.flat[0]}–$${svc.flat[1]}`
                  } else if (svc.perUnit) {
                    const c = units[id] || 1
                    range = `$${svc.perUnit[0] * c}–$${svc.perUnit[1] * c} (x${c})`
                  } else {
                    const p = svc.prices[yardSize] || svc.prices.medium
                    range = `$${p[0]}–$${p[1]}`
                  }
                  return (
                    <div key={id} className="est-summary__row">
                      <span>{svc.icon} {svc.name}</span>
                      <span>{range}</span>
                    </div>
                  )
                })}
                {area === 'both' && (
                  <>
                    <div className="est-summary__divider" />
                    <div className="est-summary__row est-summary__row--note">
                      <span>Front & Back yard multiplier</span>
                      <span>×1.6</span>
                    </div>
                  </>
                )}
              </div>

              <p className="est-disclaimer">
                This is an estimated range. We will confirm exact pricing
                during your free on-site visit — no obligation.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="est-nav">
            {step > 1 && (
              <button className="est-btn est-btn--back" onClick={() => setStep(step - 1)} type="button">
                ← Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < 4 ? (
              <button
                className="est-btn est-btn--primary"
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                type="button"
              >
                Next →
              </button>
            ) : (
              <button
                className="est-btn est-btn--primary est-btn--submit"
                onClick={handleSubmit}
                disabled={submitting}
                type="button"
              >
                {submitting ? 'Sending...' : 'Send My Estimate & Book a Free Visit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
