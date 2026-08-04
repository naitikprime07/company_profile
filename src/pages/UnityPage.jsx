import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/Button";
import useScrollReveal from "../hooks/useScrollReveal";
import { ENVIRONMENT } from "../constants/environment";

function UnityPage() {
  useScrollReveal();

  return (
    <main className="unity-page" id="top">
      <div className="unity-game-bg" aria-hidden="true">
        <span className="unity-bg-orbit" />
        <span className="unity-bg-reticle" />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <section className="unity-hero container">
        <div className="unity-copy" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Unity game in development
          </p>
          <h1>Building an engaging game with Unity.</h1>
          <p>
            Our in-house team is using Unity to shape a responsive, polished
            game from the ground up. We are currently focused on gameplay
            systems, visual direction, performance, testing, and a dependable
            foundation for the first launch.
          </p>
          <div className="hero-actions">
            <Button className="about-company-button" href="/about">
              About our company
            </Button>
          </div>
          <div className="unity-tech-row">
            <span>Unity Engine</span>
            <span>C# systems</span>
            <span>Cross-platform</span>
          </div>
        </div>
        <div className="unity-visual" data-reveal>
          <div className="unity-visual-grid" aria-hidden="true" />
          <span className="unity-hud unity-hud-top">
            <small>BUILD MODE</small>
            <strong>PLAYABLE</strong>
          </span>
          <DotLottieReact
            src={ENVIRONMENT.animations.unity}
            loop
            autoplay
            aria-label="Unity game development animation"
          />
          <span className="unity-hud unity-hud-bottom">
            <i /> Core loop in progress
          </span>
        </div>
      </section>

      <section className="unity-foundation" id="unity-foundation" data-reveal>
        <div className="container unity-foundation-layout">
          <div className="unity-foundation-heading">
            <p className="eyebrow">Our Unity foundation</p>
            <h2>Gameplay first. Engineering underneath.</h2>
            <p>
              We are building the first version around a clear gameplay loop,
              modular systems, responsive controls, and stable performance
              across target devices.
            </p>
          </div>
          <div className="unity-system-grid">
            <article className="unity-system-featured">
              <span>01 / CORE</span>
              <h3>Gameplay systems</h3>
              <p>
                Reusable C# components keep player controls, progression, game
                rules, and core mechanics clear and maintainable.
              </p>
              <div className="unity-code-lines" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            </article>
            <article>
              <span>02 / FEEL</span>
              <h3>Immersive experience</h3>
              <p>
                Visuals, animation, sound, feedback, and interface design make
                every interaction feel intentional.
              </p>
            </article>
            <article>
              <span>03 / FPS</span>
              <h3>Stable performance</h3>
              <p>
                Profiling, asset optimisation, memory checks, and device testing
                keep play smooth.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="unity-process container" data-reveal>
        <div className="unity-process-head">
          <p className="eyebrow">How we build our best</p>
          <h2>A playable idea, refined step by step.</h2>
          <p>
            We prove the fun early, develop in small testable increments, and
            use regular playtesting to improve clarity, balance, feel, and
            technical quality before launch.
          </p>
        </div>
        <ol className="unity-timeline">
          <li>
            <span>01</span>
            <div>
              <h3>Define the core loop</h3>
              <p>
                Clarify the player goal, essential mechanics, progression, and
                what should make the experience rewarding.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Prototype the fun</h3>
              <p>
                Build a playable prototype quickly to validate controls, pacing,
                and the central gameplay idea.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Build and polish</h3>
              <p>
                Develop modular systems, production-ready content, responsive
                feedback, and a cohesive presentation.
              </p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Playtest and optimise</h3>
              <p>
                Test on target devices, tune balance, fix issues, and profile
                performance for launch readiness.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </main>
  );
}

export default UnityPage;
