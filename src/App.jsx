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
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  // Activate the scroll reveal & fade engine
  useScrollReveal();

  const getInitialPage = () => {
    if (typeof window !== 'undefined' && window.location.hash.includes('services')) {
      return 'services';
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('services')) {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, sectionId = null) => {
    setCurrentPage(page);
    if (page === 'services') {
      window.location.hash = '/services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionId) {
        window.location.hash = sectionId.replace('#', '');
      } else {
        window.location.hash = '/';
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-slate-100 font-cairo selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 3D Interactive Three.js Background Canvas (Clean 3D Model Only) */}
      <Vertex3DScene />

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content: Home Page or Services Page */}
      {currentPage === 'services' ? (
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
      <Footer currentPage={currentPage} onNavigate={navigateTo} />
    </div>
  );
}
