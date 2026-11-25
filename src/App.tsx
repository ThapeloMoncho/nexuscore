import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { QuoteScopeProvider } from './context/QuoteScopeContext';
import { Navbar } from './components/navigation/Navbar';
import { ProjectScopeDrawer } from './components/scope-drawer/ProjectScopeDrawer';
import { Footer } from './components/footer/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ApproachPage } from './pages/ApproachPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { ContactPage } from './pages/ContactPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <QuoteScopeProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#060B16] text-slate-100">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-400 focus:text-[#04101D] focus:font-semibold"
            >
              Skip to main content
            </a>

            <Navbar />

            <main id="main-content" className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesOverviewPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/approach" element={<ApproachPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/insights/:slug" element={<InsightDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/request-a-quote" element={<RequestQuotePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            <Footer />
            <ProjectScopeDrawer />
          </div>
        </QuoteScopeProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}
