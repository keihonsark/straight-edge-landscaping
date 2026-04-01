import { useEffect } from 'react'

export default function useFadeUp() {
  useEffect(() => {
    if (window.innerWidth <= 768) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

    // Observe section headings and underlines
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Also trigger sibling underline
            const sibling = entry.target.nextElementSibling
            if (sibling && sibling.classList.contains('sh__line')) {
              sibling.classList.add('visible')
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    document.querySelectorAll('.sh__heading').forEach((el) => headingObserver.observe(el))

    return () => {
      observer.disconnect()
      headingObserver.disconnect()
    }
  }, [])
}
