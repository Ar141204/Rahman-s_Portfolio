import React from 'react';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import { SOCIAL_LINKS } from '../constants';

const socialIconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
    Email: MailIcon,
};

const SocialSidebar: React.FC = () => {
  return (
    <div className="hidden md:flex fixed bottom-0 left-0 w-24 z-10 flex-col items-center justify-end pb-10">
      <div className="flex flex-col items-center space-y-6">
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
                    <Icon className="w-6 h-6" />
                </a>
            );
        })}
        <div className="h-24 w-px bg-[var(--border-color)]"></div>
      </div>
    </div>
  );
};

export default SocialSidebar;