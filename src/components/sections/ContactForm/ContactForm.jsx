import { useRef, useState, useEffect } from "react";
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
const COUNTRY_CODES = [
  {
    value: "+91",
    shortLabel: "+91",
    label: "IN  +91 · India",
    example: "9876543210",
    digits: 10,
  },
  {
    value: "+1",
    shortLabel: "+1",
    label: "US  +1 · USA / Canada",
    example: "2025550123",
    digits: 10,
  },
  {
    value: "+44",
    shortLabel: "+44",
    label: "GB  +44 · United Kingdom",
    example: "7700900123",
    digits: 10,
  },
  {
    value: "+61",
    shortLabel: "+61",
    label: "AU  +61 · Australia",
    example: "412345678",
    digits: 9,
  },
  {
    value: "+971",
    shortLabel: "+971",
    label: "AE  +971 · UAE",
    example: "501234567",
    digits: 9,
  },
  {
    value: "+65",
    shortLabel: "+65",
    label: "SG  +65 · Singapore",
    example: "81234567",
    digits: 8,
  },
];

function limitPhoneNumber(event, maximum) {
  const input = event.currentTarget;
  const digits = input.value.replace(/\D/g, "").slice(0, maximum);

  input.value = digits;
  return digits.length;
}

function ContactForm() {
  const phoneRef = useRef(null);
  const [countryCode, setCountryCode] = useState("+91");
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
    const phoneDigits = limitPhoneNumber(event, phoneConfig.digits);
    setCounts((current) => ({ ...current, phone: phoneDigits }));
  };

  const handleCountryChange = (code) => {
    setCountryCode(code);
    if (phoneRef.current) phoneRef.current.value = "";
    setCounts((current) => ({ ...current, phone: 0 }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.phone = `${payload.countryCode}${payload.phone}`;
    delete payload.countryCode;

    setSubmission({ status: "loading", message: "" });

    try {
      const result = await submitContact(payload);
      form.reset();
      setCountryCode("+91");
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

  // Auto-hide success/error message after 4 seconds
  useEffect(() => {
    if (submission.status === "success" || submission.status === "error") {
      const timer = setTimeout(() => {
        setSubmission({ status: "idle", message: "" });
      }, 4000);

      return () => clearTimeout(timer); // cleanup — jo naya submission aave to old timer cancel
    }
  }, [submission.status, submission.message]);

  const isSubmitting = submission.status === "loading";
  const phoneConfig =
    COUNTRY_CODES.find((country) => country.value === countryCode) ||
    COUNTRY_CODES[0];

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
      <div className={styles.twoColumns}>
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
              {counts.phone}/{phoneConfig.digits} digits
            </small>
          </span>
          <span className={styles.phoneControl}>
            <SelectField
              label=""
              name="countryCode"
              placeholder="Code"
              options={COUNTRY_CODES}
              defaultValue="+91"
              onChange={handleCountryChange}
              required
            />
            <input
              ref={phoneRef}
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={phoneConfig.example}
              minLength={phoneConfig.digits}
              maxLength={phoneConfig.digits}
              pattern={`[1-9][0-9]{${phoneConfig.digits - 1}}`}
              title={`Enter ${phoneConfig.digits} digits without the country code`}
              onInput={handlePhoneInput}
              required
            />
          </span>
        </label>
      </div>
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
