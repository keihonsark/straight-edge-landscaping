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
        {/* Yelp & Google Reviews */}
        <div className="stats__item stats__item--google">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="stats__num stats__num--gradient">9+</span>
          <div className="stats__google-stars">★★★★★</div>
          <span className="stats__label">Yelp & Google Reviews</span>
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
