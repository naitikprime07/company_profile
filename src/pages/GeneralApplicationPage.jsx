import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Send,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  submitGeneralApplication,
  uploadResume,
} from "../services/applicationService";
import styles from "./GeneralApplicationPage.module.css";

const codes = [
  { code: "+91", label: "IN +91", digits: 10 },
  { code: "+1", label: "US +1", digits: 10 },
  { code: "+44", label: "GB +44", digits: 10 },
  { code: "+61", label: "AU +61", digits: 9 },
  { code: "+971", label: "AE +971", digits: 9 },
  { code: "+65", label: "SG +65", digits: 8 },
];
const fieldLabels = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone number",
  location: "Current location",
  desiredRole: "Desired role",
  skills: "Core skills",
  experience: "Experience",
  interests: "Learning interests",
  message: "Impact statement",
  portfolioUrl: "Portfolio URL",
  linkedInUrl: "LinkedIn URL",
  githubUrl: "GitHub URL",
  resumeUrl: "Resume",
};
const friendlyError = (error) => {
  const entries = Object.entries(error.fields || {});
  if (!entries.length) {
    const message = /failed to fetch|networkerror/i.test(error.message || "")
      ? "Unable to connect to the server. Check your connection and try again."
      : error.message || "Something went wrong. Please try again.";
    return { message, field: "" };
  }
  return {
    field: entries[0][0],
    message: entries
      .map(
        ([field, message]) =>
          `${fieldLabels[field] || field}: ${String(message).replace(new RegExp(`^${field}\\s*`, "i"), "")}`,
      )
      .join(" • "),
  };
};
export default function GeneralApplicationPage() {
  const resumeRef = useRef(null);
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("+91");
  const [state, setState] = useState({ status: "idle", message: "" });
  const config = codes.find((x) => x.code === code);

  useEffect(() => {
    if (state.status !== "success" && state.status !== "error") return;

    const timer = window.setTimeout(() => {
      setState({ status: "idle", message: "" });
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [state.status, state.message]);

  const choose = (e) => {
    const next = e.target.files?.[0];
    if (
      next &&
      next.size <= 5 * 1024 * 1024 &&
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(next.type)
    ) {
      setFile(next);
    } else {
      e.target.value = "";
      setFile(null);
      setState({
        status: "error",
        message: "Select a PDF, DOC, or DOCX resume up to 5 MB.",
      });
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!file) {
      setState({
        status: "error",
        message: "Resume: please choose a PDF, DOC, or DOCX file up to 5 MB.",
      });
      resumeRef.current?.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    data.phone = `${data.countryCode}${String(data.phone).replace(/\D/g, "")}`;
    delete data.countryCode;
    setState({ status: "loading", message: "" });
    try {
      data.resumeUrl = await uploadResume(file);
      const result = await submitGeneralApplication(data);
      form.reset();
      setFile(null);
      setCode("+91");
      setState({ status: "success", message: result.message });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const issue = friendlyError(err);
      setState({ status: "error", message: issue.message });
      const target =
        issue.field === "resumeUrl"
          ? resumeRef.current
          : form.elements.namedItem(issue.field);
      target?.focus();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <Link to="/career">
            <ArrowLeft size={15} /> Back to careers
          </Link>
          <small>OPEN INTRODUCTION</small>
          <h1>Your best work may not have a title yet.</h1>
          <p>
            Show us what you can do, where you want to grow, and the problems
            you would love to solve.
          </p>
        </div>
        <span>
          <Sparkles size={30} />
        </span>
      </section>
      <form onSubmit={submit}>
        {state.status === "success" && (
          <div className={styles.success}>
            <CheckCircle2 />{" "}
            <div>
              <strong>Introduction received</strong>
              <p>{state.message}</p>
            </div>
          </div>
        )}
        {state.status === "error" && (
          <p className={styles.error}>{state.message}</p>
        )}
        <section>
          <h2>About you</h2>
          <div className={styles.two}>
            <label>
              First name *
              <input name="firstName" minLength="2" maxLength="60" required />
            </label>
            <label>
              Last name *
              <input name="lastName" minLength="2" maxLength="60" required />
            </label>
            <label>
              Email *
              <input name="email" type="email" maxLength="254" required />
            </label>
            <label>
              Phone *
              <span className={styles.phone}>
                <select
                  name="countryCode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                >
                  {codes.map((x) => (
                    <option key={x.code} value={x.code}>
                      {x.label}
                    </option>
                  ))}
                </select>
                <input
                  name="phone"
                  inputMode="numeric"
                  minLength={config.digits}
                  maxLength={config.digits}
                  pattern={`[1-9][0-9]{${config.digits - 1}}`}
                  required
                />
              </span>
            </label>
            <label>
              Current location *
              <input name="location" maxLength="120" required />
            </label>
            <label>
              Role you are interested in *
              <input
                name="desiredRole"
                maxLength="120"
                placeholder="Product designer, Backend engineer…"
                required
              />
            </label>
            <label>
              Experience
              <input
                name="experience"
                maxLength="120"
                placeholder="e.g. 3 years / Fresher"
              />
            </label>
          </div>
        </section>
        <section>
          <h2>Your direction</h2>
          <label>
            Core skills *
            <textarea
              name="skills"
              rows="4"
              minLength="3"
              maxLength="1000"
              placeholder="Tools, technologies, strengths, and domains…"
              required
            />
          </label>
          <label>
            What do you want to learn or work on? *
            <textarea
              name="interests"
              rows="4"
              minLength="3"
              maxLength="1000"
              required
            />
          </label>
          <label>
            Tell us about the impact you want to make *
            <textarea
              name="message"
              rows="7"
              minLength="20"
              maxLength="3000"
              required
            />
          </label>
        </section>
        <section>
          <h2>Work and profiles</h2>
          <div className={styles.two}>
            <label>
              Portfolio / website
              <input name="portfolioUrl" type="url" maxLength="500" />
            </label>
            <label>
              LinkedIn
              <input name="linkedInUrl" type="url" maxLength="500" />
            </label>
            <label>
              GitHub
              <input name="githubUrl" type="url" maxLength="500" />
            </label>
          </div>
          <label>
            Resume *
            <button
              className={styles.upload}
              type="button"
              onClick={() => resumeRef.current?.click()}
            >
              <UploadCloud size={24} />
              <span>
                <strong>{file?.name || "Choose your resume"}</strong>
                <small>PDF, DOC or DOCX · Maximum 5 MB</small>
              </span>
            </button>
            <input
              ref={resumeRef}
              className={styles.hidden}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={choose}
            />
          </label>
        </section>
        <footer>
          <span>
            <FileText size={14} /> Your introduction will be reviewed by our
            hiring team.
          </span>
          <button disabled={state.status === "loading"}>
            {state.status === "loading" ? "Submitting…" : "Introduce yourself"}
            <Send size={15} />
          </button>
        </footer>
      </form>
    </main>
  );
}
