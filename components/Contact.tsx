import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { GitHubIcon, LinkedInIcon } from './Icons';
import TypingTitle from './TypingTitle';

const socialIconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
};

interface ContactProps {
    isVisible?: boolean;
}

const Contact: React.FC<ContactProps> = ({ isVisible = false }) => {
    const emailLink = SOCIAL_LINKS.find(link => link.label === 'Email')?.href || '';
    const displayLinks = SOCIAL_LINKS.filter(link => link.label !== 'Email');

    return (
        <div className="flex flex-col h-full justify-between items-center text-center p-4">
            <div className="flex-grow flex flex-col justify-center items-center">
                <p className="text-lg text-[var(--accent-color)] font-mono mb-4">What's Next?</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-color)] mb-4">Get In Touch</h2>
                <p className="text-[var(--secondary-text-color)] text-lg max-w-xl mx-auto mb-8">
                    I'm currently seeking new opportunities and my inbox is always open. Whether you have a question, a project proposal, or just want to say hi, I'll do my best to get back to you!
                </p>
                <a
                    href={emailLink}
                    className="font-mono text-lg border border-[var(--accent-color)] text-[var(--accent-color)] px-8 py-4 rounded-md hover:bg-[var(--hover-bg)] transition-colors duration-300 flex items-center"
                >
                    ./contact.sh
                    <span className="blinking-cursor !h-6"></span>
                </a>
                <div className="contact-social-links flex items-center gap-8 mt-12">
                     {displayLinks.map(link => {
                        const Icon = socialIconMap[link.label];
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={link.label}
                            >
                                <Icon className="w-8 h-8" />
                            </a>
                        );
                    })}
                </div>
            </div>

            <footer className="w-full text-center text-sm text-[var(--secondary-text-color)] py-4">
                <p>&copy; {new Date().getFullYear()} Abdul Rahman M. Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
};

export default Contact;