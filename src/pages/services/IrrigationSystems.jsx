import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import useFadeUp from '../../hooks/useFadeUp'
import StatsCounter from '../../components/StatsCounter'
import ProcessSection from '../../components/ProcessSection'
import './ServicePage.css'
import config from '../../config'

const included = [
  'Sprinkler system installation',
  'Drip irrigation setup',
  'System repair & troubleshooting',
  'Head replacement & adjustment',
  'Timer & controller programming',
  'Seasonal system tune-ups',
]

const process = [
  'Free on-site assessment',
  'Custom system design',
  'Professional installation',
  'Testing & walkthrough',
]

const faqs = [
  {
    q: 'How do I know if my sprinkler system needs repair?',
    a: "Look for dry patches, pooling water, low pressure, or heads that don't pop up. If your water bill spikes unexpectedly, that's another sign of a leak or malfunction.",
  },
  {
    q: 'Do you install drip irrigation for garden beds?',
    a: "Absolutely. Drip irrigation is ideal for flower beds, vegetable gardens, and trees. It delivers water directly to the roots, reducing waste and keeping your plants healthier.",
  },
  {
    q: 'How long does a sprinkler installation take?',
    a: "Most residential installations take 1–2 days depending on yard size and system complexity. We handle everything from trenching to wiring the controller.",
  },
  {
    q: 'Can you add zones to my existing system?',
    a: "Yes. We can expand your current system with additional zones, heads, or drip lines to cover new landscaping or areas that aren't getting enough water.",
  },
]

const reviews = config.google.reviews.slice(3, 5)

function Stars() {
  return (
    <div className="sp-reviews__stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#f5a623">
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  )
}

export default function IrrigationSystems() {
  const [openFaq, setOpenFaq] = useState(null)
  useFadeUp()

  return (
    <>
      <Navbar />

      <section className="sp-hero" style={{ backgroundImage: 'url(/sprinkler-golden-hour.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="sp-hero__overlay" />
        <div className="container sp-hero__content">
          <h1 className="sp-hero__title">{`Irrigation Systems in ${config.business.address.replace(', ' + config.business.state, '')}`}</h1>
          <p className="sp-hero__sub">Sprinkler and drip system installation and repair for efficient, reliable watering.</p>
          <Link to="/estimate" className="sp-hero__btn">Get a Free Estimate</Link>
        </div>
      </section>

      <section className="sp-included">
        <div className="container">
          <p className="sp-included__eyebrow">What You Get</p>
          <h2 className="sp-included__title">What's Included</h2>
          <div className="sp-included__grid">
            {included.map((item) => (
              <div key={item} className="sp-included__item">
                <span className="sp-included__check">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7ab800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4 12 14.01l-3-3" />
                  </svg>
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter />

      <ProcessSection steps={process} />

      <section className="sp-faq">
        <div className="container">
          <h2 className="sp-faq__title">Frequently Asked Questions</h2>
          <div className="sp-faq__list">
            {faqs.map((faq, i) => (
              <div key={i} className="sp-faq__item">
                <button className="sp-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`sp-faq__arrow ${openFaq === i ? 'sp-faq__arrow--open' : ''}`}>▼</span>
                </button>
                {openFaq === i && <div className="sp-faq__a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-reviews">
        <div className="container">
          <h2 className="sp-reviews__title">What Our Clients Say</h2>
          <div className="sp-reviews__grid">
            {reviews.map((r) => (
              <div key={r.name} className="sp-reviews__card">
                <Stars />
                <p className="sp-reviews__text">&ldquo;{r.text}&rdquo;</p>
                <p className="sp-reviews__author">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container">
          <h2 className="sp-cta__title">Ready to <span className="sp-cta__accent">Get Started?</span></h2>
          <p className="sp-cta__sub">{config.content.servicePages.ctaSub}</p>
          <a href={`tel:${config.business.phoneTel}`} className="sp-cta__btn">Call {config.business.phone}</a>
        </div>
      </section>

      <Footer />
    </>
  )
}
