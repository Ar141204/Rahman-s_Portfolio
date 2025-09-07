import React, { useState } from 'react';
import { MenuIcon, CloseIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import ThemeSwitcher from './ThemeSwitcher';
import { ThemeName, SOCIAL_LINKS } from '../constants';
import Pacman from './Pacman';

const navLinks = [
    { id: 'about', title: 'about.md' },
    { id: 'experience', title: 'experience.log' },
    { id: 'skills', title: 'skills.json' },
    { id: 'certifications', title: 'certs.list' },
    { id: 'projects', title: 'projects/' },
    { id: 'contact', title: 'contact.sh' },
];

const socialIconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
    Email: MailIcon,
};

interface HeaderProps {
    activeSectionIndex: number;
    navigateTo: (index: number) => void;
    currentTheme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ activeSectionIndex, navigateTo, currentTheme, setTheme, isMenuOpen, setIsMenuOpen }) => {
    // isMenuOpen and setIsMenuOpen are now controlled from App

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        e.preventDefault();
        setIsMenuOpen(false);
        navigateTo(index);
    };

    return (
        <>
            <header className="z-40 bg-[var(--bg-color)] border-b border-[var(--border-color)]">
                <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center text-sm">
                    <a href="#about" onClick={(e) => handleNavClick(e, 0)} className="text-lg hover:text-[var(--accent-color)] transition-colors flex items-center justify-start">
                        <Pacman />
                        <span className="font-bold text-[var(--text-color)]">ARM</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-6 font-mono">
                        <ul className="flex items-center space-x-6">
                            {navLinks.map((link, index) => (
                                <li key={link.id}>
                                    <a
                                        href={`#${link.id}`}
                                        onClick={(e) => handleNavClick(e, index)}
                                        className={`transition-colors duration-300 flex items-center ${activeSectionIndex === index ? 'text-[var(--accent-color)] font-bold' : 'text-[var(--secondary-accent-color)] hover:text-[var(--accent-color)]'
                                            }`}
                                    >
                                        {link.title}
                                        {activeSectionIndex === index && <span className="blinking-cursor" />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
                            {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>
            </header>
            
                        {/* Mobile Menu Overlay */}
                        <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
                                {/* Large X close button */}
                                <button
                                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-[var(--bg-color)] border border-[var(--border-color)] hover:bg-[var(--panel-solid-bg)]"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <CloseIcon className="w-8 h-8" />
                                </button>
                                <ul className="flex flex-col items-center space-y-8 text-xl font-mono mt-12">
                    {navLinks.map((link, index) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={(e) => handleNavClick(e, index)}
                                className={`transition-colors duration-300 flex items-center ${activeSectionIndex === index ? 'text-[var(--accent-color)]' : 'text-[var(--secondary-text-color)] hover:text-[var(--accent-color)]'
                                    }`}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-8 mt-12">
                    {SOCIAL_LINKS.map(link => {
                        const Icon = socialIconMap[link.label];
                        return (
                            <a 
                                key={link.label}
                                href={link.href} 
                                target="_blank" 
                                rel="noreferrer noopener" 
                                aria-label={link.label} 
                                className="text-[var(--secondary-text-color)] hover:text-[var(--accent-color)] transition-colors"
                            >
                                <Icon className="w-8 h-8" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Header;