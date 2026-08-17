import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Code2, Crown, Megaphone, Palette, X } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/Button";
import { LEADERSHIP } from "../data/leadership";
import { getLeadershipTeams } from "../services/leadershipService";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./AboutPage.module.css";
import { ENVIRONMENT } from "../constants/environment";
import { mailTo } from "../constants/environment";

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

const SHOW_MOTION_RIBBON = false;

function TeamPortrait({ person, owner = false }) {
  const initials = person.name
    ?.split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <span className={owner ? styles.ownerPortrait : styles.memberPortrait}>
      {person.image ? (
        <img src={person.image} alt="" />
      ) : (
        <span aria-hidden="true">{initials || "?"}</span>
      )}
    </span>
  );
}

function HierarchyNodes({ members, root = false }) {
  const levelRef = useRef(null);
  const [flow, setFlow] = useState({ width: 0, height: 0, paths: [] });

  useLayoutEffect(() => {
    const level = levelRef.current;
    if (!level) return undefined;

    const measure = () => {
      const levelBox = level.getBoundingClientRect();
      const branches = Array.from(level.children).filter((element) =>
        element.classList.contains(styles.hierarchyBranch),
      );
      const paths = branches
        .map((branch) => {
          const card = Array.from(branch.children).find((element) =>
            element.classList.contains(styles.hierarchyPerson),
          );
          const cardBox = card?.getBoundingClientRect();
          return cardBox
            ? {
                x: cardBox.left - levelBox.left + cardBox.width / 2,
                y: cardBox.top - levelBox.top,
              }
            : null;
        })
        .filter(Boolean);
      setFlow({ width: levelBox.width, height: levelBox.height, paths });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(level);
    Array.from(level.children).forEach((child) => observer.observe(child));
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [members]);

  const center = flow.width / 2;
  const junction = 18;
  const start = root ? 0 : -36;

  return (
    <div className={styles.hierarchyLevel} ref={levelRef}>
      {flow.paths.length > 0 && (
        <svg
          className={styles.hierarchyFlow}
          viewBox={`0 0 ${flow.width} ${flow.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hierarchy-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#315b78" />
              <stop offset="0.55" stopColor="#5bd5ff" />
              <stop offset="1" stopColor="#775cff" />
            </linearGradient>
          </defs>
          {flow.paths.map((point, index) => {
            const route = `M ${center} ${start} V ${junction} H ${point.x} V ${point.y}`;
            return (
              <g key={`${point.x}-${index}`}>
                <path className={styles.flowBase} d={route} />
                <path
                  className={styles.flowEnergy}
                  d={route}
                  style={{ animationDelay: `${index * 0.14}s` }}
                />
                <circle className={styles.flowPulse} r="3">
                  <animateMotion
                    path={route}
                    dur={`${2.3 + index * 0.16}s`}
                    begin={`${index * 0.18}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  className={styles.flowEndpoint}
                  cx={point.x}
                  cy={point.y}
                  r="3"
                />
              </g>
            );
          })}
          <circle
            className={styles.flowJunction}
            cx={center}
            cy={junction}
            r="3"
          />
        </svg>
      )}
      {members.map((member, index) => (
        <div
          className={styles.hierarchyBranch}
          key={member._id || `${member.role}-${index}`}
        >
          <div className={styles.hierarchyPerson}>
            <TeamPortrait person={member} />
            <span>
              <strong>{member.name}</strong>
              <small>{member.role}</small>
              {member.bio && <em>{member.bio}</em>}
            </span>
          </div>
          {(member.children || []).length > 0 && (
            <HierarchyNodes members={member.children} />
          )}
        </div>
      ))}
    </div>
  );
}

function AboutPage() {
  useScrollReveal();
  const [leadership, setLeadership] = useState(LEADERSHIP);
  const [activeTeam, setActiveTeam] = useState(null);

  useEffect(() => {
    let active = true;
    getLeadershipTeams()
      .then((items) => {
        if (!active || !items?.length) return;
        setLeadership(
          items.map((item) => ({
            ...item,
            icon: item.slug === "business" ? Megaphone : Code2,
          })),
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!activeTeam) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveTeam(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeTeam]);

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

      {SHOW_MOTION_RIBBON && (
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
      )}

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

      <section
        className={styles.orgSection}
        data-reveal
        aria-labelledby="org-title"
      >
        <div className="container">
          <header className={styles.orgHeading}>
            <h2 id="org-title">
              Meet the People
              <br />
              Behind the Vision
            </h2>
            <p>
              Our team is a collective of dedicated leaders, strategists, and
              makers committed to building thoughtful digital experiences and
              making every product better through clarity and craft.
            </p>
          </header>

          <div className={styles.orgChart}>
            <div className={styles.companyNode}>
              <span>
                <Palette size={19} />
              </span>
              <div>
                <small>PRIME SOFTECH</small>
                <strong>Leadership network</strong>
              </div>
              <i>CONNECTED</i>
            </div>
            <div className={styles.leadershipLine} aria-hidden="true">
              <span />
            </div>

            <div className={styles.ownerBranches}>
              {leadership.map(
                ({ owner, department, icon: Icon, tone, members, summary }) => (
                  <article
                    className={[
                      styles.ownerBranch,
                      styles[tone],
                      activeTeam === department ? styles.teamOpen : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={department}
                  >
                    <div
                      className={styles.ownerCard}
                      role="button"
                      tabIndex="0"
                      aria-expanded={activeTeam === department}
                      onClick={() => setActiveTeam(department)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setActiveTeam(department);
                        }
                      }}
                    >
                      <span className={styles.ownerCrown}>
                        <Crown size={15} />
                      </span>
                      <TeamPortrait person={owner} owner />
                      <div>
                        <small>OWNER / DIRECTOR</small>
                        <h3>{owner.name}</h3>
                        <p>{owner.role}</p>
                      </div>
                      <span className={styles.ownerStatement}>
                        {owner.statement || owner.bio}
                      </span>
                      <span className={styles.ownerDepartment}>
                        <Icon size={17} /> {department}
                      </span>
                      <span className={styles.ownerSummary}>{summary}</span>
                      <span className={styles.ownerAction}>
                        Click to view team <ArrowRight size={17} />
                      </span>
                      <span className={styles.ownerCount}>
                        {String(members.length).padStart(2, "0")} people
                      </span>
                    </div>
                    <div
                      className={styles.teamHoverPanel}
                      aria-hidden={activeTeam !== department}
                      aria-label={`${department} team hierarchy`}
                    >
                      <button
                        className={styles.teamClose}
                        type="button"
                        aria-label="Close team hierarchy"
                        onClick={() => setActiveTeam(null)}
                      >
                        <X size={19} />
                      </button>
                      <div className={styles.chartTitle}>
                        <Icon size={15} /> {department}
                      </div>
                      <div className={styles.chartOwner}>
                        <TeamPortrait person={owner} />
                        <span>
                          <small>OWNER / DIRECTOR</small>
                          <strong>{owner.name}</strong>
                          <em>{owner.role}</em>
                        </span>
                      </div>
                      <div className={styles.chartConnector} aria-hidden="true">
                        <i />
                      </div>
                      <HierarchyNodes members={members} root />
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
          <p className={styles.orgNote}>
            <span /> Shared strategy &nbsp;·&nbsp; Independent department
            ownership
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
