import { useEffect, useRef, useState } from 'react'

export default function ProcessSection({ steps }) {
  const gridRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setActive(true)
      return
    }

    const el = gridRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="sp-process">
      <div className="container">
        <p className="sp-process__eyebrow">Our Process</p>
        <h2 className="sp-process__title">How It Works</h2>
        <div className="sp-process__grid" ref={gridRef}>
          <div className={`sp-process__line ${active ? 'sp-process__line--active' : ''}`} />
          {steps.map((step, i) => (
            <div
              key={i}
              className={`sp-process__step ${active ? 'sp-process__step--visible' : ''}`}
              style={{ transitionDelay: `${i * 300}ms` }}
            >
              <div className="sp-process__num" style={{ animationDelay: `${i * 0.5}s` }}>{i + 1}</div>
              <div className="sp-process__label">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
