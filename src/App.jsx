import { lazy, Suspense, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./routes/ScrollToTop";
import AppLoader from "./components/AppLoader";
import "./App.css";
import ChatBot from "./components/ChatBot";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const PortfolioDetailsPage = lazy(() => import("./pages/PortfolioDetailsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("./pages/BlogDetailsPage"));
const LeadershipTeamPage = lazy(() => import("./pages/LeadershipTeamPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CareerPage = lazy(() => import("./pages/CareerPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const IosPage = lazy(() => import("./pages/IosPage"));
const AndroidPage = lazy(() => import("./pages/AndroidPage"));
const FlutterPage = lazy(() => import("./pages/FlutterPage"));
const UnityPage = lazy(() => import("./pages/UnityPage"));
const NodePage = lazy(() => import("./pages/NodePage"));
const JavaPage = lazy(() => import("./pages/JavaPage"));
const PhpPage = lazy(() => import("./pages/PhpPage"));
const FrontendPage = lazy(() => import("./pages/FrontendPage"));
const DatabasePage = lazy(() => import("./pages/DatabasePage"));
const TechStackPage = lazy(() => import("./pages/TechStackPage"));
const CareerOpeningsPage = lazy(() => import("./pages/CareerOpeningsPage"));
const JobApplicationPage = lazy(() => import("./pages/JobApplicationPage"));
const GeneralApplicationPage = lazy(
  () => import("./pages/GeneralApplicationPage"),
);
const PositionDetailsPage = lazy(() => import("./pages/PositionDetailsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));

function App() {
  const location = useLocation();
  const showIntroductionAnimation = location.pathname === "/career/introduce";

  // Fade out the pre-React boot splash once the shell has committed. By then the
  // route Suspense fallback (identical .prime-loader markup) is already painted,
  // so the hand-off never leaves a blank frame.
  useEffect(() => {
    const splash = document.getElementById("prime-boot-loader");
    if (!splash) return undefined;
    const frame = window.requestAnimationFrame(() => {
      splash.classList.add("is-hidden");
      window.setTimeout(() => splash.remove(), 550);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="site-shell public-shell">
      {showIntroductionAnimation && (
        <div className="introduction-background-animation" aria-hidden="true">
          <DotLottieReact
            src="https://lottie.host/9f146dc3-0499-4e8e-9c1d-47620eccda5a/oXMx13NSaq.lottie"
            loop
            autoplay
          />
        </div>
      )}
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<PortfolioDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          <Route
            path="/about/team/:teamSlug"
            element={<LeadershipTeamPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route
            path="/career/internships"
            element={<CareerOpeningsPage type="internship" />}
          />
          <Route
            path="/career/experienced"
            element={<CareerOpeningsPage type="experienced" />}
          />
          <Route
            path="/career/apply/:openingId"
            element={<JobApplicationPage />}
          />
          <Route
            path="/career/introduce"
            element={<GeneralApplicationPage />}
          />
          <Route
            path="/career/position/:openingId"
            element={<PositionDetailsPage />}
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/technology/ios" element={<IosPage />} />
          <Route path="/technology/android" element={<AndroidPage />} />
          <Route path="/technology/flutter" element={<FlutterPage />} />
          <Route path="/technology/unity" element={<UnityPage />} />
          <Route path="/technology/node" element={<NodePage />} />
          <Route path="/technology/java" element={<JavaPage />} />
          <Route path="/technology/php" element={<PhpPage />} />
          <Route
            path="/technology/angular"
            element={<FrontendPage type="angular" />}
          />
          <Route
            path="/technology/react"
            element={<FrontendPage type="react" />}
          />
          <Route
            path="/technology/typescript"
            element={<FrontendPage type="typescript" />}
          />
          <Route
            path="/technology/html5"
            element={<FrontendPage type="html5" />}
          />
          <Route
            path="/technology/mysql"
            element={<DatabasePage type="mysql" />}
          />
          <Route
            path="/technology/dynamodb"
            element={<DatabasePage type="dynamodb" />}
          />
          <Route
            path="/technology/postgresql"
            element={<DatabasePage type="postgresql" />}
          />
          <Route
            path="/technology/oracle"
            element={<DatabasePage type="oracle" />}
          />
          <Route
            path="/technology/mongodb"
            element={<DatabasePage type="mongodb" />}
          />
          <Route
            path="/technology/redis"
            element={<DatabasePage type="redis" />}
          />
          <Route
            path="/technology/infra-devops"
            element={<TechStackPage group="infra" />}
          />
          <Route
            path="/technology/cms"
            element={<TechStackPage group="cms" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
