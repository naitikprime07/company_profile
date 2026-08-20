import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Send,
  UploadCloud,
  UserRound,
  BriefcaseBusiness,
  Link2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getOneOpenings } from "../services/openingService";
import {
  submitApplication,
  uploadResume,
} from "../services/applicationService";
import SelectField from "../components/common/SelectField";
import styles from "./JobApplicationPage.module.css";

const cachedOpeningDetails = new Map();
const pendingOpeningDetails = new Map();

function SectionTitle({ icon: Icon, title, tone }) {
  return (
    <h2 className={styles.sectionTitle} style={{ "--tone": tone }}>
      <Icon size={21} />
      {title}
    </h2>
  );
}

const COUNTRY_CODES = [
  {
    code: "+91",
    country: "India",
    flag: "IN",
    example: "9876543210",
    digits: 10,
  },
  {
    code: "+1",
    country: "USA / Canada",
    flag: "US",
    example: "2025550123",
    digits: 10,
  },
  {
    code: "+44",
    country: "United Kingdom",
    flag: "GB",
    example: "7700900123",
    digits: 10,
  },
  {
    code: "+61",
    country: "Australia",
    flag: "AU",
    example: "412345678",
    digits: 9,
  },
  { code: "+971", country: "UAE", flag: "AE", example: "501234567", digits: 9 },
  {
    code: "+65",
    country: "Singapore",
    flag: "SG",
    example: "81234567",
    digits: 8,
  },
];
const NOTICE_PERIODS = [
  "Immediate",
  "15 Days",
  "1 Month",
  "2 Months",
  "3 Months",
];

function JobApplicationPage() {
  const { openingId } = useParams();
  const phoneRef = useRef(null);
  const resumeRef = useRef(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [resumeFile, setResumeFile] = useState(null);
  const [opening, setOpening] = useState(null);
  const [pageState, setPageState] = useState("loading");
  const [submission, setSubmission] = useState({ status: "idle", message: "" });

  useEffect(() => {
    if (cachedOpeningDetails.has(openingId)) {
      setOpening(cachedOpeningDetails.get(openingId));
      setPageState(cachedOpeningDetails.get(openingId) ? "ready" : "missing");
      return;
    }

    const fetchPromise =
      pendingOpeningDetails.get(openingId) ||
      getOneOpenings(openingId)
        .then((opening) => {
          cachedOpeningDetails.set(openingId, opening || null);
          pendingOpeningDetails.delete(openingId);
          return opening;
        })
        .catch((error) => {
          pendingOpeningDetails.delete(openingId);
          throw error;
        });

    pendingOpeningDetails.set(openingId, fetchPromise);

    fetchPromise
      .then((opening) => {
        setOpening(opening || null);
        setPageState(opening ? "ready" : "missing");
      })
      .catch(() => setPageState("missing"));
  }, [openingId]);

  const submit = async (event) => {
    event.preventDefault();
    if (!resumeFile) {
      setSubmission({ status: "error", message: "Please select your resume." });
      resumeRef.current?.focus();
      return;
    }
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const nationalNumber = String(payload.phone).replace(/\D/g, "");
    payload.phone = `${payload.countryCode}${nationalNumber}`;
    delete payload.countryCode;
    setSubmission({ status: "loading", message: "" });
    try {
      payload.resumeUrl = await uploadResume(resumeFile);
      const result = await submitApplication(openingId, payload);
      form.reset();
      setCountryCode("+91");
      setResumeFile(null);
      setSubmission({ status: "success", message: result.message });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmission({
        status: "error",
        message: Object.values(error.fields || {})[0] || error.message,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (pageState === "loading")
    return <main className={styles.state}>Loading application…</main>;
  if (!opening)
    return (
      <main className={styles.state}>
        <h1>Opening not found</h1>
        <p>This position is no longer accepting applications.</p>
        <Link to="/career">Return to careers</Link>
      </main>
    );
  const experienced = opening.type === "experienced";
  const phoneConfig =
    COUNTRY_CODES.find((country) => country.code === countryCode) ||
    COUNTRY_CODES[0];
  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null;
    const allowedTypes = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);

    if (file && (!allowedTypes.has(file.type) || file.size > 5 * 1024 * 1024)) {
      event.target.value = "";
      setResumeFile(null);
      setSubmission({
        status: "error",
        message: "Resume must be a PDF, DOC, or DOCX file no larger than 5 MB.",
      });
      return;
    }

    setResumeFile(file);
    setSubmission({ status: "idle", message: "" });
  };

  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true">
        <div className={styles.aurora}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.trajectory}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.constellation}>
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className={styles.codeRail}>
          <span>DISCOVER / 01</span>
          <span>APPLY / 02</span>
          <span>GROW / 03</span>
          <span>LEAD / 04</span>
        </div>
      </div>
      <section className={styles.hero}>
        <div className={`${styles.heroContent} container`}>
          <div className={styles.heroCopy}>
            <Link to={`/career/position/${openingId}`}>
              <ArrowLeft size={17} /> Back to position details
            </Link>
            <p>CAREERS · APPLICATION</p>
            <h1>
              Build your next chapter
              <span className="text-gradient"> with us.</span>
            </h1>
            <span>Take the next step toward work that helps you grow.</span>
          </div>
          <div
            className={styles.applicationVisual}
            aria-label="Candidate application journey animation"
          >
            <div className={styles.consoleTop}>
              <span>
                <i /> CANDIDATE INTAKE
              </span>
              <b>LIVE</b>
            </div>
            <div className={styles.lottieFrame}>
              <DotLottieReact
                className={styles.applicationLottie}
                src="https://lottie.host/fa558015-5f5b-47c2-81c8-e88e80e576a3/GFacRYnkKa.lottie"
                loop
                autoplay
              />
            </div>
            <div className={styles.journeySteps}>
              <span>
                <b>01</b> PROFILE
              </span>
              <span>
                <b>02</b> EXPERIENCE
              </span>
              <span>
                <b>03</b> SUBMIT
              </span>
            </div>
            <div className={styles.scanLine} />
            <small className={styles.visualCode}>
              REF / {openingId.slice(-6).toUpperCase()}
            </small>
          </div>
        </div>
      </section>
      <form className={styles.form} onSubmit={submit}>
        <header>
          <span>YOUR APPLICATION</span>
          <h2>{opening.title}</h2>
          <div>
            <b>
              {opening.type === "internship" ? "INTERNSHIP" : "EXPERIENCED"}
            </b>
            <span>{opening.location}</span>
            <span>
              {opening.experience || (experienced ? "Experienced" : "Fresher")}
            </span>
            <span>{opening.commitment || "FULL-TIME"}</span>
          </div>
        </header>
        {submission.status === "success" && (
          <div className={styles.success}>
            <CheckCircle2 size={23} />
            <div>
              <strong>Application received</strong>
              <p>{submission.message}</p>
            </div>
          </div>
        )}
        {submission.status === "error" && (
          <div className={styles.error} role="alert">
            {submission.message}
          </div>
        )}

        <section>
          <SectionTitle
            icon={UserRound}
            title="Personal information"
            tone="#5bd5ff"
          />
          <div className={styles.two}>
            <label>
              First name *
              <input
                name="firstName"
                placeholder="e.g. John"
                required
                minLength="2"
                maxLength="60"
                pattern=".*\S.*"
                title="Enter your first name"
                autoComplete="given-name"
              />
            </label>
            <label>
              Last name *
              <input
                name="lastName"
                placeholder="e.g. Smith"
                required
                minLength="2"
                maxLength="60"
                pattern=".*\S.*"
                title="Enter your last name"
                autoComplete="family-name"
              />
            </label>
            <label>
              Email address *
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                maxLength="254"
                autoComplete="email"
              />
            </label>
            <label>
              Phone number *
              <span className={styles.phoneControl}>
                <SelectField
                  name="countryCode"
                  defaultValue="+91"
                  label=""
                  placeholder="Country code"
                  options={COUNTRY_CODES.map(({ code, country, flag }) => ({
                    value: code,
                    shortLabel: code,
                    label: `${flag}  ${code} · ${country}`,
                  }))}
                  onChange={(code) => {
                    setCountryCode(code);
                    if (phoneRef.current) phoneRef.current.value = "";
                  }}
                  required
                />
                <input
                  ref={phoneRef}
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder={phoneConfig.example}
                  required
                  minLength={phoneConfig.digits}
                  maxLength={phoneConfig.digits}
                  pattern={`[1-9][0-9]{${phoneConfig.digits - 1}}`}
                  title={`Enter ${phoneConfig.digits} digits without the country code`}
                  autoComplete="tel-national"
                />
              </span>
            </label>
          </div>
          <label>
            Current location *
            <input
              name="location"
              placeholder="e.g. Surat, India"
              required
              maxLength="120"
              pattern=".*\S.*"
              title="Enter your current location"
              autoComplete="address-level2"
            />
          </label>
        </section>

        <section>
          <SectionTitle
            icon={BriefcaseBusiness}
            title={
              experienced ? "Professional history" : "Education & experience"
            }
            tone="#487fff"
          />
          <div className={styles.two}>
            <label>
              {experienced ? "Current company" : "College / institution"}
              <input
                name="currentCompany"
                maxLength="120"
                placeholder={
                  experienced ? "e.g. Tech Corp" : "e.g. Gujarat University"
                }
                autoComplete="organization"
              />
            </label>
            <label>
              {experienced ? "Current role" : "Course / specialization"}
              <input
                name="currentRole"
                maxLength="120"
                placeholder={
                  experienced
                    ? "e.g. Senior Developer"
                    : "e.g. B.Tech Computer Science"
                }
              />
            </label>
          </div>
          <div className={styles.three}>
            <label>
              Experience (years)
              <input
                name="experienceYears"
                type="number"
                min="0"
                max="60"
                step="1"
                defaultValue="0"
              />
            </label>
            <label>
              Experience (months)
              <input
                name="experienceMonths"
                type="number"
                min="0"
                max="11"
                step="1"
                defaultValue="0"
              />
            </label>
            <SelectField
              label={`Notice period${experienced ? " *" : ""}`}
              name="noticePeriod"
              placeholder="Select period"
              options={NOTICE_PERIODS}
              required={experienced}
            />
          </div>
          {experienced && (
            <div className={styles.two}>
              <label>
                Current CTC (₹ / year)
                <input
                  name="currentCtc"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 1200000"
                />
              </label>
              <label>
                Expected CTC (₹ / year)
                <input
                  name="expectedCtc"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 1800000"
                />
              </label>
            </div>
          )}
        </section>

        <section>
          <SectionTitle icon={Link2} title="Online profiles" tone="#35c99a" />
          <div className={styles.two}>
            <label>
              Portfolio / website
              <input
                name="portfolioUrl"
                type="url"
                maxLength="500"
                placeholder="https://…"
              />
            </label>
            <label>
              LinkedIn profile
              <input
                name="linkedInUrl"
                type="url"
                maxLength="500"
                pattern="https?://(www\.)?linkedin\.com/.*"
                title="Enter a valid LinkedIn profile URL"
                placeholder="https://linkedin.com/in/…"
              />
            </label>
          </div>
          <label>
            GitHub / code repository
            <input
              name="githubUrl"
              type="url"
              maxLength="500"
              pattern="https?://(www\.)?github\.com/.*"
              title="Enter a valid GitHub URL"
              placeholder="https://github.com/…"
            />
          </label>
        </section>

        <section>
          <SectionTitle
            icon={FileText}
            title="Resume & additional information"
            tone="#ffb347"
          />
          <label>
            Resume (PDF, DOC or DOCX) *
            <button
              type="button"
              className={styles.dropzone}
              onClick={() => resumeRef.current?.click()}
            >
              <UploadCloud size={30} />
              <strong>{resumeFile?.name || "Choose your resume"}</strong>
              <span>Maximum file size: 5 MB</span>
            </button>
            <input
              ref={resumeRef}
              className={styles.fileInput}
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleResumeChange}
            />
          </label>
          <label>
            Cover letter (optional)
            <textarea
              name="coverLetter"
              rows="6"
              maxLength="3000"
              placeholder="Tell us briefly why you are a strong fit for this role."
            />
          </label>
        </section>
        <footer>
          <p>
            By submitting, you confirm that the information provided is
            accurate.
          </p>
          <button disabled={submission.status === "loading"}>
            {submission.status === "loading"
              ? "Submitting…"
              : "Submit application"}
            <Send size={17} />
          </button>
        </footer>
      </form>
    </main>
  );
}
export default JobApplicationPage;
