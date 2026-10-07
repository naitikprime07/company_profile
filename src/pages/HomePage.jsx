import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import AnimatedStat from "../components/common/AnimatedStat";
import ProfessionalServices from "../components/sections/ProfessionalServices";
import DeliveryStandard from "../components/sections/DeliveryStandard";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import useScrollReveal from "../hooks/useScrollReveal";
import { ENVIRONMENT } from "../constants/environment";
import { getHomeStats } from "../services/homeStatService";

const DEFAULT_STATS = [
  { value: 12, suffix: "+", label: "Years creating digital products" },
  { value: 80, suffix: "+", label: "Products shipped with care" },
  { value: 24, suffix: "", label: "Senior specialists on our team" },
  { value: 9, suffix: "", label: "Countries our clients call home" },
];

function HomePage() {
  useScrollReveal();
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    let active = true;
    getHomeStats()
      .then((data) => {
        if (active && Array.isArray(data) && data.length)
          setStats(
            data.map((item) => ({
              value: item.value,
              suffix: item.suffix || "",
              label: item.label,
            })),
          );
      })
      .catch(() => {
        /* keep defaults if the API is unavailable */
      });
    return () => {
      active = false;
    };
  }, []);


  return (
    <main id="top">
      <section className="hero container">
        <div className="hero-prime-field" aria-hidden="true">
          <span className="hero-prime-arc arc-one" />
          <span className="hero-prime-arc arc-two" />
          <span className="hero-prime-beam" />
          <div className="hero-flow-network">
            <span className="hero-flow-lane flow-one" />
            <span className="hero-flow-lane flow-two" />
            <span className="hero-flow-lane flow-three" />
            <span className="hero-flow-lane flow-four" />
          </div>
          <i className="hero-prime-node node-one" />
          <i className="hero-prime-node node-two" />
          <i className="hero-prime-node node-three" />
        </div>
        <div className="hero-copy-wrap" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Independent digital product studio
          </p>
          <h1>
            Transform your business
            <span className="text-gradient"> with cutting-edge technology.</span>
          </h1>
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

      <section className="stats-section" data-reveal>
        <div className="container stats-grid">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 120}
            />
          ))}
        </div>
      </section>
      <ProfessionalServices />
      <WhyChooseUs />
      <DeliveryStandard />
    </main>
  );
}

export default HomePage;
