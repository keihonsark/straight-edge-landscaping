import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import config from '../config'
import './Navbar.css'

const { phone, phoneTel, name } = config.business

export default function Navbar({ forceScrolled = false }) {
  const [scrolled, setScrolled] = useState(forceScrolled)
  const [open, setOpen] = useState(false)
  const [svcOpen, setSvcOpen] = useState(false)
  const svcTimeout = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleSvcEnter = () => {
    clearTimeout(svcTimeout.current)
    setSvcOpen(true)
  }

  const handleSvcLeave = () => {
    svcTimeout.current = setTimeout(() => setSvcOpen(false), 180)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(forceScrolled || window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__logo">
          <img src="/straightedgelogo.png" alt={name} style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        </Link>

        <button
          className={`nav__hamburger ${open ? 'active' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        {open && <div className="nav__overlay" onClick={() => setOpen(false)} />}

        <div className={`nav__menu ${open ? 'open' : ''}`}>
          <button className="nav__close" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <ul className="nav__links">
            <li
              className="nav__dropdown"
              onMouseEnter={handleSvcEnter}
              onMouseLeave={handleSvcLeave}
            >
              <button
                className="nav__dropdown-toggle"
                onClick={() => setSvcOpen(!svcOpen)}
                type="button"
              >
                Services
                <span className={`nav__chevron ${svcOpen ? 'nav__chevron--open' : ''}`}>▾</span>
              </button>
              {svcOpen && (
                <div className="nav__dropdown-menu">
                  <Link to="/services/lawn-maintenance" onClick={() => { setSvcOpen(false); setOpen(false) }}>Lawn Maintenance</Link>
                  <Link to="/services/sod-installation" onClick={() => { setSvcOpen(false); setOpen(false) }}>Sod Installation</Link>
                  <Link to="/services/irrigation-systems" onClick={() => { setSvcOpen(false); setOpen(false) }}>Irrigation Systems</Link>
                  <Link to="/services/mulch-river-rock" onClick={() => { setSvcOpen(false); setOpen(false) }}>Mulch & River Rock</Link>
                  <Link to="/services/tree-services" onClick={() => { setSvcOpen(false); setOpen(false) }}>Tree Services</Link>
                  <Link to="/services/landscaping-hardscape" onClick={() => { setSvcOpen(false); setOpen(false) }}>Landscaping & Hardscape</Link>
                  <Link to="/lawn-estimator" onClick={() => { setSvcOpen(false); setOpen(false) }} className="nav__dropdown-highlight">Lawn Estimator</Link>
                  <Link to="/lawn-health-quiz" onClick={() => { setSvcOpen(false); setOpen(false) }} className="nav__dropdown-highlight">Lawn Health Quiz</Link>
                </div>
              )}
            </li>
            <li><a href="#reviews" onClick={() => setOpen(false)}>Reviews</a></li>
            <li><Link to="/blog" onClick={() => setOpen(false)}>Blog</Link></li>
            <li><a href="#areas" onClick={(e) => { setOpen(false); if (location.pathname !== '/') { e.preventDefault(); navigate('/'); setTimeout(() => { const el = document.getElementById('areas'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); } }}>Areas</a></li>
            <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
          </ul>
          <Link to="/estimate" className="nav__estimate" onClick={() => setOpen(false)}>
            Get Instant Estimate
          </Link>
          <a href={`tel:${phoneTel}`} className="nav__phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            {phone}
          </a>
        </div>
      </div>
    </nav>
  )
}
