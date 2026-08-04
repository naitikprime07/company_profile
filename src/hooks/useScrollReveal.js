import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])
}

export default useScrollReveal
