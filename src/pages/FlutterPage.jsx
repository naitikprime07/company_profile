import { ArrowRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import useScrollReveal from "../hooks/useScrollReveal";
import { ENVIRONMENT } from "../constants/environment";

function FlutterPage() {
  useScrollReveal();

  return (
    <main className="flutter-page" id="top">
      <section className="android-hero container">
        <div className="android-copy" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Flutter product development
          </p>
          <h1>
            Building one consistent product experience
            <span className="text-gradient"> across platforms.</span>
          </h1>
          <p>
            Our in-house team uses Flutter to develop shared product experiences
            for iOS and Android from a single, maintainable codebase. We are
            currently focused on architecture, interface quality, testing, and
            first launch readiness.
          </p>
          <div className="hero-actions">
            <Button className="about-company-button" href="/about">
              About our company
            </Button>
          </div>
          <div className="android-proof">
            <span>Flutter</span>
            <span>Dart</span>
            <span>Cross-platform</span>
          </div>
        </div>
        <div className="android-animation" data-reveal>
          <div className="android-animation-glow" aria-hidden="true" />
          <DotLottieReact
            src={ENVIRONMENT.animations.flutter}
            loop
            autoplay
            aria-label="Flutter product development animation"
          />
        </div>
      </section>

      <section className="android-delivery" id="flutter-foundation" data-reveal>
        <div className="container">
          <SectionHeading
            eyebrow="Our Flutter foundation"
            title="A shared codebase without a generic experience."
            copy="We are building a focused first version with reusable architecture, platform-aware interactions, and a development workflow designed for dependable delivery on both mobile platforms."
          />
          <div className="android-delivery-grid">
            <article>
              <span>01</span>
              <h3>Shared architecture</h3>
              <p>
                Flutter and Dart help us maintain core product logic and
                interface components in one structured codebase.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Platform-aware design</h3>
              <p>
                Adaptive layouts and familiar interaction patterns keep the
                experience natural on both iOS and Android.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Launch preparation</h3>
              <p>
                Automated tests, device checks, performance profiling and store
                preparation support a reliable first release.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="ios-process container" data-reveal>
        <div className="ios-process-copy">
          <p className="eyebrow">How we build our best</p>
          <h2>A focused process from idea to launch readiness.</h2>
          <p>
            Quality is built into every stage. We validate important decisions
            early, keep the codebase maintainable, and test the experience
            across both platforms before preparing the first release.
          </p>
          <a className="text-link" href="#flutter-foundation">
            Explore our Flutter foundation <ArrowRight size={17} />
          </a>
        </div>
        <ol className="ios-process-list">
          <li>
            <span>01</span>
            <div>
              <h3>Define and validate</h3>
              <p>
                Clarify the core problem, prioritise essential features, and
                test key assumptions before development grows.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Design the experience</h3>
              <p>
                Create accessible flows and adaptive interfaces that feel
                familiar on both iOS and Android.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Engineer with care</h3>
              <p>
                Build modular Flutter and Dart architecture with code reviews,
                reusable components, and secure integrations.
              </p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Test and refine</h3>
              <p>
                Verify behaviour on real devices, profile performance, resolve
                issues, and complete launch readiness checks.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </main>
  );
}

export default FlutterPage;
