import { lazy, Suspense } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./routes/ScrollToTop";
import "./App.css";
import ChatBot from "./components/ChatBot";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
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
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminApplicationDetailsPage = lazy(
  () => import("./pages/AdminApplicationDetailsPage"),
);
const AdminInquiryDetailsPage = lazy(
  () => import("./pages/AdminInquiryDetailsPage"),
);
const AdminIntroductionDetailsPage = lazy(
  () => import("./pages/AdminIntroductionDetailsPage"),
);
const AdminOpeningFormPage = lazy(() => import("./pages/AdminOpeningFormPage"));
const AdminBlogFormPage = lazy(() => import("./pages/AdminBlogFormPage"));
const CareerOpeningsPage = lazy(() => import("./pages/CareerOpeningsPage"));
const JobApplicationPage = lazy(() => import("./pages/JobApplicationPage"));
const GeneralApplicationPage = lazy(
  () => import("./pages/GeneralApplicationPage"),
);
const PositionDetailsPage = lazy(() => import("./pages/PositionDetailsPage"));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const showIntroductionAnimation = location.pathname === "/career/introduce";

  return (
    <div
      className={`site-shell ${isAdminRoute ? "admin-shell" : "public-shell"}`}
    >
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
      {!isAdminRoute && <Navbar />}
      <Suspense
        fallback={
          <main className="route-loading" aria-live="polite">
            Loading…
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
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
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/admin/applications/:applicationId"
            element={<AdminApplicationDetailsPage />}
          />
          <Route
            path="/admin/inquiries/:inquiryId"
            element={<AdminInquiryDetailsPage />}
          />
          <Route
            path="/admin/introductions/:id"
            element={<AdminIntroductionDetailsPage />}
          />
          <Route
            path="/admin/openings/new"
            element={<AdminOpeningFormPage />}
          />
          <Route
            path="/admin/openings/:openingId/edit"
            element={<AdminOpeningFormPage />}
          />
          <Route path="/admin/blogs/new" element={<AdminBlogFormPage />} />
          <Route
            path="/admin/blogs/:blogId/edit"
            element={<AdminBlogFormPage />}
          />
          <Route path="/services" element={<ServicesPage />} />
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
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ChatBot />}
    </div>
  );
}

export default App;
