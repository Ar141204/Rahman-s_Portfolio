import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface SwipeNavigatorProps {
  currentSectionIndex: number;
  totalSections: number;
  onNavigate: (direction: 'left' | 'right') => void;
  swipeZoneActive?: boolean; // desktop/tablet edge hover
  onButtonHover?: (side: 'leftBtn' | 'rightBtn', hovering: boolean) => void; // notify App when button is hovered
}

const SwipeNavigator: React.FC<SwipeNavigatorProps> = ({ currentSectionIndex, totalSections, onNavigate, swipeZoneActive, onButtonHover }) => {
  const isAtStart = currentSectionIndex === 0;
  const isAtEnd = currentSectionIndex === totalSections - 1;
  const [visible, setVisible] = useState(true);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 600px)').matches);
  useEffect(() => {
    const handler = () => setIsMobile(window.matchMedia('(max-width: 600px)').matches);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Auto-hide logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      setVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setVisible(false), 2500);
    };
    show();
    window.addEventListener('mousemove', show);
    window.addEventListener('touchstart', show);
    return () => {
      window.removeEventListener('mousemove', show);
      window.removeEventListener('touchstart', show);
      clearTimeout(timeout);
    };
  }, []);

  // On desktop/tablet, show if swipeZoneActive is true
  if (!isMobile && !swipeZoneActive) return null;
  // On mobile, use auto-hide logic
  if (isMobile && !visible) return null;

  if (isMobile) {
    // Mobile: small round glassmorph buttons, fixed left/right
    return (
      <>
        <button
          onClick={() => onNavigate('left')}
          disabled={isAtStart}
          className="fixed left-3 top-1/2 z-50 w-12 h-12 rounded-full bg-[rgba(44,44,44,0.7)] border border-[var(--accent-color)] flex items-center justify-center shadow-lg backdrop-blur-md"
          style={{ transform: 'translateY(-50%)' }}
          aria-label="Previous section"
        >
          <ChevronLeftIcon className="w-7 h-7 text-[var(--accent-color)]" />
        </button>
        <button
          onClick={() => onNavigate('right')}
          disabled={isAtEnd}
          className="fixed right-3 top-1/2 z-50 w-12 h-12 rounded-full bg-[rgba(44,44,44,0.7)] border border-[var(--accent-color)] flex items-center justify-center shadow-lg backdrop-blur-md"
          style={{ transform: 'translateY(-50%)' }}
          aria-label="Next section"
        >
          <ChevronRightIcon className="w-7 h-7 text-[var(--accent-color)]" />
        </button>
      </>
    );
  }
  // Desktop/tablet: large glassmorph buttons, fixed left/right, vertically centered
  return (
    <>
      <button
        onClick={() => onNavigate('left')}
        disabled={isAtStart}
        className="fixed left-4 top-1/2 z-50 w-16 h-24 rounded-2xl bg-[rgba(44,44,44,0.7)] border border-[var(--accent-color)] flex items-center justify-center shadow-xl backdrop-blur-md transition-opacity duration-200"
        style={{ transform: 'translateY(-50%)' }}
        aria-label="Previous section"
        onMouseEnter={() => onButtonHover && onButtonHover('leftBtn', true)}
        onMouseLeave={() => onButtonHover && onButtonHover('leftBtn', false)}
      >
        <ChevronLeftIcon className="w-8 h-8 text-[var(--accent-color)]" />
      </button>
      <button
        onClick={() => onNavigate('right')}
        disabled={isAtEnd}
        className="fixed right-4 top-1/2 z-50 w-16 h-24 rounded-2xl bg-[rgba(44,44,44,0.7)] border border-[var(--accent-color)] flex items-center justify-center shadow-xl backdrop-blur-md transition-opacity duration-200"
        style={{ transform: 'translateY(-50%)' }}
        aria-label="Next section"
        onMouseEnter={() => onButtonHover && onButtonHover('rightBtn', true)}
        onMouseLeave={() => onButtonHover && onButtonHover('rightBtn', false)}
      >
        <ChevronRightIcon className="w-8 h-8 text-[var(--accent-color)]" />
      </button>
    </>
  );
};

export default SwipeNavigator;