import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Vertex3DScene from './components/Vertex3DScene';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import TracksSection from './components/TracksSection';
import LeadershipSection from './components/LeadershipSection';
import InnovationLab from './components/InnovationLab';
import JoinSection from './components/JoinSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  // Activate the scroll reveal & fade engine
  useScrollReveal();

  return (
    <div className="relative min-h-screen bg-black text-slate-100 font-cairo selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 3D Interactive Three.js Background Canvas (Clean 3D Model Only) */}
      <Vertex3DScene />

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Navigation Bar */}
      <Navbar />

      {/* Main Content Sections with Scroll-Driven Animations */}
      <main className="relative z-10 flex flex-col gap-10 sm:gap-20">
        <Hero />
        <AboutSection />
        <TracksSection />
        <LeadershipSection />
        <InnovationLab />
        <JoinSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
