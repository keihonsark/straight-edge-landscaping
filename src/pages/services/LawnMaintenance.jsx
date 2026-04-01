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
  'Mowing & edging',
  'Trimming & blowing',
  'Debris cleanup',
  'Curb edging',
  'Lawn health check',
  'Consistent scheduling',
]

const process = [
  'Call for free estimate',
  'We assess your yard',
  'Pick your plan',
  'We show up every week',
]

const faqs = [
  {
    q: 'How often should I mow in Fresno?',
    a: 'During spring and summer, we recommend weekly mowing to keep your lawn healthy. In fall you can stretch to every 10–14 days, and winter is usually monthly.',
  },
  {
    q: 'Do you offer bi-weekly plans?',
    a: 'Yes! We offer both weekly and bi-weekly maintenance plans. Weekly is recommended during peak growth season, but bi-weekly works great for slower months or tighter budgets.',
  },
  {
    q: 'What if it rains on my scheduled day?',
    a: "We monitor the weather closely. If rain prevents us from servicing your yard, we'll reschedule within 1–2 days at no extra charge.",
  },
  {
    q: 'Do I need to be home during service?',
    a: "Not at all. As long as we have gate access, we'll take care of everything and leave your yard looking sharp — whether you're home or not.",
  },
]

const reviews = config.google.reviews.slice(0, 2)

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

export default function LawnMaintenance() {
  const [openFaq, setOpenFaq] = useState(null)
  useFadeUp()

  return (
    <>
      <Navbar />

      <section className="sp-hero" style={{ backgroundImage: 'url(/grass-macro-dew.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="sp-hero__overlay" />
        <div className="container sp-hero__content">
          <h1 className="sp-hero__title">{`Professional Lawn Maintenance in ${config.business.address.replace(', ' + config.business.state, '')}`}</h1>
          <p className="sp-hero__sub">Weekly and bi-weekly plans that keep your lawn sharp all season long.</p>
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
