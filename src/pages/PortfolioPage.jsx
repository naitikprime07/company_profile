import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./PortfolioPage.module.css";

const projects = [
  {
    number: "01",
    type: "Commerce / Operations",
    title: "A unified commerce system built for confident growth.",
    summary:
      "We replaced disconnected sales and fulfilment workflows with one clear platform for customers, operators, and leadership.",
    services: ["Product strategy", "UX system", "Web engineering"],
    results: [
      ["42%", "faster checkout"],
      ["3.1x", "release velocity"],
    ],
    theme: "cyan",
    visual: "commerce",
  },
  {
    number: "02",
    type: "Healthcare / Mobile",
    title: "Care coordination that keeps people, not paperwork, in focus.",
    summary:
      "A secure mobile experience that gives care teams a shared view of tasks, conversations, and patient progress.",
    services: ["Service design", "Mobile apps", "Cloud platform"],
    results: [
      ["61%", "less admin time"],
      ["4.8/5", "team rating"],
    ],
    theme: "violet",
    visual: "health",
  },
  {
    number: "03",
    type: "Fintech / Data",
    title: "Complex financial signals made useful in seconds.",
    summary:
      "A decision workspace that turns dense operational data into focused insights, alerts, and next actions.",
    services: ["Data experience", "Platform design", "Engineering"],
    results: [
      ["8 hrs", "saved weekly"],
      ["99.9%", "platform uptime"],
    ],
    theme: "blue",
    visual: "finance",
  },
];

const approach = [
  [
    Sparkles,
    "Find the signal",
    "Clarify the business problem and the customer outcome before choosing the solution.",
  ],
  [
    Layers3,
    "Design the system",
    "Connect journeys, interfaces, data, and operations into one maintainable product.",
  ],
  [
    ShieldCheck,
    "Prove the outcome",
    "Launch carefully, measure real use, and improve what creates meaningful value.",
  ],
];

function ProjectVisual({ kind }) {
  return (
    <div className={styles.projectVisual} aria-hidden="true">
      <div className={styles.visualTop}>
        <i />
        <i />
        <i />
        <span>LIVE PRODUCT</span>
      </div>
      <div className={styles.visualBody}>
        <aside>
          <b>PS</b>
          <i />
          <i />
          <i />
        </aside>
        <div className={styles.visualCanvas}>
          <span className={styles.visualLabel}>{kind}</span>
          <div className={styles.visualMetric}>
            <small>PRODUCT SIGNAL</small>
            <strong>94.2</strong>
            <em>+18.4%</em>
          </div>
          <div className={styles.visualChart}>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={styles.visualRows}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  useScrollReveal();

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-reveal>
        <div className="container">
          <p className="eyebrow">
            <span className="status-dot" /> Selected work
          </p>
          <div className={styles.heroGrid}>
            <h1>
              Products that turn complex work
              <span className="text-gradient"> into clear progress.</span>
            </h1>
            <div>
              <p>
                A selection of digital products shaped around real customer
                needs, resilient technology, and outcomes teams can measure.
              </p>
              <Link className={styles.heroLink} to="/contact">
                Start a project <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <div className={styles.proofBar}>
            <span>
              <strong>80+</strong>
              <small>products delivered</small>
            </span>
            <span>
              <strong>9</strong>
              <small>markets reached</small>
            </span>
            <span>
              <strong>12+</strong>
              <small>years of delivery</small>
            </span>
            <span>
              <strong>One team</strong>
              <small>strategy to scale</small>
            </span>
          </div>
        </div>
      </section>

      <section className={styles.work} data-reveal>
        <div className="container">
          <header className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Case-study snapshots</p>
              <h2>Selected transformations.</h2>
            </div>
            <p>
              Representative engagements showing how strategy, design, and
              engineering work together.
            </p>
          </header>
          <div className={styles.projectList}>
            {projects.map((project) => (
              <article
                className={[styles.project, styles[project.theme]].join(" ")}
                key={project.number}
              >
                <div className={styles.projectCopy}>
                  <span className={styles.projectMeta}>
                    {project.number} / {project.type}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul>
                    {project.services.map((service) => (
                      <li key={service}>
                        <CheckCircle2 size={14} /> {service}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.results}>
                    {project.results.map(([value, label]) => (
                      <span key={label}>
                        <strong>{value}</strong>
                        <small>{label}</small>
                      </span>
                    ))}
                  </div>
                </div>
                <ProjectVisual kind={project.visual} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.approach} data-reveal>
        <div className="container">
          <header>
            <p className="eyebrow">The pattern behind the work</p>
            <h2>Different products. One disciplined approach.</h2>
          </header>
          <div className={styles.approachGrid}>
            {approach.map(([Icon, title, copy], index) => (
              <article key={title}>
                <span>
                  <Icon size={19} />
                </span>
                <small>0{index + 1}</small>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} data-reveal>
        <div className="container">
          <span>
            <BarChart3 size={21} />
          </span>
          <p className="eyebrow">Your next case study</p>
          <h2>Have a meaningful problem to solve?</h2>
          <p>
            Let us turn it into a product people understand and your business
            can depend on.
          </p>
          <Link to="/contact">
            Build something useful <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
