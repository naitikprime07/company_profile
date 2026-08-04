import {
  ArrowRight,
  CheckCircle2,
  CodeXml,
  Compass,
  Gauge,
  Layers3,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./DeliveryStandard.module.css";

const phases = [
  {
    number: "01",
    icon: Compass,
    title: "Align before we build",
    description:
      "We turn business goals, user needs, and technical constraints into one practical product direction.",
    outputs: ["Discovery brief", "Delivery roadmap", "Success measures"],
  },
  {
    number: "02",
    icon: Layers3,
    title: "Design and engineer together",
    description:
      "Product design and engineering move as one team, reducing handoff delays and expensive rework.",
    outputs: ["Validated experience", "Production-ready build", "Quality assurance"],
  },
  {
    number: "03",
    icon: Gauge,
    title: "Launch, learn, and improve",
    description:
      "We release with confidence, measure real usage, and keep improving what creates the most value.",
    outputs: ["Release support", "Performance insight", "Growth backlog"],
  },
];

const assurances = [
  {
    icon: MessagesSquare,
    title: "Visible progress",
    text: "Clear ownership, direct communication, and useful updates throughout delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Quality by design",
    text: "Security, accessibility, performance, and maintainability are built into the work.",
  },
  {
    icon: CodeXml,
    title: "Built to remain yours",
    text: "Clean documentation and transferable systems—without hidden platform dependency.",
  },
];

function DeliveryStandard() {
  return (
    <section className={styles.section} aria-labelledby="delivery-title" data-reveal>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="eyebrow">The Prime delivery standard</p>
          <h2 id="delivery-title">
            Serious delivery,
            <span> without the black box.</span>
          </h2>
          <p className={styles.lede}>
            You always know what is being built, why it matters, and what comes
            next. Our senior team combines product judgment with dependable
            engineering from first conversation to measurable growth.
          </p>

          <div className={styles.signal} aria-hidden="true">
            <span>CLARITY</span>
            <i />
            <span>CRAFT</span>
            <i />
            <span>MOMENTUM</span>
          </div>

          <div className={styles.actions}>
            <Link className={styles.primaryAction} to="/contact">
              Plan your project <ArrowRight size={17} />
            </Link>
            <Link className={styles.secondaryAction} to="/about">
              Meet Prime Softech
            </Link>
          </div>
        </div>

        <div className={styles.phases}>
          <div className={styles.rail} aria-hidden="true">
            <span />
          </div>
          {phases.map(({ number, icon: Icon, title, description, outputs }) => (
            <article className={styles.phase} key={number}>
              <div className={styles.phaseIndex}>
                <span>{number}</span>
                <Icon size={19} aria-hidden="true" />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {outputs.map((output) => (
                    <li key={output}>
                      <CheckCircle2 size={14} aria-hidden="true" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.assurances}>
          {assurances.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={20} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DeliveryStandard;
