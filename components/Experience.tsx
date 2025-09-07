import React from 'react';
import { EXPERIENCES, EDUCATION } from '../constants';
import TypingTitle from './TypingTitle';

const allEntries = [
    ...EXPERIENCES,
    ...EDUCATION.map(edu => ({
        role: edu.degree,
        company: edu.institution,
        period: edu.period,
        description: edu.details,
    })),
];

interface ExperienceProps {
    isVisible?: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ isVisible = false }) => {
    return (
        <div className="flex flex-col h-full w-full">
            <TypingTitle command="cat" file="experience.log" isVisible={isVisible} />
            <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                <div className="timeline">
                    {allEntries.map((entry, index) => (
                        <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="timeline-content">
                                <h3 className="text-lg font-bold text-[var(--text-color)]">{entry.role}</h3>
                                <p className="text-md text-[var(--accent-color)] font-semibold">{entry.company}</p>
                                <p className="text-xs font-mono my-2 text-[var(--secondary-text-color)]">{entry.period}</p>
                                <ul className="list-none space-y-1 text-sm text-[var(--secondary-text-color)]">
                                    {entry.description.map((point, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-[var(--accent-color)] mr-2 mt-1 text-xs">▹</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;