import { ArrowUpRight } from 'lucide-react'
import { ENVIRONMENT } from '../../../constants/environment'
import styles from './ContactForm.module.css'
import SelectField from '../../common/SelectField'

const SERVICE_OPTIONS = ['Mobile application', 'UX / UI design', 'Web development', 'Digital marketing', 'Product strategy', 'Other']
const BUDGET_OPTIONS = ['Under $10k', '$10k – $25k', '$25k – $50k', '$50k+', 'Not decided']

function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Project inquiry from ${formData.get('name')}`)
    const body = encodeURIComponent([
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Company: ${formData.get('company') || 'Not provided'}`,
      `Service: ${formData.get('service')}`,
      `Budget: ${formData.get('budget')}`,
      '',
      formData.get('message'),
    ].join('\n'))

    window.location.href = `mailto:${ENVIRONMENT.contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formTop}><span><i /> NEW PROJECT BRIEF</span><b>SECURE</b></div>
      <div className={styles.twoColumns}><label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label><label>Work email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label></div>
      <label>Company or organization<input name="company" type="text" autoComplete="organization" placeholder="Company name (optional)" /></label>
      <div className={styles.twoColumns}><SelectField label="What can we help with?" name="service" placeholder="Select a service" options={SERVICE_OPTIONS} required /><SelectField label="Indicative budget" name="budget" placeholder="Select a range" options={BUDGET_OPTIONS} required /></div>
      <label>Tell us about the opportunity<textarea name="message" rows="5" placeholder="What are you building, improving, or trying to solve?" required /></label>
      <div className={styles.formBottom}><p>By submitting, you agree that our team may contact you about this inquiry.</p><button type="submit"><span>Send project brief</span><ArrowUpRight size={18} /></button></div>
    </form>
  )
}

export default ContactForm
