import { ArrowUpRight, Globe2, Palette, Smartphone, TrendingUp } from 'lucide-react'
import styles from './ProfessionalServices.module.css'
import { mailTo } from '../../../constants/environment'

const PROFESSIONAL_SERVICES = [
  { icon: Smartphone, number: '01', type: 'mobile', title: 'Mobile Application', copy: 'Native iOS, Android, and Flutter applications shaped around real customer needs and dependable product performance.' },
  { icon: Palette, number: '02', type: 'design', title: 'UX / UI Designing', copy: 'Thoughtful user journeys and polished interface systems that make complex products clear, useful, and enjoyable.' },
  { icon: Globe2, number: '03', type: 'web', title: 'Web Development', copy: 'Modern, responsive web platforms engineered for accessibility, speed, security, and sustainable business growth.' },
  { icon: TrendingUp, number: '04', type: 'growth', title: 'Digital Marketing', copy: 'Focused growth strategies that connect your product with the right audience and turn attention into measurable momentum.' },
]

function ProfessionalServices() {
  return (
    <section className={styles.section} id="services" aria-labelledby="professional-services-title" data-reveal>
      <div className="container">
        <header className={styles.heading}>
          <p className="eyebrow">What we do best</p>
          <h2 id="professional-services-title">Professional <span>Services</span></h2>
          <p>Comprehensive technology solutions designed to accelerate your business growth and establish lasting market leadership.</p>
        </header>
        <div className={styles.grid}>
          {PROFESSIONAL_SERVICES.map(({ icon: Icon, number, type, title, copy }) => (
            <article className={`${styles.card} ${styles[type]}`} key={title}>
              <div className={styles.cardTop}><span className={styles.icon}><Icon size={24} /></span><small>{number}</small></div>
              <div className={styles.content}><h3>{title}</h3><p>{copy}</p><a href={mailTo()} aria-label={`Discuss ${title}`}><span>Discuss your project</span><ArrowUpRight size={17} /></a></div>
              <div className={styles.visual} aria-hidden="true"><span className={styles.visualCore}><Icon size={22} /></span><i /><i /><i /><i /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfessionalServices
