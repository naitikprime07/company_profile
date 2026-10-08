import { ArrowUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import { ENVIRONMENT, contactMailHref } from "../constants/environment";
import styles from "./LegalPage.module.css";

// Shared layout for the legal documents (privacy, terms, cookies). Each page
// only supplies its own heading, intro, and numbered section content.
function LegalPage({ eyebrow, title, accent, intro, sections }) {
  useScrollReveal();

  return (
    <main className={styles.page} id="top">
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">{eyebrow}</p>
            <h1>
              {title}
              <span className="text-gradient"> {accent}</span>
            </h1>
            <p>{intro}</p>
            <div className={styles.meta}>
              <ShieldCheck size={16} aria-hidden="true" />
              <span>
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.document} aria-label={`${title} content`}>
        <div className={`container ${styles.documentInner}`}>
          <aside className={styles.toc} aria-label="Document sections">
            <p className={styles.jumpNavLabel}>On this page</p>
            <nav className={styles.jumpNav}>
              {sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span>{section.number}</span> {section.title}
                </a>
              ))}
            </nav>
          </aside>
          <div className={styles.sections}>
            {sections.map((section) => (
              <article
                className={styles.section}
                id={section.id}
                key={section.id}
                data-reveal
              >
                <div className={styles.sectionHead}>
                  <span className={styles.sectionNumber}>
                    Section {section.number}
                  </span>
                  <h2>{section.title}</h2>
                </div>
                <div className={styles.sectionBody}>
                  {section.blocks.map((block, index) =>
                    block.type === "ul" ? (
                      <ul key={index}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : block.type === "address" ? (
                      <address key={index} className={styles.address}>
                        <strong>
                          {ENVIRONMENT.office.name || "Prime Softech"}
                        </strong>
                        <span>{ENVIRONMENT.office.address}</span>
                        <span>India</span>
                      </address>
                    ) : (
                      <p key={index}>
                        {block.text}{" "}
                        {block.contact && (
                          <a
                            className={styles.mailLink}
                            href={contactMailHref()}
                          >
                            {ENVIRONMENT.contactEmail}
                          </a>
                        )}
                        {block.privacyLink && (
                          <Link className={styles.mailLink} to="/privacy">
                            Privacy Policy
                          </Link>
                        )}
                      </p>
                    ),
                  )}
                  <a className={styles.backToTop} href="#top">
                    Back to top <ArrowUp size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default LegalPage;
