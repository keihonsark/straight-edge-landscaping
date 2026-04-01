import { Link } from 'react-router-dom'
import './EstimatorBanner.css'

export default function EstimatorBanner() {
  return (
    <section className="est-banner fade-up">
      <div className="container est-banner__inner">
        <div className="est-banner__text">
          <h2 className="est-banner__title">How Big Is Your Lawn?</h2>
          <p className="est-banner__sub">
            Use our free interactive tool to draw your lawn on a satellite map and get an instant size estimate with pricing.
          </p>
        </div>
        <Link to="/lawn-estimator" className="est-banner__btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>
          Try Our Lawn Estimator
        </Link>
      </div>
    </section>
  )
}
