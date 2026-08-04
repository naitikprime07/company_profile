import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Sparkles,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ENVIRONMENT } from "../constants/environment";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./CareerPage.module.css";

const composeApplicationUrl = (path) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ENVIRONMENT.careersEmail)}&su=${encodeURIComponent(`${path} application — Prime Softech`)}`;

const CAREER_PATHS = [
  {
    type: "opportunity",
    icon: BriefcaseBusiness,
    number: "01",
    eyebrow: "For experienced professionals",
    title: "Opportunity",
    copy: "Join a senior, multidisciplinary team where your judgment matters and your work reaches real users.",
    roles: [
      "Frontend & mobile engineering",
      "Backend & cloud engineering",
      "Product and UX design",
      "Growth and digital strategy",
    ],
    highlights: [
      "Own meaningful outcomes",
      "Work directly with decision-makers",
      "Shape systems, not just tickets",
    ],
    action: "Explore opportunities",
  },
  {
    type: "internship",
    icon: GraduationCap,
    number: "02",
    eyebrow: "For emerging talent",
    title: "Internship",
    copy: "Build practical confidence through guided work, direct feedback, and exposure to complete product delivery.",
    roles: [
      "Engineering internship",
      "UX / UI design internship",
      "Quality assurance internship",
      "Digital marketing internship",
    ],
    highlights: [
      "Learn with a dedicated mentor",
      "Contribute to real product work",
      "Create a portfolio with substance",
    ],
    action: "Apply for an internship",
  },
];

function CareerPage() {
  useScrollReveal();

  return (
    <main className={styles.page} id="top">
      <div className={styles.background} aria-hidden="true">
        <span />
        <span />
        <span />
        <div className={styles.growthPath}>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className={styles.skillConstellation}>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className={styles.codeSignals}>
          <span>LEARN / 01</span>
          <span>CREATE / 02</span>
          <span>GROW / 03</span>
          <span>LEAD / 04</span>
        </div>
      </div>
      <section className={`${styles.hero} container`} data-reveal>
        <div>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Build your next chapter
          </p>
          <h1>
            Do work that makes you <span>more capable.</span>
          </h1>
          <p>
            Prime Softech is a place for curious people who care about quality,
            take ownership, and want to understand the complete problem—not only
            their assigned part.
          </p>
          <a href="#career-paths">
            Find your path <ArrowUpRight size={18} />
          </a>
        </div>
        <div
          className={styles.heroSystem}
          aria-label="Prime Softech team growth system"
        >
          <div className={styles.systemTop}>
            <span>
              <i /> PEOPLE SYSTEM
            </span>
            <b>GROWING</b>
          </div>
          <div className={styles.lottieGlow} aria-hidden="true" />
          <DotLottieReact
            className={styles.careerLottie}
            src={ENVIRONMENT.animations.career}
            loop
            autoplay
            aria-label="Career growth animation"
          />
          <span className={`${styles.signal} ${styles.signalOne}`}>LEARN</span>
          <span className={`${styles.signal} ${styles.signalTwo}`}>BUILD</span>
          <span className={`${styles.signal} ${styles.signalThree}`}>LEAD</span>
          <div className={styles.systemBottom}>
            <span>Potential in motion</span>
            <strong>∞</strong>
          </div>
        </div>
      </section>

      <section className={styles.paths} id="career-paths" data-reveal>
        <div className="container">
          <header className={styles.heading}>
            <div>
              <p className="eyebrow">Choose your path</p>
              <h2>Two ways to grow with us.</h2>
            </div>
            <p>
              Whether you bring years of experience or are beginning your
              career, we offer a clear path into meaningful product work.
            </p>
          </header>
          <div className={styles.pathGrid}>
            {CAREER_PATHS.map(
              ({
                type,
                icon: Icon,
                number,
                eyebrow,
                title,
                copy,
                roles,
                highlights,
                action,
              }) => (
                <article
                  className={`${styles.pathCard} ${styles[type]}`}
                  key={type}
                >
                  <div className={styles.cardTop}>
                    <span>
                      <Icon size={25} />
                    </span>
                    <small>{number}</small>
                  </div>
                  <p className={styles.cardEyebrow}>{eyebrow}</p>
                  <h3>{title}</h3>
                  <p className={styles.cardCopy}>{copy}</p>
                  <div className={styles.cardBody}>
                    <div>
                      <h4>Areas we welcome</h4>
                      <ul>
                        {roles.map((role) => (
                          <li key={role}>
                            <Code2 size={14} />
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>What you can expect</h4>
                      <ul>
                        {highlights.map((highlight) => (
                          <li key={highlight}>
                            <Sparkles size={14} />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a
                    href={composeApplicationUrl(title)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{action}</span>
                    <ArrowUpRight size={18} />
                  </a>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        className={styles.growthRunway}
        aria-labelledby="growth-runway-title"
        data-reveal
      >
        <div className={styles.runwayTop}>
          <span>PEOPLE / PROGRESS SYSTEM</span>
          <b>04 STAGES</b>
        </div>
        <div className={styles.runwayIntro}>
          <p className="eyebrow">Your growth is not accidental</p>
          <h2 id="growth-runway-title">
            A career should keep
            <br />
            <span>opening new doors.</span>
          </h2>
        </div>
        <ol className={styles.runwaySteps}>
          <li>
            <small>01</small>
            <strong>Stay curious</strong>
            <span>Ask, explore, understand</span>
            <i />
          </li>
          <li>
            <small>02</small>
            <strong>Make it real</strong>
            <span>Contribute, test, improve</span>
            <i />
          </li>
          <li>
            <small>03</small>
            <strong>Master the craft</strong>
            <span>Own quality and outcomes</span>
            <i />
          </li>
          <li>
            <small>04</small>
            <strong>Lift the team</strong>
            <span>Guide, share, lead</span>
            <i />
          </li>
        </ol>
        <div className={styles.runwaySignal} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <i />
        </div>
      </section>

      <section className={`${styles.culture} container`} data-reveal>
        <header>
          <p className="eyebrow">Life at Prime Softech</p>
          <h2>The environment behind our best work.</h2>
        </header>
        <div className={styles.cultureGrid}>
          <article>
            <Lightbulb size={22} />
            <h3>Curiosity is useful</h3>
            <p>
              Ask better questions, explore alternatives, and improve the
              thinking—not only the output.
            </p>
          </article>
          <article>
            <HeartHandshake size={22} />
            <h3>Respect is operational</h3>
            <p>
              Clear communication, reliable commitments, and thoughtful feedback
              make strong teams possible.
            </p>
          </article>
          <article>
            <Rocket size={22} />
            <h3>Progress is shared</h3>
            <p>
              We celebrate learning, delivery, and the people who help others
              become more capable.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.closing} data-reveal>
        <div className="container">
          <p className="eyebrow">Do not see your exact role?</p>
          <h2>Exceptional people rarely fit neatly into a list.</h2>
          <p>
            Tell us what you are great at, what you want to learn, and the kind
            of impact you want to make.
          </p>
          <a
            href={composeApplicationUrl("Open")}
            target="_blank"
            rel="noreferrer"
          >
            Introduce yourself <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default CareerPage;
