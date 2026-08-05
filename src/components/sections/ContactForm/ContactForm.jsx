import { useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import styles from "./ContactForm.module.css";
import SelectField from "../../common/SelectField";
import { submitContact } from "../../../services/contactService";

const SERVICE_OPTIONS = [
  "Mobile application",
  "UX / UI design",
  "Web development",
  "Digital marketing",
  "Product strategy",
  "Other",
];
const BUDGET_OPTIONS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
  "Not decided",
];

function ContactForm() {
  const [submission, setSubmission] = useState({ status: "idle", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmission({ status: "loading", message: "" });

    try {
      const result = await submitContact(payload);
      form.reset();
      setSubmission({ status: "success", message: result.message });
    } catch (error) {
      const fieldMessage = Object.values(error.fields || {})[0];
      setSubmission({
        status: "error",
        message: fieldMessage || error.message || "Unable to submit the form.",
      });
    }
  };

  const isSubmitting = submission.status === "loading";

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <div className={styles.formTop}>
        <span>
          <i /> NEW PROJECT BRIEF
        </span>
        <b>SECURE</b>
      </div>
      <div className={styles.twoColumns}>
        <label>
          Full name
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Work email
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </label>
      </div>
      <label>
        Company or organization
        <input
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company name (optional)"
        />
      </label>
      <label>
        Mobile number
        <input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required />
      </label>
      <div className={styles.twoColumns}>
        <SelectField
          label="What can we help with?"
          name="service"
          placeholder="Select a service"
          options={SERVICE_OPTIONS}
          required
        />
        <SelectField
          label="Indicative budget"
          name="budget"
          placeholder="Select a range"
          options={BUDGET_OPTIONS}
          required
        />
      </div>
      <label>
        Tell us about the opportunity
        <textarea
          name="message"
          rows="5"
          placeholder="What are you building, improving, or trying to solve?"
          required
        />
      </label>
      <div className={styles.formBottom}>
        <p>
          By submitting, you agree that our team may contact you about this
          inquiry.
        </p>
        <button type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Sending brief..." : "Send project brief"}</span>
          {isSubmitting ? (
            <LoaderCircle className={styles.spinner} size={18} />
          ) : (
            <ArrowUpRight size={18} />
          )}
        </button>
      </div>
      {submission.status !== "idle" && submission.status !== "loading" && (
        <p
          className={`${styles.feedback} ${styles[submission.status]}`}
          role={submission.status === "error" ? "alert" : "status"}
        >
          {submission.status === "success" && <CheckCircle2 size={18} />}
          <span>{submission.message}</span>
        </p>
      )}
    </form>
  );
}

export default ContactForm;
