import { useState, useRef, useCallback } from 'react'
import './BeforeAfter.css'

const pairs = [
  { before: '/luxury-home-before.png', after: '/luxury-home-after.png', label: 'Front Yard Transformation' },
  { before: '/front-lawn-before.png', after: '/front-lawn-after.png', label: 'Sod Installation' },
  { before: '/luxury-backyard-before.png', after: '/luxury-backyard-after.png', label: 'Backyard Renovation' },
]

function Slider({ before, after, label }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)
  const startTouch = useRef(null)
  const gestureDecided = useRef(false)
  const isHorizontal = useRef(false)

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    dragging.current = true
    updatePos(e.clientX)

    const onMove = (ev) => updatePos(ev.clientX)
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [updatePos])

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return
    updatePos(e.clientX)
  }, [updatePos])

  const onMouseUp = useCallback(() => {
    dragging.current = false
  }, [])

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0]
    startTouch.current = { x: t.clientX, y: t.clientY }
    gestureDecided.current = false
    isHorizontal.current = false
  }, [])

  const onTouchMove = useCallback((e) => {
    if (!startTouch.current) return
    const t = e.touches[0]
    const dx = Math.abs(t.clientX - startTouch.current.x)
    const dy = Math.abs(t.clientY - startTouch.current.y)

    if (!gestureDecided.current) {
      if (dx < 5 && dy < 5) return
      gestureDecided.current = true
      isHorizontal.current = dx > dy
    }

    if (isHorizontal.current) {
      e.preventDefault()
      updatePos(t.clientX)
    }
  }, [updatePos])

  const onTouchEnd = useCallback(() => {
    startTouch.current = null
    gestureDecided.current = false
    isHorizontal.current = false
  }, [])

  return (
    <div className="ba__slider-wrap">
      <div
        className="ba__slider"
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img src={after} alt="After" className="ba__img ba__img--after" draggable="false" />
        <div className="ba__img-clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt="Before" className="ba__img ba__img--before" draggable="false" />
        </div>

        <div className="ba__handle" style={{ left: `${pos}%` }}>
          <div className="ba__handle-line" />
          <div className="ba__handle-circle">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l-4 6 4 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 4l4 6-4 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <span className="ba__badge ba__badge--before">Before</span>
        <span className="ba__badge ba__badge--after">After</span>
      </div>
      <p className="ba__caption">{label}</p>
    </div>
  )
}

export default function BeforeAfter() {
  return (
    <section className="ba fade-up">
      <div className="container">
        <p className="ba__eyebrow">Real Results</p>
        <h2 className="ba__heading sh__heading" style={{ color: '#fff' }}>See the <span className="sh__outline">Difference</span></h2>
        <div className="sh__line" />
        <p className="ba__sub">Drag the slider to reveal the transformation.</p>

        <div className="ba__grid">
          {pairs.map((p) => (
            <Slider key={p.label} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
