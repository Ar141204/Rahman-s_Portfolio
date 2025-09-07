import React from 'react';
import { SKILLS } from '../constants';
import TypingTitle from './TypingTitle';

interface SkillsProps {
    isVisible?: boolean;
}

const SkillCategory: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => (
    <div className="mb-8">
        <h3 className="skill-category-title">// {title}</h3>
        <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
                <div key={skill} className="skill-tag">
                    {skill}
                </div>
            ))}
        </div>
    </div>
);


const Skills: React.FC<SkillsProps> = ({ isVisible = false }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <TypingTitle command="./run" file="skills-assessment" isVisible={isVisible} />
            <div className="flex-grow flex items-center">
                <div className="w-full">
                    <SkillCategory title="Languages" skills={SKILLS.languages} />
                    <SkillCategory title="Frameworks/Libs" skills={SKILLS.frameworks_libraries} />
                    <SkillCategory title="Databases" skills={SKILLS.databases} />
                    <SkillCategory title="Tools/Platforms" skills={SKILLS.tools} />
                </div>
            </div>
        </div>
    );
};

export default Skills;
