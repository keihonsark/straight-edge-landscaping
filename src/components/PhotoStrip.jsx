import './PhotoStrip.css'

const photos = [
  '/09_hedge_trimming.png',
  '/05_drip_system.png',
  '/03_sod_installation.png',
  '/04_yard_cleanup.png',
]

export default function PhotoStrip() {
  return (
    <section className="strip">
      {photos.map((src) => (
        <div key={src} className="strip__item">
          <img src={src} alt="" loading="lazy" />
        </div>
      ))}
    </section>
  )
}
