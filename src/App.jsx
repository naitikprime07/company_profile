import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './routes/ScrollToTop'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CareerPage = lazy(() => import('./pages/CareerPage'))
const IosPage = lazy(() => import('./pages/IosPage'))
const AndroidPage = lazy(() => import('./pages/AndroidPage'))
const FlutterPage = lazy(() => import('./pages/FlutterPage'))
const UnityPage = lazy(() => import('./pages/UnityPage'))
const NodePage = lazy(() => import('./pages/NodePage'))
const JavaPage = lazy(() => import('./pages/JavaPage'))
const PhpPage = lazy(() => import('./pages/PhpPage'))
const FrontendPage = lazy(() => import('./pages/FrontendPage'))
const DatabasePage = lazy(() => import('./pages/DatabasePage'))

function App() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<main className="route-loading" aria-live="polite">Loading…</main>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/technology/ios" element={<IosPage />} />
          <Route path="/technology/android" element={<AndroidPage />} />
          <Route path="/technology/flutter" element={<FlutterPage />} />
          <Route path="/technology/unity" element={<UnityPage />} />
          <Route path="/technology/node" element={<NodePage />} />
          <Route path="/technology/java" element={<JavaPage />} />
          <Route path="/technology/php" element={<PhpPage />} />
          <Route path="/technology/angular" element={<FrontendPage type="angular" />} />
          <Route path="/technology/react" element={<FrontendPage type="react" />} />
          <Route path="/technology/typescript" element={<FrontendPage type="typescript" />} />
          <Route path="/technology/html5" element={<FrontendPage type="html5" />} />
          <Route path="/technology/mysql" element={<DatabasePage type="mysql" />} />
          <Route path="/technology/dynamodb" element={<DatabasePage type="dynamodb" />} />
          <Route path="/technology/postgresql" element={<DatabasePage type="postgresql" />} />
          <Route path="/technology/oracle" element={<DatabasePage type="oracle" />} />
          <Route path="/technology/mongodb" element={<DatabasePage type="mongodb" />} />
          <Route path="/technology/redis" element={<DatabasePage type="redis" />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
