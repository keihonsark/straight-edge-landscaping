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
  'Full landscape design',
  'Cement & concrete work',
  'Retaining walls',
  'Garden bed creation',
  'Walkways & patios',
  'Outdoor construction',
]

const process = [
  'Free consultation & vision',
  'We design the plan',
  'Construction begins',
  'Final walkthrough & cleanup',
]

const faqs = [
  {
    q: 'What types of hardscape do you install?',
    a: "We handle concrete walkways, patios, retaining walls, garden borders, and more. If it involves building something in your yard, we can do it.",
  },
  {
    q: 'Do you handle the full design or just installation?',
    a: "Both. We work with you from the initial vision through design, material selection, and installation. You get a complete transformation without needing to hire separate contractors.",
  },
  {
    q: 'How long does a landscaping project take?',
    a: "It depends on scope. A simple garden bed or walkway can be done in 1–2 days. Full yard transformations with concrete and planting typically take 1–2 weeks.",
  },
  {
    q: 'Do you offer payment plans for large projects?',
    a: "We can discuss flexible payment options for larger jobs. Contact us for a free estimate and we'll work out a plan that fits your budget.",
  },
]

const reviews = config.google.reviews.slice(5, 7)

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

export default function LandscapingHardscape() {
  const [openFaq, setOpenFaq] = useState(null)
  useFadeUp()

  return (
    <>
      <Navbar />

      <section className="sp-hero" style={{ backgroundImage: 'url(/travertine-stone.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="sp-hero__overlay" />
        <div className="container sp-hero__content">
          <h1 className="sp-hero__title">{`Landscaping & Hardscape in ${config.business.address.replace(', ' + config.business.state, '')}`}</h1>
          <p className="sp-hero__sub">Full landscaping, cement work, gardening, and outdoor construction services.</p>
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
