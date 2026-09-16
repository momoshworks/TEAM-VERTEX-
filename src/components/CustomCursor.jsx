import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth trailing ring
    let animationFrame;
    const animateTrail = () => {
      setTrailing((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animationFrame = requestAnimationFrame(animateTrail);
    };
    animationFrame = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, [pos.x, pos.y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Center sharp dot */}
      <div
        className="fixed w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00e5ff] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Outer trailing aura */}
      <div
        className={`fixed rounded-full border border-cyan-400/60 shadow-[0_0_16px_rgba(0,229,255,0.4)] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovering
            ? 'w-12 h-12 bg-cyan-400/10 border-cyan-300 scale-125'
            : isClicked
            ? 'w-6 h-6 border-purple-400 scale-90'
            : 'w-8 h-8'
        }`}
        style={{ left: `${trailing.x}px`, top: `${trailing.y}px` }}
      />
    </div>
  );
}
