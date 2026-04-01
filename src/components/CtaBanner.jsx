import config from '../config'
import './CtaBanner.css'

const { phone, phoneTel } = config.business
const { cta } = config.content

export default function CtaBanner() {
  return (
    <section className="cta">
      <div className="cta__bg" />
      <div className="cta__overlay" />
      <div className="container cta__content fade-up">
        <h2 className="cta__heading">{cta.headline}</h2>
        <p className="cta__sub">
          {cta.subheadline}
        </p>
        <div className="cta__actions">
          <a href={`tel:${phoneTel}`} className="cta__btn cta__btn--call">
            Call {phone}
          </a>
          <a href="#contact" className="cta__btn cta__btn--email">
            Send a Message →
          </a>
        </div>
      </div>
    </section>
  )
}
