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
const MAX_PHONE_DIGITS = 10;

function limitPhoneNumber(event) {
  const input = event.currentTarget;
  const digits = input.value.replace(/\D/g, "").slice(0, MAX_PHONE_DIGITS);

  input.value = digits;
  return digits.length;
}

function ContactForm() {
  const [submission, setSubmission] = useState({ status: "idle", message: "" });
  const [counts, setCounts] = useState({ company: 0, message: 0, phone: 0 });

  const updateCount = (field) => (event) => {
    const length = event.currentTarget.value.length;

    setCounts((current) => ({
      ...current,
      [field]: length,
    }));
  };

  const handlePhoneInput = (event) => {
    const phoneDigits = limitPhoneNumber(event);
    setCounts((current) => ({ ...current, phone: phoneDigits }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmission({ status: "loading", message: "" });

    try {
      const result = await submitContact(payload);
      form.reset();
      setCounts({ company: 0, message: 0, phone: 0 });
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
    <form
      id="contact-form"
      className={styles.form}
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
    >
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
        <span className={styles.labelRow}>
          <span>Company or organization</span>
          <small>{counts.company}/150</small>
        </span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company name (optional)"
          maxLength={150}
          onInput={updateCount("company")}
        />
      </label>
      <label>
        <span className={styles.labelRow}>
          <span>Mobile number</span>
          <small>
            {counts.phone}/{MAX_PHONE_DIGITS} digits
          </small>
        </span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="9876543210"
          maxLength={MAX_PHONE_DIGITS}
          pattern="[1-9][0-9]{9}"
          title="Enter a 10-digit mobile number"
          onInput={handlePhoneInput}
          required
        />
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
        <span className={styles.labelRow}>
          <span>Tell us about the opportunity</span>
          <small>{counts.message}/500 · min 10</small>
        </span>
        <textarea
          name="message"
          rows="5"
          placeholder="What are you building, improving, or trying to solve?"
          minLength={10}
          maxLength={500}
          onInput={updateCount("message")}
          required
        />
      </label>
      <div className={styles.formBottom}>
        <p>
          By submitting, you agree that our team may contact you about this
          inquiry.
        </p>
        <button type="submit" disabled={isSubmitting}>
          <span>
            {isSubmitting ? "Sending brief..." : "Send project brief"}
          </span>
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
