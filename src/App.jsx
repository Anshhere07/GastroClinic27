import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import DrVayuGuide from './components/DrVayuGuide';
import HomePage from './pages/HomePage';


const AboutPage        = lazy(() => import('./pages/AboutPage'));
const ClinicsPage      = lazy(() => import('./pages/ClinicsPage'));
const ServicesPage     = lazy(() => import('./pages/ServicesPage'));
const AppointmentPage  = lazy(() => import('./pages/AppointmentPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const ContactPage      = lazy(() => import('./pages/ContactPage'));
const PrivacyPage      = lazy(() => import('./pages/PrivacyPage'));
const TermsPage        = lazy(() => import('./pages/TermsPage'));
const DisclaimerPage   = lazy(() => import('./pages/DisclaimerPage'));

function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <img src="/images/logo.png" alt="Gastro Clinic 27" className="w-24 h-24 object-contain" />
        <div className="text-center">
          <p className="font-display font-bold text-primary-900 text-2xl tracking-tight">Gastro Clinic 27</p>
          <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mt-1">Expert Digestive Care</p>
        </div>
        <div className="flex gap-1.5 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-2 h-2 rounded-full bg-primary-400"
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.22 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}



const PAGE_METADATA = {
  '/': {
    title: 'Gastro Clinic 27 – Expert Digestive Care in Shahjahanpur',
    description: 'Specialist gastroenterology, laparoscopic surgery and digestive care across 5 clinics in Shahjahanpur region. 50,000+ patients treated since 2019. Book an appointment online.',
  },
  '/about': {
    title: 'About Us | Gastro Clinic 27',
    description: 'Learn about Gastro Clinic 27, founded in 2019 in Shahjahanpur. Our NMC-registered surgical team holds FMAS, FIAGES, and DNB qualifications for trusted digestive healthcare.',
  },
  '/clinics': {
    title: 'Our Clinics & OPD Schedule | Gastro Clinic 27',
    description: 'Find Gastro Clinic 27 OPD timings, contact numbers, and addresses across 5 locations: Shahjahanpur, Nigohi, Shahabad, Tilhar, and Powayan.',
  },
  '/services': {
    title: 'Specialist Digestive & Laparoscopic Services | Gastro Clinic 27',
    description: 'Explore specialist digestive care at Gastro Clinic 27: laparoscopic surgery, gallbladder stone removal, piles and fissure treatment, and IBS management.',
  },
  '/appointment': {
    title: 'Book an Appointment | Gastro Clinic 27',
    description: 'Book a gastroenterology consultation online at any of our 5 clinic locations in Shahjahanpur district. Choose your preferred clinic, date, and consultation slot.',
  },
  '/testimonials': {
    title: 'Patient Reviews & Testimonials | Gastro Clinic 27',
    description: 'Read verified patient reviews and recovery stories from patients treated for gallbladder surgery, piles, hernia, and digestive ailments at Gastro Clinic 27.',
  },
  '/contact': {
    title: 'Contact Us & Clinic Helplines | Gastro Clinic 27',
    description: 'Get in touch with Gastro Clinic 27 in Shahjahanpur. View contact numbers, email, OPD schedules, emergency guidance, and frequently asked questions.',
  },
  '/privacy': {
    title: 'Privacy Policy | Gastro Clinic 27',
    description: 'Read the Gastro Clinic 27 privacy policy regarding patient information, medical data security, and communication guidelines.',
  },
  '/terms': {
    title: 'Terms of Service | Gastro Clinic 27',
    description: 'Read the terms of service, consultation guidelines, and appointment policies for Gastro Clinic 27.',
  },
  '/disclaimer': {
    title: 'Medical Disclaimer | Gastro Clinic 27',
    description: 'Important medical disclaimer for Gastro Clinic 27. Online information and AI guidance are for informational purposes and not a substitute for direct medical evaluation.',
  },
};

function TitleUpdater() {
  const { pathname } = useLocation();
  useEffect(() => {
    const normalizedPath = pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
    const isKnownRoute = Object.prototype.hasOwnProperty.call(PAGE_METADATA, normalizedPath);
    const meta = PAGE_METADATA[normalizedPath] ?? {
      title: 'Page Not Found | Gastro Clinic 27',
      description: 'The requested page could not be found on Gastro Clinic 27.',
    };

    // 1. Title
    document.title = meta.title;

    // 2. Meta description & OpenGraph description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', meta.description);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', meta.description);
    }

    // 3. Maintain accurate self-referential canonical URL & og:url
    const canonicalPath = normalizedPath === '/' ? '/' : normalizedPath;
    const canonicalHref = `https://gastroclinic27.com${canonicalPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalHref);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalHref);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    }

    // 4. Prevent indexing of soft 404s for unknown routes
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!isKnownRoute) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow');
    }
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait for the page transition animation (0.4s) to finish before scrolling
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const navbarOffset = 80; // info banner (~22px) + sticky header (~90px)
          const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 450);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Suspense fallback={<div className="min-h-screen" />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clinics" element={<ClinicsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
              <h1 className="font-display text-6xl font-bold text-primary-600">404</h1>
              <p className="text-gray-500">Page not found.</p>
              <Link to="/" className="btn-primary">Go Home</Link>
            </div>
          } />
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
     
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  return (
      <>
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" onDone={() => setShowSplash(false)} />}
      </AnimatePresence>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <TitleUpdater />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1"><AnimatedRoutes /></main>
        <Footer />
        <WhatsAppButton />
        <DrVayuGuide />
      </div>
    </BrowserRouter>
    </>
  );
}
