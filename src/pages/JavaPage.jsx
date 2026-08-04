import Button from "../components/Button";
import useScrollReveal from "../hooks/useScrollReveal";

function JavaPage() {
  useScrollReveal();

  return (
    <main className="java-page" id="top">
      <section className="java-hero container">
        <div className="java-copy" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Java backend in development
          </p>
          <h1>Dependable systems built for long term growth.</h1>
          <p>
            We use Java where our product needs strong domain modelling,
            predictable performance, secure integrations, and a backend
            foundation designed to remain stable as complexity grows.
          </p>
          <div className="hero-actions">
            <Button className="about-company-button" href="/about">
              About our company
            </Button>
          </div>
          <div className="java-tags">
            <span>Java</span>
            <span>Spring Boot</span>
            <span>JVM</span>
            <span>Type safe</span>
          </div>
        </div>
        <div
          className="java-machine"
          data-reveal
          aria-label="Java virtual machine architecture visualization"
        >
          <div className="java-machine-top">
            <small>JVM / PRODUCT CORE</small>
            <b>BUILDING</b>
          </div>
          <div className="java-rings">
            <i />
            <i />
            <span>
              JAVA<small>DOMAIN CORE</small>
            </span>
          </div>
          <div className="java-layers">
            <span>
              <b>API</b> Controllers
            </span>
            <span>
              <b>CORE</b> Business logic
            </span>
            <span>
              <b>DATA</b> Persistence
            </span>
          </div>
        </div>
      </section>
      <section className="java-foundation" id="java-foundation" data-reveal>
        <div className="container">
          <div className="java-heading">
            <p className="eyebrow">Engineered in layers</p>
            <h2>Clear boundaries. Predictable behaviour.</h2>
            <p>
              Our Java foundation separates product rules from delivery and
              infrastructure, keeping important logic testable and easier to
              change.
            </p>
          </div>
          <div className="java-pillars">
            <article>
              <span>01</span>
              <h3>Domain-led design</h3>
              <p>
                Explicit models and service boundaries keep complex product
                rules understandable.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Spring foundation</h3>
              <p>
                Structured APIs, dependency injection, validation, and
                configuration support disciplined development.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Resilient integration</h3>
              <p>
                Timeouts, retries, transactions, and controlled failure handling
                protect critical workflows.
              </p>
            </article>
            <article>
              <span>04</span>
              <h3>Verified quality</h3>
              <p>
                Unit, integration, contract, security, and performance tests
                prepare the system for launch.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default JavaPage;
