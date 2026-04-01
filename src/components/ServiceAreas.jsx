import config from '../config'
import './ServiceAreas.css'

const { serviceAreas, name, city, region } = config.business

const cities = [
  { name: serviceAreas[1] || 'City 2', x: 355, y: 145 },
  { name: serviceAreas[3] || 'City 4', x: 120, y: 80 },
  { name: serviceAreas[2] || 'City 3', x: 390, y: 265 },
  { name: serviceAreas[4] || 'City 5', x: 185, y: 325 },
  { name: serviceAreas[5] || 'City 6', x: 400, y: 340 },
  { name: serviceAreas[6] || 'City 7', x: 75, y: 215 },
].filter((c) => c.name !== 'And More')

export default function ServiceAreas() {
  return (
    <section id="areas" className="areas fade-up">
      <div className="container areas__grid">
        <div className="areas__content">
          <p className="areas__eyebrow">Service Areas</p>
          <h2 className="areas__heading sh__heading">Serving the {region} <span className="sh__outline">Region</span></h2>
          <div className="sh__line" style={{ margin: '0 0 0.75rem 0' }} />
          <p className="areas__text">
            {name} proudly serves homeowners and businesses throughout
            the greater {city} area. If you're in the {region}, we've got you covered.
          </p>
          <div className="areas__tags">
            {serviceAreas.map((a) => (
              <span key={a} className="areas__tag">{a}</span>
            ))}
          </div>
        </div>

        <div className="areas__map">
          <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="areas__svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="48%" r="50%">
                <stop offset="0%" stopColor="#a0d400" stopOpacity="0.18" />
                <stop offset="40%" stopColor="#a0d400" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#a0d400" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="500" height="420" fill="#0a0a0a" />

            {Array.from({ length: 20 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 22} x2="500" y2={i * 22} stroke="#a0d400" strokeWidth="0.3" opacity="0.06" />
            ))}
            {Array.from({ length: 24 }, (_, i) => (
              <line key={`v${i}`} x1={i * 22} y1="0" x2={i * 22} y2="420" stroke="#a0d400" strokeWidth="0.3" opacity="0.06" />
            ))}

            <rect width="500" height="420" fill="url(#centerGlow)" />

            <circle cx="250" cy="200" r="100" stroke="#a0d400" strokeWidth="0.8" opacity="0.12" />
            <circle cx="250" cy="200" r="170" stroke="#a0d400" strokeWidth="0.6" opacity="0.08" />

            <circle cx="250" cy="200" r="60" stroke="#a0d400" strokeWidth="1.5" fill="none" className="areas__radar" />

            {cities.map((c, i) => (
              <line key={i} x1="250" y1="200" x2={c.x} y2={c.y} stroke="#a0d400" strokeWidth="1" strokeDasharray="8 5" opacity="0.5" className="areas__flowline" />
            ))}

            <circle cx="250" cy="200" r="35" fill="#a0d400" opacity="0.08" className="areas__glow" />
            <circle cx="250" cy="200" r="20" fill="#a0d400" opacity="0.12" className="areas__glow" />

            <path d="M250 170c-10 0-18 8-18 18 0 12.6 18 31 18 31s18-18.4 18-31c0-10-8-18-18-18z" fill="#a0d400" className="areas__pin" />
            <circle cx="250" cy="188" r="6" fill="#0a0a0a" />

            <text x="250" y="255" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="34" fontWeight="800" fill="#a0d400" className="areas__fresno-text">{city.toUpperCase()}</text>

            {cities.map((c) => (
              <g key={c.name}>
                <circle cx={c.x} cy={c.y} r="12" fill="#a0d400" opacity="0.08" />
                <circle cx={c.x} cy={c.y} r="6" fill="#a0d400" opacity="0.9" />
                <circle cx={c.x} cy={c.y} r="3" fill="#0a0a0a" />
                <rect x={c.x - 32} y={c.y - 28} width="64" height="20" rx="10" fill="#5a8a00" opacity="0.9" />
                <text x={c.x} y={c.y - 14} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="11" fontWeight="600" fill="#fff">{c.name}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}
