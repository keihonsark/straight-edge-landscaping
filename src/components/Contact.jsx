import { useState } from 'react'
import config from '../config'
import './Contact.css'

const { phone, phoneTel, hours, formspreeId, successMessage } = config.business

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    try {
      /* TODO: Replace with client Formspree endpoint */
      await fetch(formspreeId ? `https://formspree.io/f/${formspreeId}` : '#', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
  }

  return (
    <section id="contact" className="contact fade-up">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="contact__eyebrow">Get In Touch</p>
          <h2 className="contact__heading sh__heading">Contact <span className="sh__outline">Us</span></h2>
          <div className="sh__line" style={{ margin: '0 0 0.75rem 0' }} />
          <p className="contact__text">
            Have a question or ready to schedule? Reach out and we'll get back
            to you within a few hours.
          </p>

          <div className="contact__details">
            <div className="contact__detail">
              <div className="contact__detail-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div>
                <p className="contact__detail-label">Phone</p>
                <a href={`tel:${phoneTel}`} className="contact__detail-value">{phone}</a>
              </div>
            </div>

            <div className="contact__detail">
              <div className="contact__detail-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <div>
                <p className="contact__detail-label">Hours</p>
                <p className="contact__detail-value">{hours}</p>
              </div>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="contact__form contact__success">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#a0d400" strokeWidth="3" fill="none" />
              <path d="M20 34l8 8 16-18" stroke="#7ab800" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <h3>Message Sent!</h3>
            <p>{successMessage}</p>
          </div>
        ) : (
          <form
            className="contact__form"
            onSubmit={handleSubmit}
          >
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required />
              </div>
              <div className="contact__field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="phone">Phone *</label>
              <input type="tel" id="phone" name="phone" required />
            </div>

            <div className="contact__field">
              <label htmlFor="service">Service</label>
              <select id="service" name="service" defaultValue="">
                <option value="" disabled>Select a service...</option>
                <option>Lawn Maintenance</option>
                <option>Sod & Turf Installation</option>
                <option>Irrigation Systems</option>
                <option>Mulch & River Rock</option>
                <option>Tree & Stump Services</option>
                <option>Landscaping & Hardscape</option>
                <option>Mowing & Edging</option>
                <option>Trimming & Blowing</option>
                <option>Weekly Maintenance</option>
                <option>Bi-Weekly Maintenance</option>
                <option>Sprinkler Systems</option>
                <option>Drip Irrigation</option>
                <option>Cement Work</option>
                <option>Weed Control</option>
                <option>Trash Removal</option>
              </select>
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell us about your project..." />
            </div>

            <button type="submit" className="contact__submit">
              Send Message
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
