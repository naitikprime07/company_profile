import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import useScrollReveal from "../hooks/useScrollReveal";
import { ENVIRONMENT } from "../constants/environment";

function AndroidPage() {
  useScrollReveal();

  return (
    <main className="android-page" id="top">
      <section className="android-hero container">
        <div className="android-copy" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Android product in development
          </p>
          <h1>Building our product for the Android ecosystem.</h1>
          <p>
            Our in-house team is developing an Android product from the ground
            up. We are combining focused product thinking, native engineering,
            and careful testing to create a strong foundation before launch.
          </p>
          <div className="hero-actions">
            <Button className="about-company-button" href="/about">
              About our company
            </Button>
          </div>
          <div className="android-proof">
            <span>Kotlin</span>
            <span>Jetpack Compose</span>
            <span>Launch focused</span>
          </div>
        </div>
        <div className="android-animation" data-reveal>
          <div className="android-animation-glow" aria-hidden="true" />
          <DotLottieReact
            src={ENVIRONMENT.animations.android}
            loop
            autoplay
            aria-label="Android product animation"
          />
        </div>
      </section>

      <section className="android-delivery" id="android-foundation" data-reveal>
        <div className="container">
          <SectionHeading
            eyebrow="Our Android foundation"
            title="Building natively from the beginning."
            copy="Our product, design, and engineering work is focused on creating a dependable first version that is ready to validate, refine, and launch."
          />
          <div className="android-delivery-grid">
            <article>
              <span>01</span>
              <h3>Native foundation</h3>
              <p>
                Kotlin and Jetpack Compose give our product a responsive
                interface, reliable performance, and a maintainable foundation.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Thoughtful experience</h3>
              <p>
                Clear flows, accessible interfaces, and early prototypes help us
                shape an intuitive experience before launch.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Launch readiness</h3>
              <p>
                Automated testing, performance checks, security reviews, and
                release planning prepare the product for Google Play.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AndroidPage;
