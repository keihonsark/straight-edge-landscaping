import config from '../config'
import './Footer.css'

const { name, phone, phoneTel, address, hoursShort } = config.business
const { footer } = config.content

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/straightedgelogo.png" alt={name} style={{ width: 140, height: 'auto', objectFit: 'contain', filter: 'brightness(1.2) drop-shadow(0 2px 8px rgba(0,0,0,0.5))', marginBottom: '1rem' }} />
          </div>
          <p className="footer__desc">
            {footer.tagline}
          </p>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Lawn Maintenance</a></li>
            <li><a href="#services">Sod & Turf Installation</a></li>
            <li><a href="#services">Irrigation Systems</a></li>
            <li><a href="#services">Tree & Stump Services</a></li>
            <li><a href="#services">Mulch & River Rock</a></li>
            <li><a href="#services">Landscaping & Hardscape</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${phoneTel}`}>{phone}</a></li>
            <li>{address}</li>
            <li>{hoursShort}</li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; 2025 {name} &middot; {address}</p>
          <p className="footer__sark">
            Site by{' '}
            <a href="https://sark.agency" target="_blank" rel="noopener noreferrer" className="footer__sark-link">
              <svg width="70" height="18" viewBox="0 0 70 18" fill="none" style={{ verticalAlign: 'middle' }}>
                <text x="0" y="14" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="700" fill="#a0d400">//</text>
                <text x="20" y="14" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="700" fill="#fff">SARK</text>
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
