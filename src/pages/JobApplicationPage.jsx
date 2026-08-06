import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowLeft, CheckCircle2, FileText, Send, UploadCloud, UserRound, BriefcaseBusiness, Link2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getOpenings } from "../services/openingService";
import { submitApplication } from "../services/applicationService";
import styles from "./JobApplicationPage.module.css";

function SectionTitle({ icon: Icon, title, tone }) { return <h2 className={styles.sectionTitle} style={{ "--tone": tone }}><Icon size={21}/>{title}</h2>; }

function JobApplicationPage() {
  const { openingId } = useParams();
  const fileRef = useRef(null);
  const [opening, setOpening] = useState(null);
  const [pageState, setPageState] = useState("loading");
  const [fileName, setFileName] = useState("");
  const [submission, setSubmission] = useState({ status: "idle", message: "" });

  useEffect(() => { getOpenings().then((items) => { const match=items.find((item)=>item._id===openingId);setOpening(match||null);setPageState(match?"ready":"missing"); }).catch(()=>setPageState("missing")); }, [openingId]);
  const submit = async (event) => { event.preventDefault(); const form=event.currentTarget; setSubmission({status:"loading",message:""}); try { const result=await submitApplication(openingId,new FormData(form)); form.reset();setFileName("");setSubmission({status:"success",message:result.message});window.scrollTo({top:0,behavior:"smooth"}); } catch(error){setSubmission({status:"error",message:Object.values(error.fields||{})[0]||error.message});} };

  if (pageState === "loading") return <main className={styles.state}>Loading application…</main>;
  if (!opening) return <main className={styles.state}><h1>Opening not found</h1><p>This position is no longer accepting applications.</p><Link to="/career">Return to careers</Link></main>;
  const experienced = opening.type === "experienced";

  return <main className={styles.page}>
    <div className={styles.background} aria-hidden="true">
      <div className={styles.aurora}><i /><i /><i /></div>
      <div className={styles.trajectory}><span /><span /><span /><span /></div>
      <div className={styles.constellation}><i /><i /><i /><i /><i /><i /></div>
      <div className={styles.codeRail}><span>DISCOVER / 01</span><span>APPLY / 02</span><span>GROW / 03</span><span>LEAD / 04</span></div>
    </div>
    <section className={styles.hero}>
      <div className={`${styles.heroContent} container`}>
        <div className={styles.heroCopy}><Link to={`/career/position/${openingId}`}><ArrowLeft size={17}/> Back to position details</Link><p>CAREERS · APPLICATION</p><h1>Build your next chapter with us.</h1><span>Take the next step toward work that helps you grow.</span></div>
        <div className={styles.applicationVisual} aria-label="Candidate application journey animation">
          <div className={styles.consoleTop}><span><i/> CANDIDATE INTAKE</span><b>LIVE</b></div>
          <div className={styles.lottieFrame}><DotLottieReact className={styles.applicationLottie} src="https://lottie.host/fa558015-5f5b-47c2-81c8-e88e80e576a3/GFacRYnkKa.lottie" loop autoplay /></div>
          <div className={styles.journeySteps}><span><b>01</b> PROFILE</span><span><b>02</b> EXPERIENCE</span><span><b>03</b> SUBMIT</span></div>
          <div className={styles.scanLine}/><small className={styles.visualCode}>REF / {openingId.slice(-6).toUpperCase()}</small>
        </div>
      </div>
    </section>
    <form className={styles.form} onSubmit={submit}>
      <header><span>YOUR APPLICATION</span><h2>{opening.title}</h2><div><b>{opening.type === "internship"?"INTERNSHIP":"EXPERIENCED"}</b><span>{opening.location}</span><span>{opening.experience || (experienced?"Experienced":"Fresher")}</span><span>{opening.commitment || "FULL-TIME"}</span></div></header>
      {submission.status === "success" && <div className={styles.success}><CheckCircle2 size={23}/><div><strong>Application received</strong><p>{submission.message}</p></div></div>}
      {submission.status === "error" && <div className={styles.error} role="alert">{submission.message}</div>}

      <section><SectionTitle icon={UserRound} title="Personal information" tone="#5bd5ff"/><div className={styles.two}><label>First name *<input name="firstName" placeholder="e.g. John" required maxLength="60"/></label><label>Last name *<input name="lastName" placeholder="e.g. Smith" required maxLength="60"/></label><label>Email address *<input name="email" type="email" placeholder="you@example.com" required/></label><label>Phone number *<input name="phone" type="tel" placeholder="+91 98765 43210" required/></label></div><label>Current location *<input name="location" placeholder="e.g. Surat, India" required/></label></section>

      <section><SectionTitle icon={BriefcaseBusiness} title={experienced?"Professional history":"Education & experience"} tone="#487fff"/><div className={styles.two}><label>{experienced?"Current company":"College / institution"}<input name="currentCompany" placeholder={experienced?"e.g. Tech Corp":"e.g. Gujarat University"}/></label><label>{experienced?"Current role":"Course / specialization"}<input name="currentRole" placeholder={experienced?"e.g. Senior Developer":"e.g. B.Tech Computer Science"}/></label></div><div className={styles.three}><label>Experience (years)<input name="experienceYears" type="number" min="0" max="60" defaultValue="0"/></label><label>Experience (months)<input name="experienceMonths" type="number" min="0" max="11" defaultValue="0"/></label><label>Notice period {experienced&&"*"}<select name="noticePeriod" required={experienced}><option value="">Select period</option><option>Immediate</option><option>15 Days</option><option>1 Month</option><option>2 Months</option><option>3 Months</option></select></label></div>{experienced&&<div className={styles.two}><label>Current CTC (₹ / year)<input name="currentCtc" type="number" min="0" placeholder="e.g. 1200000"/></label><label>Expected CTC (₹ / year)<input name="expectedCtc" type="number" min="0" placeholder="e.g. 1800000"/></label></div>}</section>

      <section><SectionTitle icon={Link2} title="Online profiles" tone="#35c99a"/><div className={styles.two}><label>Portfolio / website<input name="portfolioUrl" type="url" placeholder="https://…"/></label><label>LinkedIn profile<input name="linkedInUrl" type="url" placeholder="https://linkedin.com/in/…"/></label></div><label>GitHub / code repository<input name="githubUrl" type="url" placeholder="https://github.com/…"/></label></section>

      <section><SectionTitle icon={FileText} title="Resume & cover letter" tone="#ffb347"/><label className={styles.fileLabel}>Resume (PDF/DOC/DOCX) *<button type="button" className={styles.dropzone} onClick={()=>fileRef.current?.click()}><UploadCloud size={30}/><strong>{fileName||"Upload your resume"}</strong><span>PDF, DOC or DOCX · maximum 5 MB</span></button><input ref={fileRef} className={styles.fileInput} name="resume" type="file" accept=".pdf,.doc,.docx" required onChange={(event)=>setFileName(event.target.files[0]?.name||"")}/></label><label>Cover letter (optional)<textarea name="coverLetter" rows="6" maxLength="3000" placeholder="Tell us briefly why you are a strong fit for this role."/></label></section>
      <footer><p>By submitting, you confirm that the information provided is accurate.</p><button disabled={submission.status==="loading"}>{submission.status==="loading"?"Submitting…":"Submit application"}<Send size={17}/></button></footer>
    </form>
  </main>;
}
export default JobApplicationPage;
