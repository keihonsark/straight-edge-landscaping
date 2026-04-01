import './AllServices.css'

const allServices = [
  'Mowing & Edging',
  'Trimming & Blowing',
  'Weekly Maintenance',
  'Bi-Weekly Maintenance',
  'Sod Installation',
  'Turf Installation',
  'Sprinkler Systems',
  'Drip Irrigation',
  'Mulch Installation',
  'River Rock',
  'Tree Trimming',
  'Stump Removal',
  'Landscaping',
  'Cement Work',
  'Gardening',
  'Trash Removal',
  'Weed Control',
  'Free Estimates',
]

export default function AllServices() {
  return (
    <section className="all-svc fade-up">
      <div className="container">
        <p className="all-svc__eyebrow">Full Service List</p>
        <h2 className="all-svc__heading sh__heading">Everything Your <span className="sh__outline">Yard Needs</span></h2>
        <div className="sh__line" />
        <div className="all-svc__grid">
          {allServices.map((s) => (
            <span key={s} className="all-svc__pill stagger-child">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8l3 3 5-5.5" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
