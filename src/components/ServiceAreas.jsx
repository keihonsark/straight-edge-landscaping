import config from '../config'
import './ServiceAreas.css'

const { region } = config.business

export default function ServiceAreas() {
  return (
    <section id="areas" className="areas fade-up">
      <div className="container areas__center">
        <p className="areas__eyebrow">Service Areas</p>
        <h2 className="areas__heading sh__heading">Serving the <span className="sp-cta__accent">{region}</span></h2>
        <div className="sh__line" />
      </div>
    </section>
  )
}
