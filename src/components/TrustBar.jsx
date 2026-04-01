import config from '../config'
import './TrustBar.css'

export default function TrustBar() {
  return (
    <section className="trust">
      <div className="container trust__grid">
        {config.content.trustBar.map((item) => (
          <div key={item} className="trust__item">
            <span className="trust__check">✓</span>
            <p className="trust__title">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
