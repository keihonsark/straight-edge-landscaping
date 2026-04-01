import config from '../config'
import './Reviews.css'

const { reviews, rating, reviewCount } = config.google

function Stars() {
  return (
    <div className="rev__stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#f5a623">
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ r }) {
  return (
    <div className="rev__card">
      <Stars />
      <p className="rev__text">&ldquo;{r.text}&rdquo;</p>
      <div className="rev__author">
        <div className="rev__avatar">{r.name[0]}</div>
        <div>
          <span className="rev__author-name">{r.name}</span>
          <span className="rev__author-source">Yelp Review{r.location ? ` · ${r.location}` : ''}</span>
        </div>
      </div>
    </div>
  )
}

function Marquee() {
  const doubled = [...reviews, ...reviews]
  return (
    <div className="rev__marquee rev__marquee--left">
      <div className="rev__marquee-track">
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} r={r} />
        ))}
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="rev fade-up">
      <div className="container">
        <p className="rev__eyebrow">What People Say</p>
        <h2 className="rev__heading sh__heading">Our <span className="sh__outline">Reviews</span></h2>
        <div className="sh__line" />

        <div className="rev__google-badge">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#d32323"/>
            <text x="12" y="16.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700" fill="#fff">y!</text>
          </svg>
          <span className="rev__google-stars">★★★★★</span>
          <span className="rev__google-count">{reviewCount} · 5-Star Yelp Reviews</span>
        </div>
      </div>

      <Marquee />
    </section>
  )
}
