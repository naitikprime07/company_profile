import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Clock3, GraduationCap, MapPin, Sparkles, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { ENVIRONMENT } from "../constants/environment";
import { getOpenings } from "../services/openingService";
import styles from "./CareerOpeningsPage.module.css";

const PAGE_CONTENT = {
  internship: {
    eyebrow: "For emerging talent", title: "Internship opportunities",
    copy: "Start your career with guided, practical experience. Work alongside our team, contribute to real products, and build skills that matter.",
    Icon: GraduationCap,
  },
  experienced: {
    eyebrow: "For experienced professionals", title: "Experienced opportunities",
    copy: "Bring your expertise to meaningful product challenges. Own outcomes, influence decisions, and help shape digital experiences used by real people.",
    Icon: BriefcaseBusiness,
  },
};

function applicationUrl(title) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ENVIRONMENT.careersEmail)}&su=${encodeURIComponent(`${title} application — Prime Softech`)}`;
}

function CareerOpeningsPage({ type }) {
  const content = PAGE_CONTENT[type];
  const [state, setState] = useState({ loading: true, openings: [], error: "" });

  useEffect(() => {
    let active = true;
    setState({ loading: true, openings: [], error: "" });
    getOpenings().then((items) => {
      if (active) setState({ loading: false, openings: items.filter((item) => item.type === type), error: "" });
    }).catch(() => {
      if (active) setState({ loading: false, openings: [], error: "Unable to load openings right now. Please try again shortly." });
    });
    return () => { active = false; };
  }, [type]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <Link className={styles.back} to="/career"><ArrowLeft size={17} /> Back to careers</Link>
          <div className={styles.heroGrid}>
            <div><p className={styles.eyebrow}>{content.eyebrow}</p><h1>{content.title}</h1><p className={styles.intro}>{content.copy}</p></div>
            <div className={styles.careerVisual} aria-label={`${content.title} career animation`}>
              <div className={styles.orbit} aria-hidden="true"><i /><i /><i /></div>
              <div className={styles.animationFrame}>
                <DotLottieReact className={styles.careerAnimation} src="https://lottie.host/edee592e-e1bd-477c-8cbc-19ce85174348/OKqBTBHfTD.lottie" loop autoplay />
              </div>
              <span className={styles.categoryBadge}><content.Icon size={16} /> {type === "internship" ? "LEARN & BUILD" : "CREATE & LEAD"}</span>
              <span className={styles.signalBadge}><Sparkles size={14} /> OPPORTUNITIES LIVE</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.listing} container`}>
        <header><div><p className={styles.eyebrow}>Open positions</p><h2>Find where you can make an impact.</h2></div><span>{state.openings.length} {state.openings.length === 1 ? "opening" : "openings"}</span></header>
        {state.loading && <div className={styles.state}>Loading current opportunities…</div>}
        {state.error && <div className={`${styles.state} ${styles.error}`}>{state.error}</div>}
        {!state.loading && !state.error && state.openings.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyAnimationWrap} aria-label="No current openings animation">
              <DotLottieReact
                className={styles.emptyAnimation}
                src="https://lottie.host/910dc810-3f99-4ef3-8a98-5876dd26762b/X0l6pxanHl.lottie"
                loop
                autoplay
              />
            </div>
            <h3>No active {type === "internship" ? "internships" : "experienced roles"} right now.</h3><p>We are always interested in meeting thoughtful people. Introduce yourself and we will keep you in mind.</p><a href={applicationUrl(type === "internship" ? "Internship" : "Open opportunity")} target="_blank" rel="noreferrer">Introduce yourself <ArrowUpRight size={17} /></a>
          </div>
        )}
        <div className={styles.grid}>{state.openings.map((opening) => (
          <article key={opening._id}>
            <div className={styles.cardTop}><span>{type === "internship" ? <GraduationCap size={20}/> : <BriefcaseBusiness size={20}/>}</span><small>OPEN</small></div>
            <h3>{opening.title}</h3>
            <div className={styles.meta}><span><MapPin size={15}/>{opening.location}</span><span><BriefcaseBusiness size={15}/>{opening.experience || (type === "internship" ? "Fresher" : "Experienced")}</span><span><Clock3 size={15}/>{opening.commitment || "Full-time"}</span></div>
            <div className={styles.vacancy}><UsersRound size={15}/><strong>{Number(opening.vacancies)||1}</strong> {(Number(opening.vacancies)||1)===1?"vacancy":"vacancies"} available</div>
            <p>{opening.description}</p>
            <Link to={`/career/position/${opening._id}`}>View position details <ArrowUpRight size={18}/></Link>
          </article>
        ))}</div>
      </section>
    </main>
  );
}
export default CareerOpeningsPage;
