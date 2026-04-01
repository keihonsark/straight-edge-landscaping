import { Link } from 'react-router-dom'
import './QuizBanner.css'

export default function QuizBanner() {
  return (
    <section className="quiz-banner fade-up">
      <div className="container quiz-banner__inner">
        <div className="quiz-banner__text">
          <span className="quiz-banner__badge">Free · 60 Seconds · No Sign-Up</span>
          <h2 className="quiz-banner__title">How Healthy Is Your Lawn?</h2>
          <p className="quiz-banner__sub">
            Take our quick 5-question quiz and get a personalized lawn health score with service recommendations.
          </p>
        </div>
        <Link to="/lawn-health-quiz" className="quiz-banner__btn">
          Find Out Your Score →
        </Link>
      </div>
    </section>
  )
}
