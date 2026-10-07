import { ArrowRight, Check, Cloud, LayoutDashboard } from "lucide-react";
import Button from "../components/Button";
import BrandHeroHeading from "../components/common/BrandHeroHeading";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./TechStackPage.module.css";

const TECH_GROUPS = {
  infra: {
    icon: Cloud,
    accent: "#5bd5ff",
    kicker: "Infra & DevOps",
    eyebrow: "Ship reliably, operate calmly",
    title: "Cloud, automation, and delivery pipelines built for dependable products.",
    copy: "We treat infrastructure as part of the product — provisioning cloud platforms, automating delivery, and adding the monitoring and guardrails that keep releases boring and recovery fast.",
    intro: "Everything we build ships through repeatable, observable pipelines.",
    services: [
      "Cloud architecture",
      "CI / CD automation",
      "Monitoring & alerting",
      "Infrastructure as code",
    ],
    technologies: [
      {
        name: "AWS",
        focus: "Cloud platform",
        description:
          "Compute, storage, networking, and managed services composed into secure, cost-aware architectures that scale with demand.",
        points: ["EC2 / ECS / Lambda", "S3 & RDS", "IAM & VPC design"],
      },
      {
        name: "Google Cloud",
        focus: "Cloud platform",
        description:
          "Data-driven workloads, Kubernetes, and serverless services that pair well with analytics and AI-heavy products.",
        points: ["GKE", "BigQuery", "Cloud Run"],
      },
      {
        name: "Azure",
        focus: "Cloud platform",
        description:
          "Enterprise-friendly compute, identity, and integration services for teams already invested in the Microsoft ecosystem.",
        points: ["App Service", "Azure AD", "DevOps pipelines"],
      },
      {
        name: "Gradle",
        focus: "Build automation",
        description:
          "Reproducible, cache-aware build and dependency pipelines for Android, Java, and multi-module projects.",
        points: ["Incremental builds", "Dependency management", "CI integration"],
      },
      {
        name: "Jenkins",
        focus: "CI / CD",
        description:
          "Configurable delivery pipelines with automated testing, signing, and deployment across environments.",
        points: ["Pipeline as code", "Automated tests", "Release gating"],
      },
      {
        name: "Selenium",
        focus: "Test automation",
        description:
          "End-to-end browser automation that catches regressions before users do and keeps releases confident.",
        points: ["Cross-browser suites", "Parallel runs", "Reporting"],
      },
    ],
  },
  cms: {
    icon: LayoutDashboard,
    accent: "#8c79ff",
    kicker: "CMS",
    eyebrow: "Content systems teams enjoy using",
    title: "Flexible content platforms that editors trust and scale with.",
    copy: "We build and extend CMS solutions around how your teams actually publish — modelling content cleanly, shaping the editor experience, and integrating with the rest of your product.",
    intro: "From storefronts to editorial platforms, we match the CMS to the workflow.",
    services: [
      "Theme & plugin development",
      "Content modelling",
      "Headless integrations",
      "Migration & upgrades",
    ],
    technologies: [
      {
        name: "Magento",
        focus: "Commerce",
        description:
          "Enterprise-grade commerce with deep catalogue, checkout, and integration capability for complex retail operations.",
        points: ["Custom modules", "Checkout tuning", "ERP integration"],
      },
      {
        name: "WordPress",
        focus: "Publishing",
        description:
          "The world's most-used CMS, extended with bespoke themes, plugins, and performance hardening for content-led sites.",
        points: ["Custom themes", "Gutenberg blocks", "Security & caching"],
      },
      {
        name: "Shopify",
        focus: "Commerce",
        description:
          "Fast-to-launch storefronts with custom themes, apps, and headless options that grow with your merchant needs.",
        points: ["Liquid themes", "Shopify apps", "Headless storefronts"],
      },
      {
        name: "Umbraco",
        focus: "Enterprise CMS",
        description:
          "A flexible .NET CMS that gives editors structured, multilingual control without rigid templates.",
        points: ["Document types", "Multilingual", "Custom dashboards"],
      },
      {
        name: "Drupal",
        focus: "Structured content",
        description:
          "Robust, permission-aware publishing for large organisations with complex content workflows.",
        points: ["Content types", "Roles & workflow", "Migration tooling"],
      },
      {
        name: "Joomla",
        focus: "Flexible CMS",
        description:
          "Balanced flexibility for community and portal sites that need custom content structures out of the box.",
        points: ["Custom components", "Access control", "Templating"],
      },
    ],
  },
};

function TechStackPage({ group }) {
  useScrollReveal();
  const data = TECH_GROUPS[group];
  const Icon = data.icon;

  return (
    <main
      className={styles.page}
      style={{ "--tech-accent": data.accent }}
      id="top"
    >
      <div className={styles.background} aria-hidden="true">
        <span className={styles.glow} />
      </div>

      <section className={`container ${styles.hero}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> {data.eyebrow}
          </p>
          <BrandHeroHeading text={data.title} />
          <p className={styles.lead}>{data.copy}</p>
          <div className="hero-actions">
            <Button href="/contact">Discuss your stack</Button>
            <a className="text-link" href="#technologies">
              Explore technologies <ArrowRight size={17} />
            </a>
          </div>
          <ul className={styles.services}>
            {data.services.map((service) => (
              <li key={service}>
                <Check size={15} /> {service}
              </li>
            ))}
          </ul>
        </div>

        <aside
          className={styles.panel}
          data-reveal
          aria-label={`${data.kicker} capabilities overview`}
        >
          <div className={styles.panelTop}>
            <span>
              <Icon size={17} /> {data.kicker.toUpperCase()}
            </span>
            <b>
              {data.technologies.length} TOOLS
            </b>
          </div>
          <p className={styles.panelIntro}>{data.intro}</p>
          <ul className={styles.panelList}>
            {data.technologies.map((tech, index) => (
              <li key={tech.name}>
                <span className={styles.panelIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong>{tech.name}</strong>
                  <small>{tech.focus}</small>
                </div>
                <i className={styles.statusDot} />
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={`container ${styles.grid}`} id="technologies">
        <header className={styles.gridHeading} data-reveal>
          <p className="eyebrow">The toolkit</p>
          <h2>
            {data.kicker} expertise, end to end.
          </h2>
        </header>
        <div className={styles.cards}>
          {data.technologies.map((tech, index) => (
            <article
              key={tech.name}
              className={styles.card}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <small>{tech.focus}</small>
              </div>
              <h3>{tech.name}</h3>
              <p>{tech.description}</p>
              <ul>
                {tech.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={`container ${styles.cta}`} data-reveal>
        <div>
          <p className="eyebrow">Not sure which fits?</p>
          <h2>Tell us the outcome — we will recommend the platform.</h2>
        </div>
        <Button href="/contact">Start a conversation</Button>
      </section>
    </main>
  );
}

export default TechStackPage;
