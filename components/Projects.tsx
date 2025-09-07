import React from 'react';
import { PROJECTS } from '../constants';
import { GitHubIcon } from './Icons';
import TypingTitle from './TypingTitle';

interface ProjectsProps {
    isVisible?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isVisible = false }) => {
    return (
        <div className="flex flex-col h-full">
            <TypingTitle command="ls -l" file="projects/" isVisible={isVisible} />
            <div className="flex-grow flex items-center justify-center">
                <div className="max-w-4xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PROJECTS.map((project, i) => (
                            <a
                                key={i}
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="border border-[var(--border-color)] rounded-md p-6 flex flex-col justify-between group hover:border-[var(--accent-color)] transition-all duration-300"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
                                            {project.name}
                                        </h3>
                                        <GitHubIcon className="w-5 h-5 text-[var(--secondary-text-color)]" />
                                    </div>
                                    <p className="text-sm text-[var(--secondary-text-color)] mb-4">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.stack.map(tech => (
                                        <span key={tech} className="text-xs text-[var(--accent-color)] bg-[var(--hover-bg)] px-2 py-1 rounded-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;