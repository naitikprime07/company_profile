import { Activity, Blocks, Globe2, ShieldCheck } from "lucide-react";
import Button from "../components/Button";
import useScrollReveal from "../hooks/useScrollReveal";

function NodePage() {
  useScrollReveal();

  return (
    <main className="node-page" id="top">
      <section className="node-hero container">
        <div className="node-copy" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Node.js backend in development
          </p>
          <h1>
            The real-time engine
            <span className="text-gradient"> behind our product.</span>
          </h1>
          <p>
            We are building our product backend with Node.js to support fast
            APIs, asynchronous workloads, secure data flows, and an architecture
            that can grow cleanly from the first release.
          </p>
          <div className="hero-actions">
            <Button className="about-company-button" href="/about">
              About our company
            </Button>
          </div>
          <div className="node-stack">
            <span>Node.js</span>
            <span>REST APIs</span>
            <span>Event driven</span>
            <span>Type safe</span>
          </div>
        </div>

        <div
          className="node-runtime"
          data-reveal
          aria-label="Node.js event loop and API architecture visualization"
        >
          <div className="node-terminal-head">
            <span />
            <span />
            <span />
            <small>product-api / runtime</small>
            <b>ONLINE</b>
          </div>
          <div className="node-runtime-body">
            <div className="node-event-loop">
              <span className="node-core">
                NODE<small>EVENT LOOP</small>
              </span>
              <i className="node-orbit node-orbit-one">
                <b>API</b>
              </i>
              <i className="node-orbit node-orbit-two">
                <b>DB</b>
              </i>
              <i className="node-orbit node-orbit-three">
                <b>JOB</b>
              </i>
            </div>
            <div className="node-log" aria-hidden="true">
              <span>
                <b>GET</b> /api/product <i>200</i>
              </span>
              <span>
                <b>POST</b> /api/session <i>201</i>
              </span>
              <span>
                <b>QUEUE</b> notification <i>ready</i>
              </span>
            </div>
          </div>
          <div className="node-runtime-stats">
            <span>
              <small>STATUS</small>
              <strong>Healthy</strong>
            </span>
            <span>
              <small>ARCHITECTURE</small>
              <strong>Modular</strong>
            </span>
            <span>
              <small>SECURITY</small>
              <strong>Built in</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="node-architecture" id="node-architecture" data-reveal>
        <div className="container">
          <div className="node-section-heading">
            <p className="eyebrow">Backend blueprint</p>
            <h2>Structured for clarity now and scale later.</h2>
            <p>
              Each layer has a clear responsibility, making the backend easier
              to test, secure, observe, and extend as the product develops.
            </p>
          </div>
          <div className="node-architecture-grid">
            <article>
              <span>01</span>
              <Activity size={22} />
              <h3>Fast API layer</h3>
              <p>
                Lean request handling, validation, consistent responses, and
                versioned endpoints connect every product experience.
              </p>
            </article>
            <article>
              <span>02</span>
              <Blocks size={22} />
              <h3>Modular services</h3>
              <p>
                Business logic is organised into focused modules that remain
                easier to understand, test, and evolve.
              </p>
            </article>
            <article>
              <span>03</span>
              <ShieldCheck size={22} />
              <h3>Secure by design</h3>
              <p>
                Authentication, authorisation, input validation, secrets
                management, and audit-ready logging are part of the foundation.
              </p>
            </article>
            <article>
              <span>04</span>
              <Globe2 size={22} />
              <h3>Observable runtime</h3>
              <p>
                Structured logs, health checks, error tracking, and performance
                metrics help us identify issues before launch.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="node-flow container" data-reveal>
        <div>
          <p className="eyebrow">How we build it well</p>
          <h2>One dependable path from request to response.</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <h3>Model</h3>
            <p>
              Define domains, data relationships, API contracts, and failure
              states.
            </p>
          </li>
          <li>
            <span>02</span>
            <h3>Build</h3>
            <p>
              Implement modular services with clear validation and secure
              access.
            </p>
          </li>
          <li>
            <span>03</span>
            <h3>Verify</h3>
            <p>
              Run unit, integration, contract, load, and security focused tests.
            </p>
          </li>
          <li>
            <span>04</span>
            <h3>Observe</h3>
            <p>
              Instrument the runtime and prepare controlled deployment
              workflows.
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}

export default NodePage;
