import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './LawnHealthQuiz.css'

const questions = [
  {
    q: 'How does your grass look right now?',
    options: [
      { text: 'Lush and green 🌿', score: 25 },
      { text: 'Mostly green with some brown 🟡', score: 18 },
      { text: 'More brown than green 🟤', score: 10 },
      { text: 'Mostly dead or patchy ☠️', score: 3 },
    ],
  },
  {
    q: 'How much of your lawn has bare spots or patches?',
    options: [
      { text: 'None — looks full ✅', score: 20 },
      { text: 'A few small areas', score: 14 },
      { text: 'Several noticeable patches', score: 7 },
      { text: 'More bare than grass', score: 2 },
    ],
  },
  {
    q: 'How often do you water your lawn?',
    options: [
      { text: 'Daily or every other day', score: 15 },
      { text: '2-3 times per week', score: 20 },
      { text: 'Once a week', score: 10 },
      { text: 'Rarely or never', score: 3 },
    ],
  },
  {
    q: 'How bad is the weed situation?',
    options: [
      { text: 'No weeds 🙌', score: 20 },
      { text: 'A few here and there', score: 14 },
      { text: 'Weeds are spreading', score: 7 },
      { text: 'Completely overrun 🌾', score: 2 },
    ],
  },
  {
    q: 'When did you last have professional lawn care?',
    options: [
      { text: 'Within the last month', score: 15 },
      { text: '2-3 months ago', score: 11 },
      { text: '6+ months ago', score: 6 },
      { text: 'Never', score: 2 },
    ],
  },
]

function getGrade(score) {
  if (score >= 90) return { letter: 'A', color: '#7ab800', label: 'Excellent' }
  if (score >= 75) return { letter: 'B', color: '#a0d400', label: 'Good' }
  if (score >= 60) return { letter: 'C', color: '#e6b800', label: 'Fair' }
  if (score >= 40) return { letter: 'D', color: '#e67e00', label: 'Needs Work' }
  return { letter: 'F', color: '#d32f2f', label: 'Critical' }
}

function getSummary(score) {
  if (score >= 90) return "Your lawn is in great shape! A regular maintenance plan will keep it looking pristine year-round. We can help you stay on top of it."
  if (score >= 75) return "Your lawn is looking solid with just a few areas that need attention. A professional tune-up and consistent maintenance will get you to that next level."
  if (score >= 60) return "Your lawn has some issues that are worth addressing before they get worse. The good news — everything we see here is fixable with the right care plan."
  if (score >= 40) return "Your lawn needs some serious TLC. Between bare patches, weeds, and inconsistent watering, there's a lot of room for improvement. Let us put together a recovery plan."
  return "Your lawn is in rough shape, but don't worry — we've brought lawns back from worse. A full assessment and custom recovery plan is the first step to turning things around."
}

function getRecommendations(answers) {
  const recs = []
  if (answers[0] >= 2) recs.push({ name: 'Lawn Maintenance', desc: 'Regular mowing, edging, and trimming to restore your lawn', link: '/services/lawn-maintenance' })
  if (answers[1] >= 2) recs.push({ name: 'Sod Installation', desc: 'Fill in bare patches with fresh, professional sod', link: '/services/sod-installation' })
  if (answers[2] >= 2) recs.push({ name: 'Irrigation Systems', desc: 'Get your watering schedule dialed in with a proper sprinkler system', link: '/services/irrigation-systems' })
  if (answers[3] >= 2) recs.push({ name: 'Weed Control', desc: 'Targeted weed treatment to reclaim your lawn', link: '/estimate' })
  if (answers[4] >= 2) recs.push({ name: 'Full Yard Clean-Up', desc: 'A complete reset to get your property back on track', link: '/estimate' })
  if (recs.length === 0) recs.push({ name: 'Weekly Maintenance', desc: 'Keep your great lawn looking its best all year', link: '/services/lawn-maintenance' })
  return recs.slice(0, 3)
}

function CountUpScore({ target }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const start = performance.now()
    const duration = 1200
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target])
  return <span ref={ref}>{val}</span>
}

export default function LawnHealthQuiz() {
  const [step, setStep] = useState(0) // 0-4 = questions, 5 = lead capture, 6 = results
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const totalScore = answers.reduce((sum, a) => sum + questions[a.qIndex].options[a.optIndex].score, 0)
  const grade = getGrade(totalScore)

  const selectAnswer = (optIndex) => {
    if (transitioning) return
    setSelected(optIndex)
    setTransitioning(true)
    setTimeout(() => {
      setAnswers((prev) => [...prev, { qIndex: step, optIndex }])
      setSelected(null)
      setStep((s) => s + 1)
      setTransitioning(false)
    }, 400)
  }

  const handleLeadSubmit = async () => {
    if (!phone.trim()) return
    setSubmitting(true)
    try {
      /* TODO: Replace with client Formspree endpoint */
      await fetch(config.business.formspreeId ? `https://formspree.io/f/${config.business.formspreeId}` : '#', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          source: 'Lawn Health Quiz',
          firstName,
          phone,
          email,
          lawnScore: totalScore,
          lawnGrade: grade.letter,
          answers: answers.map((a) => `${questions[a.qIndex].q}: ${questions[a.qIndex].options[a.optIndex].text}`).join(' | '),
        }),
      })
    } catch { /* silent */ }
    setSubmitting(false)
    setStep(6)
  }

  const answerIndices = answers.map((a) => a.optIndex)
  const recs = getRecommendations(answerIndices)

  return (
    <>
      <Navbar forceScrolled />

      <div className="quiz-page">
        {/* Progress */}
        {step < 5 && (
          <div className="quiz-progress">
            <div className="quiz-progress__bar">
              <div className="quiz-progress__fill" style={{ width: `${((step + 1) / 5) * 100}%` }} />
            </div>
            <span className="quiz-progress__label">Question {step + 1} of 5</span>
          </div>
        )}

        {/* Questions */}
        {step < 5 && (
          <div className={`quiz-card ${transitioning ? 'quiz-card--out' : 'quiz-card--in'}`}>
            <h2 className="quiz-card__q">{questions[step].q}</h2>
            <div className="quiz-card__options">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  className={`quiz-option ${selected === i ? 'quiz-option--selected' : ''}`}
                  onClick={() => selectAnswer(i)}
                  type="button"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lead Capture */}
        {step === 5 && (
          <div className="quiz-card quiz-card--in">
            <h2 className="quiz-card__q">Where should we send your lawn report?</h2>
            <div className="quiz-lead">
              <div className="quiz-lead__field">
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
              </div>
              <div className="quiz-lead__field">
                <label>Phone Number *</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" required />
              </div>
              <div className="quiz-lead__field">
                <label>Email (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <button
                className="quiz-lead__btn"
                onClick={handleLeadSubmit}
                disabled={!phone.trim() || submitting}
              >
                {submitting ? 'Sending...' : 'Get My Lawn Score →'}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {step === 6 && (
          <div className="quiz-results quiz-card--in">
            <div className="quiz-results__score-wrap">
              <div className="quiz-results__score" style={{ color: grade.color }}>
                <CountUpScore target={totalScore} />
              </div>
              <div className="quiz-results__grade" style={{ background: grade.color }}>
                {grade.letter}
              </div>
              <div className="quiz-results__grade-label" style={{ color: grade.color }}>
                {grade.label}
              </div>
              <p className="quiz-results__out-of">out of 100</p>
            </div>

            <p className="quiz-results__summary">{getSummary(totalScore)}</p>

            <div className="quiz-results__recs">
              <h3 className="quiz-results__recs-title">What Your Lawn Needs</h3>
              {recs.map((r) => (
                <Link to={r.link} key={r.name} className="quiz-results__rec">
                  <span className="quiz-results__rec-name">{r.name}</span>
                  <span className="quiz-results__rec-desc">{r.desc}</span>
                </Link>
              ))}
            </div>

            <Link to="/estimate" className="quiz-results__cta">Get My Free Estimate →</Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
