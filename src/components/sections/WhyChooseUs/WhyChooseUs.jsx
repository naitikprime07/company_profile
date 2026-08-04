import { BadgeCheck, BrainCircuit, MessagesSquare, Rocket } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const reasons = [
  {
    icon: BadgeCheck,
    code: "ADV / 01",
    title: "Senior ownership",
    text: "Experienced specialists stay close to the work from product decisions through final delivery.",
    proof: "No handoff maze",
    position: "topLeft",
  },
  {
    icon: BrainCircuit,
    code: "ADV / 02",
    title: "Thinking before output",
    text: "We challenge assumptions, validate priorities, and solve the right problem before scaling effort.",
    proof: "Evidence-led choices",
    position: "topRight",
  },
  {
    icon: Rocket,
    code: "ADV / 03",
    title: "Momentum you can see",
    text: "Small, meaningful releases create visible progress and reduce risk throughout the engagement.",
    proof: "Working software early",
    position: "bottomLeft",
  },
  {
    icon: MessagesSquare,
    code: "ADV / 04",
    title: "A genuinely direct team",
    text: "You speak with the people doing the work, receive honest advice, and always know what comes next.",
    proof: "Clear weekly rhythm",
    position: "bottomRight",
  },
];

function WhyChooseUs() {
  return (
    <section
      className={styles.section}
      aria-labelledby="why-choose-title"
      data-reveal
    >
      <div className="container">
        <header className={styles.heading}>
          <div>
            <p className="eyebrow">Why teams choose Prime</p>
            <h2 id="why-choose-title">
              More than a vendor.
              <span> A better way to build.</span>
            </h2>
          </div>
          <p>
            The difference is not a longer capability list. It is how we make
            decisions, take responsibility, and keep your product moving.
          </p>
        </header>

        <div className={styles.system}>
          <div className={styles.connections} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className={styles.core} aria-label="Prime delivery principles">
            <span>PRIME</span>
            <strong>One accountable team</strong>
            <small>STRATEGY · DESIGN · ENGINEERING</small>
            <div aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>

          {reasons.map(({ icon: Icon, code, title, text, proof, position }) => (
            <article
              className={`${styles.reason} ${styles[position]}`}
              key={code}
            >
              <div className={styles.reasonTop}>
                <span>
                  <Icon size={19} aria-hidden="true" />
                </span>
                <small>{code}</small>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>{proof}</strong>
            </article>
          ))}
        </div>

        <div className={styles.commitments} aria-label="Prime commitments">
          <p>
            <strong>01</strong>
            <span>Business goals before feature volume</span>
          </p>
          <p>
            <strong>02</strong>
            <span>Useful communication before ceremony</span>
          </p>
          <p>
            <strong>03</strong>
            <span>Maintainable quality before shortcuts</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
