import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AnimatedStat from "../components/common/AnimatedStat";
import ProfessionalServices from "../components/sections/ProfessionalServices";
import DeliveryStandard from "../components/sections/DeliveryStandard";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import useScrollReveal from "../hooks/useScrollReveal";
import { ENVIRONMENT } from "../constants/environment";

function HomePage() {
  useScrollReveal();

  return (
    <main id="top">
      <section className="hero container">
        <div className="hero-prime-field" aria-hidden="true">
          <span className="hero-prime-arc arc-one" />
          <span className="hero-prime-arc arc-two" />
          <span className="hero-prime-beam" />
          <i className="hero-prime-node node-one" />
          <i className="hero-prime-node node-two" />
          <i className="hero-prime-node node-three" />
        </div>
        <div className="hero-copy-wrap" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Independent digital product studio
          </p>
          <h1>Transform your business with cutting-edge technology.</h1>
          <p className="hero-lede">
            Prime Softech delivers innovative mobile applications, web
            development, and digital marketing solutions. We transform ideas
            into powerful technology that accelerates business growth and
            maximizes your competitive advantage.
          </p>
        </div>
        <div className="hero-art hero-lottie-stage" data-reveal>
          <div className="hero-lottie-glow" aria-hidden="true" />
          <div className="hero-visual-label">
            <span className="status-dot" /> Product delivery, in motion
          </div>
          <DotLottieReact
            className="hero-lottie"
            src={ENVIRONMENT.animations.home}
            loop
            autoplay
            aria-label="Animated technology illustration"
          />
          <div className="hero-visual-pills" aria-hidden="true">
            <span>Web platforms</span>
            <span>Mobile apps</span>
            <span>Growth systems</span>
          </div>
        </div>
      </section>

      <section
        className="client-marquee"
        id="clients"
        aria-labelledby="client-marquee-title"
        data-reveal
      >
        <div className="container client-marquee-heading client-marquee-heading-compact">
          <h2 id="client-marquee-title">
            Trusted by <span>industry leaders</span>
          </h2>
        </div>
        <div className="marquee-viewport" aria-label="Client partners">
          <div className="marquee-track">
            <div className="marquee-set">
              <span>Arcway</span>
              <span className="wordmark-soft">bluenotary</span>
              <span className="wordmark-mark">CIM</span>
              <span>klogW</span>
              <span className="wordmark-wide">CRUDO</span>
              <span>EUKA</span>
              <span className="wordmark-soft">Everyones</span>
              <span>Leadingly</span>
            </div>
            <div className="marquee-set" aria-hidden="true">
              <span>Arcway</span>
              <span className="wordmark-soft">bluenotary</span>
              <span className="wordmark-mark">CIM</span>
              <span>klogW</span>
              <span className="wordmark-wide">CRUDO</span>
              <span>EUKA</span>
              <span className="wordmark-soft">Everyones</span>
              <span>Leadingly</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" data-reveal>
        <div className="container stats-grid">
          <AnimatedStat
            value={12}
            suffix="+"
            label="Years creating digital products"
          />
          <AnimatedStat
            value={80}
            suffix="+"
            label="Products shipped with care"
            delay={120}
          />
          <AnimatedStat
            value={24}
            label="Senior specialists on our team"
            delay={240}
          />
          <AnimatedStat
            value={9}
            label="Countries our clients call home"
            delay={360}
          />
        </div>
      </section>
      <ProfessionalServices />
      <WhyChooseUs />
      <DeliveryStandard />
    </main>
  );
}

export default HomePage;
