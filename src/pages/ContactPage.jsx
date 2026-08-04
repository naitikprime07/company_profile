import {
  ArrowUpRight,
  Building2,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  ShieldCheck,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ContactForm from "../components/sections/ContactForm";
import { ENVIRONMENT, mailTo } from "../constants/environment";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./ContactPage.module.css";

function ContactPage() {
  useScrollReveal();

  return (
    <main className={styles.page} id="top">
      <div className={styles.backgroundSystem} aria-hidden="true">
        <span className={styles.auroraOne} />
        <span className={styles.auroraTwo} />
        <span className={styles.signalPath}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.signalPathTwo}>
          <i />
          <i />
        </span>
        <span className={styles.backgroundOrbit}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.noise} />
      </div>
      <div className={styles.contactAnimationLayer} aria-hidden="true">
        <span className={styles.animationHalo} />
        <DotLottieReact
          className={styles.contactLottie}
          src={ENVIRONMENT.animations.contact}
          loop
          autoplay
        />
        <span className={styles.animationTrace}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <section className={`${styles.hero} container`} data-reveal>
        <div className={styles.intro}>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Contact Prime Softech
          </p>
          <h1>Let’s turn your next challenge into meaningful progress.</h1>
          <p>
            Tell us where your business is heading, what is getting in the way,
            and what a successful outcome would change. We will bring the right
            senior team to the conversation.
          </p>
          <div className={styles.direct}>
            <a href={mailTo()}>
              <span>
                <Mail size={19} />
              </span>
              <div>
                <small>Start with an email</small>
                <strong>{ENVIRONMENT.contactEmail}</strong>
              </div>
            </a>
            <div>
              <span>
                <Clock3 size={19} />
              </span>
              <div>
                <small>Typical response</small>
                <strong>Within one business day</strong>
              </div>
            </div>
          </div>
          <div className={styles.signal} aria-hidden="true">
            <span>DISCOVER</span>
            <i />
            <span>ALIGN</span>
            <i />
            <span>BUILD</span>
          </div>
        </div>
        <ContactForm />
      </section>

      <section
        className={styles.location}
        data-reveal
        aria-labelledby="location-title"
      >
        <div className="container">
          <header className={styles.locationHeading}>
            <div>
              <p className="eyebrow">Where ideas meet</p>
              <h2 id="location-title">
                Visit our studio,
                <br />
                <span>or meet us anywhere.</span>
              </h2>
            </div>
            <p>
              Our home base keeps us connected, but our work has never been
              limited by geography. We collaborate closely with teams across
              time zones and borders.
            </p>
          </header>
          <div className={styles.locationGrid}>
            <div className={styles.mapShell}>
              <div className={styles.mapTop}>
                <span>
                  <i /> LIVE LOCATION
                </span>
                <b>{ENVIRONMENT.office.location.toUpperCase()}</b>
              </div>
              {ENVIRONMENT.office.mapEmbedUrl && (
                <iframe
                  src={ENVIRONMENT.office.mapEmbedUrl}
                  title={`Map showing ${ENVIRONMENT.office.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
              <div className={styles.mapMarker} aria-hidden="true">
                <span>
                  <MapPin size={20} />
                </span>
                <i />
              </div>
              <div className={styles.mapCoordinates} aria-hidden="true">
                <span>STUDIO / 01</span>
                <b>CONNECTED</b>
              </div>
            </div>
            <aside className={styles.officeCard}>
              <div className={styles.officeIcon}>
                <Building2 size={25} />
              </div>
              <p>Primary studio</p>
              <h3>{ENVIRONMENT.office.name}</h3>
              <address>{ENVIRONMENT.office.address}</address>
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>{ENVIRONMENT.office.location}</dd>
                </div>
                <div>
                  <dt>Working timezone</dt>
                  <dd>{ENVIRONMENT.office.timezone}</dd>
                </div>
                <div>
                  <dt>Meetings</dt>
                  <dd>By appointment · Remote friendly</dd>
                </div>
              </dl>
              <a
                href={ENVIRONMENT.office.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>Open directions</span>
                <Navigation size={17} />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.expect} data-reveal>
        <div className="container">
          <header>
            <p className="eyebrow">What happens next</p>
            <h2>A useful first conversation, not a sales performance.</h2>
          </header>
          <div className={styles.steps}>
            <article>
              <span>01</span>
              <MessageCircle size={22} />
              <h3>We listen</h3>
              <p>
                A senior team member reviews your context, goals, constraints,
                and open questions.
              </p>
            </article>
            <article>
              <span>02</span>
              <Globe2 size={22} />
              <h3>We explore</h3>
              <p>
                We discuss the opportunity, likely approach, delivery shape, and
                what needs validating first.
              </p>
            </article>
            <article>
              <span>03</span>
              <ShieldCheck size={22} />
              <h3>We make it clear</h3>
              <p>
                You receive an honest recommendation with practical next
                steps—even if we are not the right fit.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className={`${styles.ready} container`} data-reveal>
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Good work begins with a clear conversation.</h2>
        </div>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ENVIRONMENT.contactEmail)}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>Email our studio</span>
          <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}

export default ContactPage;
