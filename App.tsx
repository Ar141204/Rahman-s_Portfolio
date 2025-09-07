import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Loader from './components/Loader';
import AnimatedSection from './components/AnimatedSection';
import SocialSidebar from './components/SocialSidebar';
import SwipeNavigator from './components/SwipeNavigator';
import { THEMES, ThemeName } from './constants';

const sections = [
    { id: 'about', component: <About /> },
    { id: 'experience', component: <Experience /> },
    { id: 'skills', component: <Skills /> },
    { id: 'certifications', component: <Certifications /> },
    { id: 'projects', component: <Projects /> },
    { id: 'contact', component: <Contact /> },
];
const sectionIds = sections.map(s => s.id);

const App: React.FC = () => {
    // Helper to check if device is mobile/tablet
    const isMobileOrTablet = () => window.matchMedia('(max-width: 1023px)').matches;
    const [isMobile, setIsMobile] = useState(isMobileOrTablet());
    useEffect(() => {
        const handleResize = () => setIsMobile(isMobileOrTablet());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState<ThemeName>(() => {
        const savedTheme = localStorage.getItem('portfolio-theme') as ThemeName;
        return savedTheme || 'oceanic-teal';
    });
    // Track if cursor is in left/right hover zone or over the button (desktop/tablet only)
    const [swipeZoneActive, setSwipeZoneActive] = useState(false);
    // Helper to keep visible if hovering button or zone
    const swipeZoneRef = useRef({ left: false, right: false, leftBtn: false, rightBtn: false });
    const updateSwipeZone = () => {
        setSwipeZoneActive(
            swipeZoneRef.current.left || swipeZoneRef.current.right || swipeZoneRef.current.leftBtn || swipeZoneRef.current.rightBtn
        );
    };
    
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const currentTheme = THEMES[theme];
        const root = document.documentElement;
        Object.entries(currentTheme).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const navigateTo = (index: number) => {
        if (index >= 0 && index < sections.length) {
            setActiveIndex(index);
        }
        setIsMenuOpen(false);
    };

    const handleNavigate = (direction: 'left' | 'right') => {
        const newIndex = direction === 'right' ? activeIndex + 1 : activeIndex - 1;
        navigateTo(newIndex);
    };
    
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="grid grid-rows-[auto_1fr] h-screen bg-[var(--bg-color)]">
            <Header 
                activeSectionIndex={activeIndex} 
                navigateTo={navigateTo}
                currentTheme={theme}
                setTheme={setTheme}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
            <div className="relative h-full w-full overflow-hidden">
                {activeIndex < sections.length - 1 && <SocialSidebar />}
                <main className="relative w-full h-full">
                    <div 
                        className="flex w-full h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {sections.map(({ id, component }, index) => (
                             <div className="w-full h-full flex-shrink-0" key={id}>
                                <AnimatedSection id={id} isActive={activeIndex === index} navigateTo={navigateTo}>
                                    {component}
                                </AnimatedSection>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            {/* Swipe buttons: mobile always visible, desktop/tablet visible on edge hover */}
            {!isMenuOpen && (
                <>
                    {/* Mobile: always visible, already handled in SwipeNavigator */}
                    {/* Desktop/Tablet: show on edge hover */}
                    {!isMobile && (
                        <>
                            <div
                                className="swipe-navigator-zone left"
                                style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '60px', zIndex: 39 }}
                                onMouseEnter={() => { swipeZoneRef.current.left = true; updateSwipeZone(); }}
                                onMouseLeave={() => { swipeZoneRef.current.left = false; updateSwipeZone(); }}
                            />
                            <div
                                className="swipe-navigator-zone right"
                                style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '60px', zIndex: 39 }}
                                onMouseEnter={() => { swipeZoneRef.current.right = true; updateSwipeZone(); }}
                                onMouseLeave={() => { swipeZoneRef.current.right = false; updateSwipeZone(); }}
                            />
                        </>
                    )}
                    <SwipeNavigator
                        currentSectionIndex={activeIndex}
                        totalSections={sections.length}
                        onNavigate={handleNavigate}
                        swipeZoneActive={swipeZoneActive}
                        onButtonHover={(side, hovering) => {
                            swipeZoneRef.current[side] = hovering;
                            updateSwipeZone();
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default App;