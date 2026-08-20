import {
  ArrowRight,
  Check,
  Cloud,
  Code2,
  Monitor,
  Smartphone,
  UsersRound,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./ServicesPage.module.css";

const groups = [
  {
    id: "mobile-apps",
    number: "01",
    icon: Smartphone,
    title: "Mobile apps",
    statement: "Useful mobile products built for real-world performance.",
    description:
      "From early validation to store ready delivery, we design and engineer mobile experiences that feel fast, dependable, and native to their platform.",
    services: [
      "Native iOS apps",
      "Native Android apps",
      "Cross-platform apps",
      "Agentic AI",
      "AI & automation",
      "Custom software",
      "MVP development",
      "SaaS products",
    ],
    outcome: "Validated product → production launch",
  },
  {
    id: "web-development",
    number: "02",
    icon: Code2,
    title: "Web development",
    statement: "Web platforms engineered to become business infrastructure.",
    description:
      "We create responsive, accessible, and maintainable web products from focused customer experiences to complex operational systems.",
    services: [
      "Enterprise solutions",
      "Ecommerce",
      "CMS platforms",
      "Custom development",
    ],
    outcome: "Clear architecture → scalable platform",
  },
  {
    id: "design",
    number: "03",
    icon: Monitor,
    title: "Product design",
    statement: "Clarity before polish and polish with a purpose.",
    description:
      "Research, product thinking, and interface craft come together to remove friction and make complex ideas easy to understand and use.",
    services: [
      "Discovery workshop",
      "Product analysis",
      "Wireframes",
      "SEO audit",
      "UI / UX design",
    ],
    outcome: "Product direction → validated experience",
  },
  {
    id: "staff-augmentation",
    number: "04",
    icon: UsersRound,
    title: "Staff augmentation",
    statement: "Senior capability that works as part of your team.",
    description:
      "Add focused specialists or a complete delivery unit without creating another management layer. We adapt to your tools, rhythm, and ownership model.",
    services: [
      "Offshore & nearshore",
      "Dedicated teams",
      "Hourly support",
      "Contract roles",
      ".NET specialists",
    ],
    outcome: "Capability gap → embedded expertise",
  },
  {
    id: "devops",
    number: "05",
    icon: Cloud,
    title: "Cloud & DevOps",
    statement:
      "Delivery infrastructure designed for calm, repeatable releases.",
    description:
      "We improve deployment speed, reliability, visibility, and operational confidence across modern cloud environments and delivery pipelines.",
    services: [
      "Cloud setup",
      "Automation",
      "Continuous delivery",
      "Monitoring",
    ],
    outcome: "Manual operations → reliable delivery system",
  },
];

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function ServicesPage() {
  useScrollReveal();

  useEffect(() => {
    if (!window.location.hash) return;
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <main className={styles.page} id="top">
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`} data-reveal>
          <p className="eyebrow">Prime Softech services</p>
          <h1>
            From difficult idea
            <span className="text-gradient"> to dependable digital product.</span>
          </h1>
          <p>
            Strategy, design, engineering, and delivery expertise assembled
            around the outcome your business actually needs.
          </p>
          <nav className={styles.jumpNav} aria-label="Service categories">
            {groups.map((group) => (
              <a href={`#${group.id}`} key={group.id}>
                {group.number} {group.title}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.heroSignal} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </section>

      <section className={styles.catalog} aria-label="Service catalog">
        <div className="container">
          {groups.map(
            ({
              id,
              number,
              icon: Icon,
              title,
              statement,
              description,
              services,
              outcome,
            }) => (
              <article className={styles.group} id={id} key={id} data-reveal>
                <div className={styles.groupIdentity}>
                  <span>{number}</span>
                  <Icon size={25} aria-hidden="true" />
                </div>
                <div className={styles.groupCopy}>
                  <p className={styles.groupLabel}>{title}</p>
                  <h2>{statement}</h2>
                  <p>{description}</p>
                  <small>{outcome}</small>
                </div>
                <div className={styles.serviceList}>
                  {services.map((service) => (
                    <div id={slug(service)} key={service}>
                      <Check size={15} aria-hidden="true" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      <section className={styles.cta} data-reveal>
        <div className="container">
          <div>
            <p className="eyebrow">Have a specific challenge?</p>
            <h2>Bring us the problem, not a perfect brief.</h2>
          </div>
          <Link to="/contact">
            Talk with our team <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
