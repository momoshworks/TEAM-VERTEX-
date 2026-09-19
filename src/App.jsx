import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Vertex3DScene from './components/Vertex3DScene';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import TracksSection from './components/TracksSection';
import LeadershipSection from './components/LeadershipSection';
import InnovationLab from './components/InnovationLab';
import JoinSection from './components/JoinSection';
import ServicesPage from './components/ServicesPage';
import EventsPage from './components/EventsPage';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import AmbientPlayer from './components/AmbientPlayer';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  // Activate the scroll reveal & fade engine
  useScrollReveal();

  const getInitialPage = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('services')) return 'services';
      if (hash.includes('events')) return 'events';
      if (hash.includes('admin')) return 'admin';
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Admin session state
  const [adminSession, setAdminSession] = useState(() => {
    try {
      const saved = localStorage.getItem('vertex_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Automatic Site Visits Tracking
  useEffect(() => {
    try {
      const key = 'vertex_site_visits';
      const current = parseInt(localStorage.getItem(key) || '142', 10);
      const sessionVisited = sessionStorage.getItem('vertex_session_counted');
      if (!sessionVisited) {
        localStorage.setItem(key, (current + 1).toString());
        sessionStorage.setItem('vertex_session_counted', 'true');
      }
    } catch (e) {
      console.error('Failed to update visits counter:', e);
    }
  }, []);

  // Hash listener for cross-tab and browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('services')) {
        setCurrentPage('services');
      } else if (hash.includes('events')) {
        setCurrentPage('events');
      } else if (hash.includes('admin')) {
        // If not logged in, prompt modal
        const saved = localStorage.getItem('vertex_admin_session');
        if (saved) {
          setCurrentPage('admin');
        } else {
          setAdminLoginModalOpen(true);
          setCurrentPage('home');
        }
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, sectionId = null) => {
    if (page === 'admin') {
      if (adminSession) {
        setCurrentPage('admin');
        window.location.hash = '/admin';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setAdminLoginModalOpen(true);
      }
      return;
    }

    setCurrentPage(page);
    if (page === 'services') {
      window.location.hash = '/services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'events') {
      window.location.hash = '/events';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionId) {
        window.location.hash = sectionId.replace('#', '');
      } else {
        window.location.hash = '/';
      }
    }
  };

  const handleLoginSuccess = (session) => {
    setAdminSession(session);
    setCurrentPage('admin');
    window.location.hash = '/admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setAdminSession(null);
    localStorage.removeItem('vertex_admin_session');
    setCurrentPage('home');
    window.location.hash = '/';
  };

  return (
    <div className="relative min-h-screen bg-black text-slate-100 font-cairo selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 3D Interactive Three.js Background Canvas (Clean 3D Model Only) */}
      <Vertex3DScene />

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
        isAdminLoggedIn={!!adminSession}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Main Content Router */}
      {currentPage === 'admin' && adminSession ? (
        <main className="relative z-10">
          <AdminDashboard
            adminSession={adminSession}
            onLogout={handleAdminLogout}
            onNavigateHome={() => navigateTo('home')}
            onNavigateEvents={() => navigateTo('events')}
          />
        </main>
      ) : currentPage === 'events' ? (
        <main className="relative z-10">
          <EventsPage onNavigateHome={() => navigateTo('home')} />
        </main>
      ) : currentPage === 'services' ? (
        <main className="relative z-10">
          <ServicesPage onNavigateHome={() => navigateTo('home')} />
        </main>
      ) : (
        <main className="relative z-10 flex flex-col gap-10 sm:gap-20">
          <Hero />
          <AboutSection />
          <TracksSection />
          <LeadershipSection />
          <InnovationLab />
          <JoinSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
        isAdminLoggedIn={!!adminSession}
      />

      {/* Floating Background Ambient Music Widget (Mute / Unmute & 1-min loop) */}
      <AmbientPlayer />
    </div>
  );
}
