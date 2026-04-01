import config from '../config'
import './FloatingCallButton.css'

const { phone, phoneTel, name } = config.business

export default function FloatingCallButton() {
  return (
    <a href={`tel:${phoneTel}`} className="fcb" aria-label={`Call ${name}`}>
      <span className="fcb__pulse" />
      <span className="fcb__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      </span>
      <span className="fcb__text">Call {phone}</span>
    </a>
  )
}
