import {
  ArrowRight,
  Code2,
  Compass,
  Crown,
  Gauge,
  Layers3,
  Megaphone,
  Palette,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/Button";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./AboutPage.module.css";
import { ENVIRONMENT } from "../constants/environment";
import { mailTo } from "../constants/environment";

const PRINCIPLES = [
  {
    icon: Compass,
    number: "01",
    title: "Clarity before velocity",
    copy: "We define the real business problem, the user need, and the measure of success before committing a team to execution.",
  },
  {
    icon: UsersRound,
    number: "02",
    title: "Senior people, close to the work",
    copy: "The people shaping strategy remain involved through design, engineering, launch, and the decisions that follow.",
  },
  {
    icon: Layers3,
    number: "03",
    title: "Systems over isolated screens",
    copy: "We create reusable product foundations that make every new feature faster, more coherent, and easier to maintain.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Quality without ceremony",
    copy: "Accessibility, security, performance, testing, and observability are built into delivery rather than added at the end.",
  },
];

const JOURNEY = [
  {
    year: "2014",
    title: "A focused beginning",
    copy: "Prime Softech began with one belief: businesses deserve technology partners who understand outcomes, not only requirements.",
  },
  {
    year: "2018",
    title: "From builds to products",
    copy: "Our practice expanded across product strategy, experience design, mobile, web, and long term platform ownership.",
  },
  {
    year: "2022",
    title: "One connected studio",
    copy: "We united design and engineering into small senior teams with shared accountability from discovery through delivery.",
  },
  {
    year: "Today",
    title: "Built for meaningful growth",
    copy: "We partner with ambitious organizations to modernize services, launch new ventures, and improve the products people rely on.",
  },
];

const LEADERSHIP = [
  {
    owner: { name: "Owner One", role: "Co-founder & Technology Lead", initials: "O1" },
    department: "Product & Engineering",
    icon: Code2,
    tone: "blue",
    members: [
      { name: "Team Member", role: "Product Manager", initials: "PM" },
      { name: "Team Member", role: "UI/UX Designer", initials: "UX" },
      { name: "Team Member", role: "Lead Engineer", initials: "LE" },
      { name: "Team Member", role: "Software Engineer", initials: "SE" },
    ],
  },
  {
    owner: { name: "Owner Two", role: "Co-founder & Business Lead", initials: "O2" },
    department: "Growth & Operations",
    icon: Megaphone,
    tone: "violet",
    members: [
      { name: "Team Member", role: "Growth Strategist", initials: "GS" },
      { name: "Team Member", role: "Marketing Specialist", initials: "MS" },
      { name: "Team Member", role: "People & Culture", initials: "PC" },
      { name: "Team Member", role: "Client Success", initials: "CS" },
    ],
  },
];

function TeamPortrait({ person, owner = false }) {
  return (
    <span className={owner ? styles.ownerPortrait : styles.memberPortrait}>
      {person.image ? (
        <img src={person.image} alt="" />
      ) : (
        <span aria-hidden="true">{person.initials}</span>
      )}
    </span>
  );
}

function AboutPage() {
  useScrollReveal();

  return (
    <main className={styles.page} id="top">
      <section className={`${styles.hero} container`} data-reveal>
        <div className={styles.heroCopy}>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Inside Prime Softech
          </p>
          <h1>Technology feels different when every decision has a purpose.</h1>
          <p>
            We are a product and technology studio for organizations with
            important problems to solve. Strategy, design, engineering, and
            growth work as one team turning complexity into digital products
            people understand and businesses can depend on.
          </p>
          <div className="hero-actions">
            <Button href={mailTo()}>Start a conversation</Button>
            <a className="text-link" href="#our-story">
              Discover our story <ArrowRight size={17} />
            </a>
          </div>
          <div className={styles.heroFacts}>
            <span>
              <strong>12+</strong>
              <small>years creating</small>
            </span>
            <span>
              <strong>80+</strong>
              <small>products delivered</small>
            </span>
            <span>
              <strong>9</strong>
              <small>countries reached</small>
            </span>
          </div>
        </div>
        <div
          className={styles.studioSystem}
          aria-label="Prime Softech multidisciplinary studio system"
        >
          <div className={styles.systemTop}>
            <span>
              <i /> STUDIO SYSTEM
            </span>
            <b>CONNECTED</b>
          </div>
          <div className={styles.systemOrbit}>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={styles.systemCore}>
            <span>PS</span>
            <small>ONE TEAM</small>
          </div>
          <span className={`${styles.discipline} ${styles.strategy}`}>
            STRATEGY
          </span>
          <span className={`${styles.discipline} ${styles.design}`}>
            DESIGN
          </span>
          <span className={`${styles.discipline} ${styles.engineering}`}>
            ENGINEERING
          </span>
          <span className={`${styles.discipline} ${styles.growth}`}>
            GROWTH
          </span>
          <div className={styles.systemSignal}>
            <span>Product signal</span>
            <b>94.2</b>
            <i />
          </div>
        </div>
      </section>

      <section className={styles.manifesto} data-reveal>
        <div className="container">
          <span className={styles.manifestoIndex}>01 / BELIEF</span>
          <p>
            We do not measure our contribution by the amount of software
            produced. We measure it by the <em>clarity created</em>, the{" "}
            <em>friction removed</em>, and the <em>progress unlocked</em>.
          </p>
        </div>
      </section>

      <section
        className={styles.motionRibbon}
        aria-label="From ideas to measurable impact"
        data-reveal
      >
        <div className={styles.ribbonMotion} aria-hidden="true">
          <DotLottieReact
            className={styles.ribbonLottie}
            src={ENVIRONMENT.animations.about}
            loop
            autoplay
          />
        </div>
        <div className={styles.ribbonWords} aria-hidden="true">
          <span>
            <small>01</small>IDEAS
          </span>
          <i>→</i>
          <span>
            <small>02</small>SYSTEMS
          </span>
          <i>→</i>
          <span>
            <small>03</small>IMPACT
          </span>
        </div>
        <div className={styles.ribbonCaption}>
          <span>Prime Softech / transformation in motion</span>
          <b>KEEP SCROLLING ↓</b>
        </div>
      </section>

      <section
        className={`${styles.story} container`}
        id="our-story"
        data-reveal
      >
        <header className={styles.sectionHeading}>
          <div>
            <p className="eyebrow">Our journey</p>
            <h2>
              Built deliberately,
              <br />
              one chapter at a time.
            </h2>
          </div>
          <p>
            Our capabilities have grown, but our way of working remains
            personal: understand deeply, make intentional choices, and take
            responsibility for the result.
          </p>
        </header>
        <ol className={styles.timeline}>
          {JOURNEY.map(({ year, title, copy }) => (
            <li key={year}>
              <span>{year}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.principles} data-reveal>
        <div className="container">
          <header className={styles.principleHeading}>
            <p className="eyebrow">How we think</p>
            <h2>
              Principles that remain true when the project gets difficult.
            </h2>
          </header>
          <div className={styles.principleGrid}>
            {PRINCIPLES.map(({ icon: Icon, number, title, copy }) => (
              <article key={title}>
                <div>
                  <span>
                    <Icon size={20} />
                  </span>
                  <small>{number}</small>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.operating} container`} data-reveal>
        <div className={styles.operatingVisual}>
          <span className={styles.operatingRing}>
            <i />
            <i />
            <i />
          </span>
          <div>
            <Sparkles size={22} />
            <strong>Useful progress</strong>
            <small>Our shared destination</small>
          </div>
        </div>
        <div className={styles.operatingCopy}>
          <p className="eyebrow">How we operate</p>
          <h2>
            Small teams.
            <br />
            Wide perspective.
            <br />
            <span>Shared ownership.</span>
          </h2>
          <p>
            Each engagement brings together the exact disciplines the problem
            requires. You work directly with decision makers, see progress
            continuously, and always understand what is being built, why it
            matters, and what comes next.
          </p>
          <ul>
            <li>
              <Gauge size={18} />
              <span>
                <strong>Momentum with control</strong>Short feedback loops keep
                decisions fast and visible.
              </span>
            </li>
            <li>
              <UsersRound size={18} />
              <span>
                <strong>Collaboration without layers</strong>Direct access
                replaces account management overhead.
              </span>
            </li>
            <li>
              <ShieldCheck size={18} />
              <span>
                <strong>Ownership beyond launch</strong>We stay accountable for
                performance in the real world.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.orgSection} data-reveal aria-labelledby="org-title">
        <div className="container">
          <header className={styles.orgHeading}>
            <div>
              <p className="eyebrow">The people behind the work</p>
              <h2 id="org-title">Two leaders. Two disciplines. One connected team.</h2>
            </div>
            <p>
              Clear ownership keeps decisions close to the people doing the work,
              while both departments stay connected around every client outcome.
            </p>
          </header>

          <div className={styles.orgChart}>
            <div className={styles.companyNode}>
              <span><Palette size={19} /></span>
              <div><small>PRIME SOFTECH</small><strong>Leadership network</strong></div>
              <i>CONNECTED</i>
            </div>
            <div className={styles.leadershipLine} aria-hidden="true"><span /></div>

            <div className={styles.ownerBranches}>
              {LEADERSHIP.map(({ owner, department, icon: Icon, tone, members }) => (
                <article className={`${styles.ownerBranch} ${styles[tone]}`} key={department}>
                  <div className={styles.ownerCard}>
                    <span className={styles.ownerCrown}><Crown size={15} /></span>
                    <TeamPortrait person={owner} owner />
                    <div>
                      <small>OWNER / DIRECTOR</small>
                      <h3>{owner.name}</h3>
                      <p>{owner.role}</p>
                    </div>
                  </div>

                  <div className={styles.branchStem} aria-hidden="true"><i /></div>
                  <div className={styles.departmentNode}>
                    <span><Icon size={18} /></span>
                    <div><small>DEPARTMENT</small><strong>{department}</strong></div>
                    <b>{String(members.length).padStart(2, "0")}</b>
                  </div>
                  <div className={styles.teamConnector} aria-hidden="true" />

                  <div className={styles.memberGrid}>
                    {members.map((member) => (
                      <div className={styles.memberCard} key={`${department}-${member.role}`}>
                        <TeamPortrait person={member} />
                        <div><strong>{member.name}</strong><small>{member.role}</small></div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <p className={styles.orgNote}>
            <span /> Shared strategy &nbsp;·&nbsp; Independent department ownership
          </p>
        </div>
      </section>

      <section className={styles.closing} data-reveal>
        <div className="container">
          <p className="eyebrow">The next chapter</p>
          <h2>Bring us the challenge that matters.</h2>
          <p>
            We will bring the clarity, craft, and engineering discipline to move
            it forward.
          </p>
          <Button href={mailTo()}>Build something meaningful</Button>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
