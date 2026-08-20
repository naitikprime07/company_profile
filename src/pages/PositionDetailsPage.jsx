import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  GraduationCap,
  Heart,
  MapPin,
  Send,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getOneOpenings } from "../services/openingService";
import BrandHeroHeading from "../components/common/BrandHeroHeading";
import styles from "./PositionDetailsPage.module.css";

const cachedOpeningDetails = new Map();
const pendingOpeningDetails = new Map();

const PROCESS = [
  [
    "01",
    "Application review",
    "We review your experience and the context you share.",
  ],
  [
    "02",
    "Introductory conversation",
    "A focused conversation about your goals and mutual fit.",
  ],
  [
    "03",
    "Skills discussion",
    "A practical discussion with the people you may work alongside.",
  ],
  [
    "04",
    "Final decision",
    "Clear feedback and next steps without unnecessary delays.",
  ],
];
const BENEFITS = [
  [
    TrendingUp,
    "Growth with direction",
    "Meaningful projects, focused mentorship, and exposure to modern product practices.",
  ],
  [
    UsersRound,
    "A supportive team",
    "Open communication and a culture where thoughtful contributions are valued.",
  ],
  [
    Code2,
    "Craft development",
    "Practical challenges and shared knowledge that strengthen your capabilities.",
  ],
  [
    Target,
    "Progress through impact",
    "A career path shaped by ownership, consistency, and demonstrated growth.",
  ],
  [
    Heart,
    "Sustainable pace",
    "Ambitious work in an environment that respects focus, flexibility, and wellbeing.",
  ],
];

function PositionDetailsPage() {
  const { openingId } = useParams();
  const [state, setState] = useState({ loading: true, opening: null });

  useEffect(() => {
    let active = true;

    if (cachedOpeningDetails.has(openingId)) {
      if (active) {
        setState({
          loading: false,
          opening: cachedOpeningDetails.get(openingId),
        });
      }
      return () => {
        active = false;
      };
    }

    const fetchPromise =
      pendingOpeningDetails.get(openingId) ||
      getOneOpenings(openingId)
        .then((opening) => {
          cachedOpeningDetails.set(openingId, opening || null);
          pendingOpeningDetails.delete(openingId);
          return opening;
        })
        .catch((error) => {
          pendingOpeningDetails.delete(openingId);
          throw error;
        });

    pendingOpeningDetails.set(openingId, fetchPromise);

    fetchPromise
      .then((opening) => {
        if (active)
          setState({
            loading: false,
            opening: opening || null,
          });
      })
      .catch(() => {
        if (active) setState({ loading: false, opening: null });
      });

    return () => {
      active = false;
    };
  }, [openingId]);
  if (state.loading)
    return <main className={styles.state}>Loading position details…</main>;
  if (!state.opening)
    return (
      <main className={styles.state}>
        <h1>Position unavailable</h1>
        <p>This opening is no longer active or could not be found.</p>
        <Link to="/career">Return to careers</Link>
      </main>
    );
  const opening = state.opening,
    internship = opening.type === "internship",
    Icon = internship ? GraduationCap : BriefcaseBusiness;
  const requirements = (opening.keyRequirements || "")
    .split("\n")
    .map((item) => item.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
  const facts = [
    [MapPin, "Location", opening.location],
    [
      BriefcaseBusiness,
      "Experience",
      opening.experience || (internship ? "Fresher" : "Experienced"),
    ],
    [Clock3, "Commitment", opening.commitment || "Full-time"],
    [
      UsersRound,
      "Vacancies",
      `${Number(opening.vacancies) || 1} ${(Number(opening.vacancies) || 1) === 1 ? "opening" : "openings"}`,
    ],
    [
      CalendarDays,
      "Published",
      new Date(opening.createdAt).toLocaleDateString(),
    ],
  ];

  return (
    <main className={styles.page}>
      <div className={styles.canvas} aria-hidden="true">
        <i />
        <i />
        <i />
        <div />
      </div>
      <section className={styles.hero}>
        <div className="container">
          <Link
            className={styles.back}
            to={internship ? "/career/internships" : "/career/experienced"}
          >
            <ArrowLeft size={17} /> Back to{" "}
            {internship ? "internships" : "opportunities"}
          </Link>
          <div className={styles.heroLayout}>
            <div>
              <p className={styles.kicker}>
                {internship ? "INTERNSHIP" : "EXPERIENCED OPPORTUNITY"} · PRIME
                SOFTECH
              </p>
              <BrandHeroHeading text={opening.title} highlightWords={2} />
              <p className={styles.summary}>{opening.description}</p>
            </div>
            <div className={styles.identity}>
              <span>
                <Icon size={35} />
              </span>
              <small>ROLE ID</small>
              <strong>{opening._id.slice(-6).toUpperCase()}</strong>
              <b>
                <i /> ACCEPTING APPLICATIONS
              </b>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.factBar} container`}
        aria-label="Position facts"
      >
        {facts.map(([FactIcon, label, value]) => (
          <article key={label}>
            <FactIcon size={19} />
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          </article>
        ))}
      </section>

      <div className={`${styles.layout} container`}>
        <div className={styles.story}>
          <section className={styles.chapter}>
            <header>
              <span>01</span>
              <div>
                <p>THE OPPORTUNITY</p>
                <h2>Where your work will matter.</h2>
              </div>
            </header>
            <div className={styles.prose}>
              {opening.roleOverview || opening.description}
            </div>
          </section>
          <section className={styles.chapter}>
            <header>
              <span>02</span>
              <div>
                <p>KEY REQUIREMENTS</p>
                <h2>What will help you succeed.</h2>
              </div>
            </header>
            {requirements.length ? (
              <ul className={styles.requirements}>
                {requirements.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.prose}>
                Detailed requirements will be discussed during the introductory
                conversation.
              </p>
            )}
          </section>
          <section className={styles.chapter}>
            <header>
              <span>03</span>
              <div>
                <p>THE EXPERIENCE</p>
                <h2>Built for people who want to grow.</h2>
              </div>
            </header>
            <div className={styles.benefits}>
              {BENEFITS.map(([BenefitIcon, title, copy]) => (
                <article key={title}>
                  <BenefitIcon size={20} />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.chapter}>
            <header>
              <span>04</span>
              <div>
                <p>YOUR JOURNEY</p>
                <h2>A clear and respectful process.</h2>
              </div>
            </header>
            <ol className={styles.process}>
              {PROCESS.map(([number, title, copy]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className={styles.side}>
          <div className={styles.applyCard}>
            <div className={styles.applyTop}>
              <Icon size={22} />
              <span>
                {internship ? "EMERGING TALENT" : "EXPERIENCED TALENT"}
              </span>
            </div>
            <h2>Ready to make your move?</h2>
            <p>
              Share your story, experience, and what draws you to this
              opportunity.
            </p>
            <Link to={`/career/apply/${opening._id}`}>
              Start your application <ArrowUpRight size={18} />
            </Link>
            <small>
              <Send size={13} /> Takes approximately 5–8 minutes
            </small>
          </div>
          <nav className={styles.pageMap} aria-label="Page sections">
            <p>POSITION MAP</p>
            <span>
              <b>01</b> Opportunity
            </span>
            <span>
              <b>02</b> Requirements
            </span>
            <span>
              <b>03</b> Experience
            </span>
            <span>
              <b>04</b> Process
            </span>
          </nav>
        </aside>
      </div>
    </main>
  );
}
export default PositionDetailsPage;
