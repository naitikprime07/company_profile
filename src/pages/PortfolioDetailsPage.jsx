import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers3,
  ShieldCheck,
  Sparkles,
  Monitor,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPortfolioItem } from "../services/portfolioService";
import styles from "./PortfolioDetailsPage.module.css";
import heroStyles from "./PortfolioDetailsHero.module.css";

const dash = "—";

export default function PortfolioDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    let active = true;
    getPortfolioItem(id)
      .then((item) => {
        if (!active) return;
        setActiveSlide(0);
        setProject(item);
      })
      .catch((requestError) => active && setError(requestError.message));
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (!project || carouselPaused) return undefined;
    const orderedImages = project.type === "app"
      ? [...(project.detailImages || [])]
      : [project.image, ...(project.detailImages || [])];
    const slideCount = orderedImages.filter(Boolean).slice(0, 3).length;
    if (slideCount < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [project, carouselPaused]);

  if (error)
    return <main className={styles.state}><h1>Project unavailable</h1><p>{error}</p><Link to="/portfolio">Back to portfolio</Link></main>;
  if (!project)
    return <main className={styles.state}><p>Loading project...</p></main>;

  const isApp = project.type === "app";
  const images = [project.image, ...(project.detailImages || [])].filter(Boolean).slice(0, 3);
  const carouselImages = (isApp ? [...(project.detailImages || [])] : images).filter(Boolean).slice(0, isApp ? 2 : 3);
  const platforms = project.platforms?.filter(Boolean) || [];
  const technologies = project.technologies?.filter(Boolean) || [];
  const projectLink = isApp ? project.appLink : project.webLink;
  const projectLinkLabel = isApp ? "View app" : "Visit website";
  const workPattern = isApp ? [
    [Smartphone, "Shape the mobile journey", "Map the essential user moments, navigation, permissions, and touch interactions around real mobile behavior."],
    [Layers3, "Build a scalable app system", "Connect interface components, application logic, APIs, notifications, and device services into one dependable product."],
    [ShieldCheck, "Validate across devices", "Test performance, security, accessibility, network conditions, screen sizes, and platform-specific behavior before release."],
    [Sparkles, "Release and keep improving", "Prepare store delivery, monitor real usage, learn from feedback, and evolve the experience through focused updates."],
  ] : [
    [Monitor, "Define the web experience", "Clarify audiences, business goals, content priorities, and the actions each responsive journey must make effortless."],
    [Layers3, "Design the connected system", "Unify responsive interfaces, content, application logic, APIs, and operational workflows in a maintainable architecture."],
    [ShieldCheck, "Prove quality and performance", "Validate accessibility, security, browser support, search readiness, speed, and behavior across every important viewport."],
    [Sparkles, "Launch, measure, and evolve", "Deploy carefully, monitor meaningful signals, learn from real users, and improve the parts that create lasting value."],
  ];

  return (
    <main className={styles.page}>
      <section className={`${styles.hero} ${heroStyles.hero}`}>
        {project.image && <img className={heroStyles.backdrop} src={project.image} alt="" aria-hidden="true" />}
        {project.image && <img className={`${heroStyles.background} ${heroStyles.uncropped}`} src={project.image} alt="" aria-hidden="true" />}
        <div className={heroStyles.shade} />
        <div className="container">
          <Link className={`${styles.back} ${heroStyles.back}`} to="/portfolio"><ArrowLeft size={15} /> Back to portfolio</Link>
          <div className={heroStyles.content}>
            <p className={`${styles.eyebrow} ${heroStyles.type}`}>{isApp ? <Smartphone size={14} /> : <Monitor size={14} />} {isApp ? "Mobile application" : "Web experience"}</p>
            <h1>{project.title}</h1>
          </div>
        </div>
      </section>

      <section className={styles.metaBand}>
        <div className="container">
          <div><small>Project type</small><strong>{isApp ? "Mobile application" : "Web experience"}</strong></div>
          <div><small>Category</small><strong>{project.category || dash}</strong></div>
          <div><small>Platforms</small><strong>{platforms.join(" · ") || dash}</strong></div>
          <div><small>Result</small><strong>{project.metric ? `${project.metric} ${project.metricLabel || ""}` : dash}</strong></div>
        </div>
      </section>

      <section className={`${styles.summarySection} ${styles.webSummarySection}`}>
        <div className={`container ${isApp ? styles.appSummaryLayout : styles.webSummaryLayout}`}>
          <header>
            <span>02 / PROJECT SUMMARY</span>
            <h2>Project Summary</h2>
            <p className={styles.webSummaryText}>{project.excerpt}</p>
            <div className={styles.webSummaryTags}>
              <span>{project.category || (isApp ? "Mobile application" : "Web experience")}</span>
              {platforms.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
            </div>
            {projectLink && <a className={styles.projectLink} href={projectLink} target="_blank" rel="noreferrer">
              {projectLinkLabel} <ArrowUpRight size={16} />
            </a>}

          </header>

          <div
            className={isApp ? styles.appCarousel : styles.webCarousel}
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
          >
            {isApp ? <div className={styles.phoneShowcase}>
              <div className={styles.phoneSpeaker} />
              <div className={styles.phoneScreen}>
                {carouselImages.length ? carouselImages.map((image, index) => <img
                  className={index === activeSlide ? styles.activeCarouselImage : ""}
                  key={`${image}-app-${index}`}
                  src={image}
                  alt={`${project.title} app screen ${index + 1}`}
                />) : <div className={styles.imageFallback}><Smartphone size={48} /><span>App visuals</span></div>}
              </div>
              <div className={styles.phoneHome} />
            </div> : <>
              <div className={styles.desktopMonitor}>
                <div className={styles.monitorTop}>
                  <i /><i /><i />
                  <span>{project.webLink || project.title}</span>
                </div>
                <div className={styles.monitorScreen}>
                  {carouselImages.length ? carouselImages.map((image, index) => <img
                    className={index === activeSlide ? styles.activeCarouselImage : ""}
                    key={`${image}-web-${index}`}
                    src={image}
                    alt={`${project.title} website screen ${index + 1}`}
                  />) : <div className={styles.imageFallback}><Monitor size={52} /><span>Project visuals</span></div>}
                </div>
                <div className={styles.monitorChin}><span>PRIME</span></div>
              </div>
              <div className={styles.monitorStand}><i /></div>
            </>}
            {carouselImages.length > 1 && <div className={styles.carouselControls}>
              <button type="button" onClick={() => setActiveSlide((current) => (current - 1 + carouselImages.length) % carouselImages.length)} aria-label="Previous project image"><ChevronLeft size={16} /></button>
              <div>{carouselImages.map((image, index) => <button type="button" className={index === activeSlide ? styles.activeDot : ""} onClick={() => setActiveSlide(index)} key={`${image}-dot-${index}`} aria-label={`Show image ${index + 1}`} />)}</div>
              <button type="button" onClick={() => setActiveSlide((current) => (current + 1) % carouselImages.length)} aria-label="Next project image"><ChevronRight size={16} /></button>
            </div>}
          </div>
        </div>
      </section>
      <section className={styles.deliverySection}>
        <div className="container">
          <div className={styles.deliveryIntro}><span>03 / DELIVERY</span><h2>What shaped the build.</h2><p>Clear product goals, appropriate platforms, and a focused technology stack working as one system.</p></div>
          <div className={styles.deliveryCards}>
            <article><small>Product focus</small><h3>{project.category}</h3><p>{project.excerpt}</p></article>
            <article><small>Platforms</small><h3>{isApp ? "Mobile-ready" : "Responsive by design"}</h3><div>{platforms.length ? platforms.map((item) => <span key={item}>{item}</span>) : <span>Cross-platform</span>}</div></article>
            <article><small>Technology stack</small><h3>Built to perform</h3><div>{technologies.length ? technologies.map((item) => <span key={item}>{item}</span>) : <span>Custom technology</span>}</div></article>
          </div>
        </div>
      </section>

      <section className={styles.patternSection}>
        <div className="container">
          <header className={styles.patternHeading}>
            <div>
              <span>04 / THE PATTERN BEHIND THE WORK</span>
              <h2>{isApp ? "From mobile idea to a dependable app." : "From complex brief to a dependable web product."}</h2>
            </div>
            <p>{isApp
              ? "A mobile product succeeds when experience, platform behavior, engineering, and continuous learning move together."
              : "A strong web product comes from aligning experience, technology, quality, and measurable business outcomes."}</p>
          </header>
          <div className={styles.patternFlow}>
            {workPattern.map(([Icon, title, copy], index) => <article key={title}>
              <div className={styles.patternTop}>
                <span><Icon size={20} /></span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <div className={styles.patternProgress}><i /></div>
            </article>)}
          </div>
          <div className={styles.patternOutcome}>
            <span>DISCOVER</span><i /><span>DESIGN</span><i /><span>VALIDATE</span><i /><span>EVOLVE</span>
          </div>
        </div>
      </section>
      <section className={styles.cta}>
        <div className="container">
          <p>HAVE A PRODUCT IN MIND?</p>
          <h2>Let’s turn your idea into the next case study.</h2>
          <Link to="/contact">Discuss your project <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}
