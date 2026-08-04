import { useEffect, useRef, useState } from 'react'
import styles from './AnimatedStat.module.css'

const easeOutQuint = (progress) => 1 - ((1 - progress) ** 5)

function AnimatedStat({ value, suffix = '', label, delay = 0, duration = 1700 }) {
  const rootRef = useRef(null)
  const frameRef = useRef(null)
  const timerRef = useRef(null)
  const [displayValue, setDisplayValue] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const element = rootRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayValue(value)
      setIsComplete(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return

      observer.disconnect()
      timerRef.current = window.setTimeout(() => {
        const startedAt = performance.now()

        const updateCount = (currentTime) => {
          const progress = Math.min((currentTime - startedAt) / duration, 1)
          setDisplayValue(Math.round(value * easeOutQuint(progress)))

          if (progress < 1) {
            frameRef.current = window.requestAnimationFrame(updateCount)
          } else {
            setIsComplete(true)
          }
        }

        frameRef.current = window.requestAnimationFrame(updateCount)
      }, delay)
    }, { threshold: 0.55 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      window.clearTimeout(timerRef.current)
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [delay, duration, value])

  return (
    <div ref={rootRef} className={`${styles.stat} ${isComplete ? styles.complete : ''}`} aria-label={`${value}${suffix} ${label}`}>
      <span className={styles.index} aria-hidden="true">0{delay / 120 + 1}</span>
      <strong className={styles.value} aria-hidden="true">
        <span className={styles.number}>{displayValue}</span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </strong>
      <p>{label}</p>
      <span className={styles.track} aria-hidden="true"><i /></span>
    </div>
  )
}

export default AnimatedStat
