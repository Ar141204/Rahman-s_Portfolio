import React from 'react';
import { GitHubIcon, LinkedInIcon } from './Icons';

const Footer: React.FC = () => {
    return (
        <footer className="py-8">
            <div className="container mx-auto max-w-4xl px-4 flex flex-col items-center text-sm text-[var(--secondary-text-color)]">
                 <div className="flex md:hidden items-center gap-6 mb-4">
                    <a href="https://github.com/Ar141204" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="hover:text-[var(--accent-color)] transition-colors"><GitHubIcon className="w-6 h-6" /></a>
                    <a href="https://www.linkedin.com/in/abdul-rahman-m-a222b4255/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="hover:text-[var(--accent-color)] transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
                </div>
                <p>&copy; {new Date().getFullYear()} Abdul Rahman M. Built with React & Tailwind CSS.</p>
            </div>
        </footer>
    );
};

export default Footer;