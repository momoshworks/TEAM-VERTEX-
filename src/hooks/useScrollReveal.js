import { useEffect } from 'react';

/**
 * Bulletproof Scroll Reveal Hook
 * - Automatically detects any newly added .scroll-reveal elements (e.g. tabs, filters)
 * - Checks viewport visibility immediately on mount and on scroll
 * - Smoothly reveals elements without leaving cards invisible
 */
export function useScrollReveal() {
  useEffect(() => {
    const observedElements = new WeakSet();

    const checkAndReveal = (el) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // If element is in viewport
      if (rect.top < windowHeight * 0.95 && rect.bottom > 40) {
        el.classList.add('revealed');
      } else if (rect.top > windowHeight || rect.bottom < -100) {
        // Only un-reveal if scrolled completely away
        el.classList.remove('revealed');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            // Only hide when scrolled completely out of view
            if (rect.top >= windowHeight || rect.bottom <= 0) {
              entry.target.classList.remove('revealed');
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => {
        if (!observedElements.has(el)) {
          observedElements.add(el);
          observer.observe(el);
        }
        // Immediate check in case it's already in viewport
        checkAndReveal(el);
      });
    };

    // Initial observe
    observeAll();

    // Listen for DOM mutations (like clicking tabs or filters)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => checkAndReveal(el));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
