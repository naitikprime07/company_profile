import Button from "../components/Button";
import useScrollReveal from "../hooks/useScrollReveal";

function PhpPage() {
  useScrollReveal();

  return (
    <main className="php-page" id="top">
      <section className="php-hero container">
        <div className="php-copy" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> PHP backend in development
          </p>
          <h1>Practical backend delivery, shaped for our product.</h1>
          <p>
            We use modern PHP to build focused web capabilities quickly without
            compromising structure. Typed code, clear application boundaries,
            secure data access, and automated tests support a reliable first
            release.
          </p>
          <div className="hero-actions">
            <Button className="about-company-button" href="/about">
              About our company
            </Button>
          </div>
          <div className="php-tags">
            <span>PHP 8+</span>
            <span>Laravel</span>
            <span>REST APIs</span>
            <span>SQL</span>
          </div>
        </div>
        <div
          className="php-request-card"
          data-reveal
          aria-label="PHP web request pipeline visualization"
        >
          <div className="php-address">
            <span>POST</span>
            <code>/api/product/action</code>
            <b>202</b>
          </div>
          <div className="php-pipeline-mini">
            <span>
              Request<small>validate</small>
            </span>
            <i>â†’</i>
            <span>
              Application<small>execute</small>
            </span>
            <i>â†’</i>
            <span>
              Response<small>transform</small>
            </span>
          </div>
          <div className="php-code" aria-hidden="true">
            <em>final class</em> ProductAction
            <br />
            {"{"}
            <br />
            &nbsp;&nbsp;<b>public function</b> handle<span>()</span>
            <br />
            &nbsp;&nbsp;{"{"} <i>/* focused logic */</i> {"}"}
            <br />
            {"}"}
          </div>
          <div className="php-card-foot">
            <span>
              <i /> Tests passing
            </span>
            <span>strict_types=1</span>
          </div>
        </div>
      </section>
      <section className="php-foundation" id="php-pipeline" data-reveal>
        <div className="container php-foundation-layout">
          <div className="php-heading">
            <p className="eyebrow">From request to response</p>
            <h2>Simple on the surface. Disciplined underneath.</h2>
            <p>
              Every request moves through explicit layers so validation, product
              logic, persistence, and output remain easy to reason about.
            </p>
          </div>
          <ol className="php-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Validate</h3>
                <p>
                  Check identity, permissions, structure, and input before
                  product logic runs.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Execute</h3>
                <p>
                  Keep business decisions inside focused application services
                  and domain objects.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Persist</h3>
                <p>
                  Use controlled queries, transactions, migrations, and clear
                  data ownership.
                </p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Respond</h3>
                <p>
                  Return consistent, versioned output with useful errors and
                  observable results.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}

export default PhpPage;
