import {
  Activity,
  ArrowRight,
  Blocks,
  Check,
  Orbit,
  ShieldCheck,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import useScrollReveal from "../hooks/useScrollReveal";
import { ENVIRONMENT } from "../constants/environment";

function IosPage() {
  useScrollReveal();

  return (
    <main className="ios-page" id="top">
      <section className="ios-hero container">
        <div className="ios-copy" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> iOS product in development
          </p>
          <h1>
            Building our product
            <span className="text-gradient"> for the Apple ecosystem.</span>
          </h1>
          <p>
            Our in-house team is developing an iOS product from the ground up.
            Product direction, interface design, Swift engineering, and quality
            assurance come together as we prepare a focused first release.
          </p>
          <div className="hero-actions">
            <Button className="about-company-button" href="/about">
              About our company
            </Button>
          </div>
          <div className="ios-proof" aria-label="iOS development capabilities">
            <span>
              <Check size={14} /> Swift &amp; SwiftUI
            </span>
            <span>
              <Check size={14} /> Apple ecosystem
            </span>
            <span>
              <Check size={14} /> App Store preparation
            </span>
          </div>
        </div>

        <div className="ios-animation-stage" data-reveal>
          <div className="ios-animation-aura" aria-hidden="true" />
          <span className="ios-float-badge ios-badge-top">
            <ShieldCheck size={17} /> Privacy first
          </span>
          <DotLottieReact
            className="ios-lottie"
            src={ENVIRONMENT.animations.ios}
            loop
            autoplay
            aria-label="Animated iOS application development illustration"
          />
          <span className="ios-float-badge ios-badge-bottom">
            <Activity size={17} /> Native performance
          </span>
        </div>
      </section>

      <section className="ios-capabilities" id="ios-foundation" data-reveal>
        <div className="container">
          <SectionHeading
            eyebrow="Our iOS foundation"
            title="Every layer of the first release, thoughtfully connected."
            copy="Our in-house team combines product direction, Apple native design, Swift engineering, and quality assurance to build a dependable product before launch."
            align="center"
          />
          <div className="ios-capability-grid">
            <article>
              <span>
                <Orbit size={21} />
              </span>
              <small>01</small>
              <h3>Product direction</h3>
              <p>
                Problem research, clear priorities and early validation shape
                the roadmap for the product we are building.
              </p>
            </article>
            <article>
              <span>
                <Blocks size={21} />
              </span>
              <small>02</small>
              <h3>Apple-native design</h3>
              <p>
                Polished, accessible interfaces that feel familiar across
                iPhone, iPad, and the wider Apple ecosystem.
              </p>
            </article>
            <article>
              <span>
                <Activity size={21} />
              </span>
              <small>03</small>
              <h3>Swift engineering</h3>
              <p>
                Maintainable Swift and SwiftUI architecture built for smooth
                performance, security, and long-term growth.
              </p>
            </article>
            <article>
              <span>
                <ShieldCheck size={21} />
              </span>
              <small>04</small>
              <h3>Launch preparation</h3>
              <p>
                Quality assurance, privacy reviews, performance checks and App
                Store planning support a confident first release.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="ios-process container" data-reveal>
        <div className="ios-process-copy">
          <p className="eyebrow">Our development path</p>
          <h2>From a validated idea to a launch ready product.</h2>
          <p>
            Our product, design, and engineering teams work together through
            short development cycles, keeping the first release focused and
            technically dependable.
          </p>
          <a className="text-link" href="/#about">
            Learn about our company <ArrowRight size={17} />
          </a>
        </div>
        <ol className="ios-process-list">
          <li>
            <span>01</span>
            <div>
              <h3>Discover</h3>
              <p>
                Identify meaningful user problems and validate the product
                opportunity.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Design</h3>
              <p>
                Prototype, test, and refine the experience around real user
                behaviour.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Build</h3>
              <p>
                Engineer, integrate, and test the product in focused development
                cycles.
              </p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Prepare</h3>
              <p>
                Complete quality checks and store preparation for the first
                release.
              </p>
            </div>
          </li>
        </ol>
      </section>

    </main>
  );
}

export default IosPage;
