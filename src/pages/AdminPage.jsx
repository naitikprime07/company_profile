import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness, Building2, Inbox,
  Download, Files, LogOut, Mail, MapPin, Phone, Plus, Trash2, Users,
} from "lucide-react";
import {
  createOpening, deleteOpening, downloadResume, getAdminOpenings, getApplications, getContacts,
  loginAdmin, setApplicationStatus, setContactStatus,
} from "../services/adminService";
import styles from "./AdminPage.module.css";

const STATUS_LABELS = { new: "New", in_progress: "In progress", resolved: "Resolved" };
const APPLICATION_STATUS = { new: "New", reviewing: "Reviewing", shortlisted: "Shortlisted", rejected: "Rejected", hired: "Hired" };

function AdminPage() {
  const [token, setToken] = useState(sessionStorage.getItem("adminToken"));
  const [activeView, setActiveView] = useState("inquiries");
  const [contacts, setContacts] = useState([]);
  const [openings, setOpenings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [contactData, openingData, applicationData] = await Promise.all([getContacts(), getAdminOpenings(), getApplications()]);
      setContacts(contactData);
      setOpenings(openingData);
      setApplications(applicationData);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token, activeView]);

  const changeView = (view) => {
    if (view === activeView) {
      load();
      return;
    }

    setActiveView(view);
  };

  const stats = useMemo(() => ({
    total: contacts.length,
    new: contacts.filter((item) => item.status === "new").length,
    active: contacts.filter((item) => item.status === "in_progress").length,
    openings: openings.filter((item) => item.isActive).reduce((total,item)=>total+(Number(item.vacancies)||1),0),
    applications: applications.length,
  }), [contacts, openings, applications]);

  const login = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const form = new FormData(event.currentTarget);
      const data = await loginAdmin(form.get("email"), form.get("password"));
      sessionStorage.setItem("adminToken", data.token);
      setToken(data.token);
    } catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  };

  if (!token) return (
    <main className={styles.loginPage}>
      <section className={styles.loginPanel}>
        <div className={styles.brandMark}><Building2 size={25} /></div>
        <p className={styles.kicker}>PRIME SOFTECH · ADMIN</p>
        <h1>Welcome back</h1>
        <p className={styles.loginCopy}>Sign in to manage inquiries and career opportunities.</p>
        <form onSubmit={login}>
          <label>Email address<input name="email" type="email" autoComplete="username" placeholder="admin@company.com" required /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required /></label>
          <button disabled={loading}>{loading ? "Signing in…" : "Sign in to dashboard"}</button>
        </form>
        {error && <p className={styles.formError} role="alert">{error}</p>}
        <small>Protected administrative access</small>
      </section>
      <div className={styles.loginVisual}><span>Manage your business</span><h2>One workspace for every new opportunity.</h2></div>
    </main>
  );

  const logout = () => { sessionStorage.removeItem("adminToken"); setToken(null); };
  const addOpening = async (event) => {
    event.preventDefault(); setError("");
    const form = event.currentTarget;
    try {
      const payload = Object.fromEntries(new FormData(form));
      await createOpening({ ...payload, isActive: true });
      form.reset(); await load();
    } catch (requestError) { setError(requestError.message); }
  };

  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><span><Building2 size={21} /></span><div><strong>Prime Softech</strong><small>Admin workspace</small></div></div>
        <nav>
          <button className={activeView === "inquiries" ? styles.navActive : ""} onClick={() => changeView("inquiries")}><Inbox size={18} /> Inquiries {stats.new > 0 && <b>{stats.new}</b>}</button>
          <button className={activeView === "applications" ? styles.navActive : ""} onClick={() => changeView("applications")}><Files size={18} /> Applications {applications.filter((item)=>item.status==="new").length > 0 && <b>{applications.filter((item)=>item.status==="new").length}</b>}</button>
          <button className={activeView === "openings" ? styles.navActive : ""} onClick={() => changeView("openings")}><BriefcaseBusiness size={18} /> Career openings</button>
        </nav>
        <button className={styles.logout} onClick={logout}><LogOut size={18} /> Log out</button>
      </aside>

      <div className={styles.content}>
        <header className={styles.header}><div><p>ADMIN CONSOLE</p><h1>{activeView === "inquiries" ? "Incoming inquiries" : activeView === "applications" ? "Job applications" : "Career openings"}</h1></div><div className={styles.avatar}>AD</div></header>
        {error && <p className={styles.banner} role="alert">{error}</p>}

        <section className={styles.stats}>
          <article><span><Users size={20} /></span><div><small>Total inquiries</small><strong>{stats.total}</strong></div></article>
          <article><span><Inbox size={20} /></span><div><small>New requests</small><strong>{stats.new}</strong></div></article>
          <article><span><Files size={20} /></span><div><small>Applications</small><strong>{stats.applications}</strong></div></article>
          <article><span><BriefcaseBusiness size={20} /></span><div><small>Open positions</small><strong>{stats.openings}</strong></div></article>
        </section>

        {activeView === "inquiries" ? (
          <section className={styles.panel}>
            <div className={styles.panelHead}><div><h2>Contact requests</h2><p>Review and follow up with prospective clients.</p></div><span>{contacts.length} records</span></div>
            {loading ? <p className={styles.empty}>Loading inquiries…</p> : contacts.length === 0 ? <p className={styles.empty}>No inquiries received yet.</p> : (
              <div className={styles.tableWrap}><table><thead><tr><th>Contact</th><th>Project</th><th>Message</th><th>Received</th><th>Status</th></tr></thead><tbody>
                {contacts.map((contact) => <tr key={contact._id}>
                  <td><strong>{contact.name}</strong><a href={`mailto:${contact.email}`}><Mail size={13}/>{contact.email}</a><a href={`tel:${contact.phone}`}><Phone size={13}/>{contact.phone}</a></td>
                  <td><strong>{contact.company || "Independent"}</strong><span>{contact.service}</span><small>{contact.budget}</small></td>
                  <td><p className={styles.message}>{contact.message}</p></td>
                  <td><span>{new Date(contact.createdAt).toLocaleDateString()}</span></td>
                  <td><select className={styles[contact.status]} value={contact.status} onChange={async (event) => { await setContactStatus(contact._id, event.target.value); load(); }}>{Object.entries(STATUS_LABELS).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></td>
                </tr>)}
              </tbody></table></div>
            )}
          </section>
        ) : activeView === "applications" ? (
          <section className={styles.panel}>
            <div className={styles.panelHead}><div><h2>Candidate applications</h2><p>Review applicants, download resumes, and manage hiring progress.</p></div><span>{applications.length} records</span></div>
            {loading ? <p className={styles.empty}>Loading applications…</p> : applications.length === 0 ? <p className={styles.empty}>No applications received yet.</p> : (
              <div className={styles.tableWrap}><table><thead><tr><th>Candidate</th><th>Opening</th><th>Experience</th><th>Profiles</th><th>Resume</th><th>Status</th></tr></thead><tbody>
                {applications.map((item)=><tr key={item._id}>
                  <td><strong>{item.firstName} {item.lastName}</strong><a href={`mailto:${item.email}`}><Mail size={13}/>{item.email}</a><a href={`tel:${item.phone}`}><Phone size={13}/>{item.phone}</a><small>{item.location}</small></td>
                  <td><strong>{item.openingTitle}</strong><span>{item.opportunityType}</span><small>{new Date(item.createdAt).toLocaleDateString()}</small></td>
                  <td><span>{item.currentRole || "Not provided"}</span><small>{item.experienceYears}y {item.experienceMonths}m · {item.noticePeriod || "No notice period"}</small></td>
                  <td>{item.linkedInUrl&&<a href={item.linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a>}{item.portfolioUrl&&<a href={item.portfolioUrl} target="_blank" rel="noreferrer">Portfolio</a>}{item.githubUrl&&<a href={item.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}</td>
                  <td><button className={styles.downloadButton} onClick={()=>downloadResume(item._id,item.resume.originalName)}><Download size={14}/> Resume</button></td>
                  <td><select className={styles[item.status]} value={item.status} onChange={async(event)=>{await setApplicationStatus(item._id,event.target.value);load();}}>{Object.entries(APPLICATION_STATUS).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></td>
                </tr>)}
              </tbody></table></div>
            )}
          </section>
        ) : (
          <div className={styles.openingLayout}>
            <section className={styles.panel}><div className={styles.panelHead}><div><h2>Publish an opening</h2><p>Add a position to the public Career page.</p></div><Plus size={20}/></div>
              <form className={styles.openingForm} onSubmit={addOpening}>
                <label>Position title<input name="title" placeholder="e.g. Senior React Developer" required /></label>
                <div><label>Opportunity type<select name="type"><option value="internship">Internship</option><option value="experienced">Experienced opportunity</option></select></label><label>Location<input name="location" placeholder="Surat, Gujarat / Remote" required /></label></div>
                <div><label>Experience required<input name="experience" maxLength="100" placeholder="e.g. 2–4 years / Fresher" required /></label><label>Commitment<select name="commitment" required><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option><option value="Internship program">Internship program</option></select></label></div>
                <label>Number of openings<input name="vacancies" type="number" min="1" max="500" step="1" defaultValue="1" required /></label>
                <label>Short summary<textarea name="description" rows="3" maxLength="1000" placeholder="A concise summary shown on the opening card…" required /></label>
                <label>Role overview<textarea name="roleOverview" rows="6" maxLength="3000" placeholder="Explain the role, responsibilities, team context, and expected impact…" required /></label>
                <label>Key requirements<textarea name="keyRequirements" rows="7" maxLength="4000" placeholder={"Add one requirement per line, for example:\n3+ years of React experience\nStrong JavaScript fundamentals\nClear communication skills"} required /></label>
                <button><Plus size={17}/> Publish opening</button>
              </form>
            </section>
            <section className={styles.panel}><div className={styles.panelHead}><div><h2>Published openings</h2><p>Currently managed positions.</p></div><span>{openings.length} total</span></div>
              <div className={styles.openingList}>{openings.length === 0 ? <p className={styles.empty}>No openings published.</p> : openings.map((opening) => <article key={opening._id}><div><small>{opening.type}</small><h3>{opening.title}</h3><span><MapPin size={14}/>{opening.location}</span><span>{opening.experience || "Experience not specified"} · {opening.commitment || "Full-time"}</span><span>{Number(opening.vacancies)||1} {(Number(opening.vacancies)||1)===1?"vacancy":"vacancies"}</span><p>{opening.description}</p></div><button aria-label={`Delete ${opening.title}`} onClick={async()=>{await deleteOpening(opening._id);load();}}><Trash2 size={17}/></button></article>)}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
export default AdminPage;
