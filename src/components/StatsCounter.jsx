import { useEffect, useRef, useState } from 'react'
import './StatsCounter.css'

function CountUp({ end, suffix = '', duration = 1600 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * end))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="stats__num stats__num--gradient">
      {value}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="stats fade-up">
      <div className="container stats__grid">
        {/* 5-Star Yelp Reviews */}
        <div className="stats__item stats__item--google">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#d32323"/>
            <text x="12" y="16.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700" fill="#fff">y!</text>
          </svg>
          <span className="stats__num stats__num--gradient">27+</span>
          <div className="stats__google-stars">★★★★★</div>
          <span className="stats__label">5-Star Yelp Reviews</span>
        </div>

        {/* Years of Experience */}
        <div className="stats__item">
          <div className="stats__icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="18" stroke="#a0d400" strokeWidth="2.5" fill="none"/>
              <path d="M24 14v12l8 4" stroke="#a0d400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="stats__num stats__num--gradient">6+</span>
          <span className="stats__counting">AND COUNTING</span>
          <span className="stats__label">Years of Experience</span>
        </div>

        {/* 100% Satisfaction */}
        <div className="stats__item">
          <div className="stats__icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18 18-8.06 18-18S33.94 6 24 6z" stroke="#a0d400" strokeWidth="2.5" fill="none"/>
              <path d="M16 24l6 6 10-11" stroke="#a0d400" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="stats__num stats__num--gradient">100%</span>
          <span className="stats__counting">GUARANTEED</span>
          <span className="stats__label">Satisfaction Guaranteed</span>
        </div>
      </div>
    </section>
  )
}
