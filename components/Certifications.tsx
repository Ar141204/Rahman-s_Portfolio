import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { CertificateIcon, ExternalLinkIcon } from './Icons';
import TypingTitle from './TypingTitle';

interface CertificationsProps {
    isVisible?: boolean;
}

const Certifications: React.FC<CertificationsProps> = ({ isVisible = false }) => {
    return (
        <>
            <TypingTitle command="cat" file="certifications.list" isVisible={isVisible} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                    <a 
                        key={i} 
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certification-card"
                    >
                        <CertificateIcon className="w-10 h-10 text-[var(--accent-color)]" />

                        <div>
                            <p className="text-[var(--text-color)] font-semibold mb-1">{cert.name}</p>
                            <p className="text-sm text-[var(--secondary-text-color)]">{cert.issuer}</p>
                        </div>
                        
                        <ExternalLinkIcon className="w-5 h-5 external-link-icon" />
                    </a>
                ))}
            </div>
        </>
    );
};

export default Certifications;