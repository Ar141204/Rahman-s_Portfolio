import React, { useState, useEffect, useRef } from 'react';
import { SKILLS, PROJECTS } from '../constants';
import type { Project } from '../types';
import ManPageModal from './ManPageModal';
import CommandGuideModal from './CommandGuideModal';
import { QuestionMarkCircleIcon } from './Icons';

const navLinks = [
    { id: 'about', title: 'about.md' },
    { id: 'experience', title: 'experience.log' },
    { id: 'skills', title: 'skills.json' },
    { id: 'certifications', title: 'certs.list' },
    { id: 'projects', title: 'projects/' },
    { id: 'contact', title: 'contact.sh' },
];

interface AboutProps {
    navigateTo?: (index: number) => void;
}

const IntroText: React.FC = () => (
    <div className="text-left">
        <p className="text-lg text-[var(--accent-color)] font-mono">Hi, my name is</p>
        <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-color)] leading-tight">
            Abdul Rahman M.
        </h1>
        <h2 className="mt-1 text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--secondary-text-color)] leading-tight">
            I build things for the web<span className="text-[var(--accent-color)]">.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-[var(--secondary-text-color)]">
            I'm a software engineering student with a passion for AI & ML and Full-Stack Development. I specialize in creating innovative solutions and enjoy tackling complex challenges to build impactful technology.
        </p>
    </div>
);

const Help: React.FC = () => (
    <div className="terminal-output">
        <p className="font-bold mb-2">Available commands:</p>
        <ul className="list-disc list-inside">
            <li><span className="text-[var(--accent-color)] w-24 inline-block">whoami</span> - Display introduction.</li>
            <li><span className="text-[var(--accent-color)] w-24 inline-block">ls</span> - List all sections.</li>
            <li><span className="text-[var(--accent-color)] w-24 inline-block">cat [file]</span> - Navigate to a section (e.g., 'cat experience.log').</li>
            <li><span className="text-[var(--accent-color)] w-24 inline-block">man [page]</span> - Display manual pages (e.g., 'man skills').</li>
            <li><span className="text-[var(--accent-color)] w-24 inline-block">clear</span> - Clear the terminal history.</li>
        </ul>
    </div>
);

const Ls: React.FC = () => (
    <div className="terminal-output">
        <p>total {navLinks.length}</p>
        {navLinks.map(link => (
            <div key={link.id} className="flex items-center space-x-4">
                <span className="text-[var(--secondary-text-color)]">-rw-r--r--</span>
                <span className="w-8 text-[var(--secondary-text-color)]">1</span>
                <span className="w-16 text-[var(--secondary-text-color)]">rahman</span>
                <span className="w-16 text-[var(--secondary-text-color)]">staff</span>
                <span className="text-[var(--accent-color)]">{link.title}</span>
            </div>
        ))}
    </div>
);

const SkillsManPage: React.FC = () => (
    <>
        <h3>NAME</h3>
        <p>skills - list of technical abilities</p>

        <h3>DESCRIPTION</h3>
        <p>A summary of languages, frameworks, libraries, databases, and tools Abdul Rahman M. is proficient in.</p>
        
        <h3>LANGUAGES</h3>
        <ul>{SKILLS.languages.map(s => <li key={s}>- {s}</li>)}</ul>
        
        <h3>FRAMEWORKS/LIBRARIES</h3>
        <ul>{SKILLS.frameworks_libraries.map(s => <li key={s}>- {s}</li>)}</ul>

        <h3>DATABASES</h3>
        <ul>{SKILLS.databases.map(s => <li key={s}>- {s}</li>)}</ul>

        <h3>TOOLS/PLATFORMS</h3>
        <ul>{SKILLS.tools.map(s => <li key={s}>- {s}</li>)}</ul>
    </>
);

const ProjectManPage: React.FC<{ project: Project }> = ({ project }) => (
     <>
        <h3>NAME</h3>
        <p>{project.name} - a project by Abdul Rahman M.</p>

        <h3>DESCRIPTION</h3>
        <p>{project.description}</p>
        
        <h3>TECHNOLOGY STACK</h3>
        <ul>{project.stack.map(s => <li key={s}>- {s}</li>)}</ul>

        <h3>SOURCE CODE</h3>
        <p>Available on GitHub: <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[var(--accent-color)] underline">{project.githubUrl}</a></p>
    </>
);


const About: React.FC<AboutProps> = ({ navigateTo }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<React.ReactNode[]>([]);
    const [manPage, setManPage] = useState<{title: string; content: React.ReactNode} | null>(null);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setHistory([
            <div key="welcome" className="text-[var(--secondary-text-color)] terminal-output">Welcome to my interactive portfolio. Type 'help' for a list of commands.</div>,
        ]);
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, [history]);

    const handleCommand = (command: string) => {
        const newHistory = [...history, <Prompt command={command} key={history.length} />];
        const [cmd, ...args] = command.trim().toLowerCase().split(' ');

        switch(cmd) {
            case 'help':
                newHistory.push(<Help key={`${history.length}-out`} />);
                break;
            case 'whoami':
                newHistory.push(<div key={`${history.length}-out`} className="terminal-output">You're looking at it! My introduction is just above the terminal.</div>);
                break;
            case 'ls':
                newHistory.push(<Ls key={`${history.length}-out`} />);
                break;
            case 'cat':
                const fileName = args[0];
                const sectionIndex = navLinks.findIndex(link => link.title === fileName);
                if (sectionIndex !== -1 && navigateTo) {
                    navigateTo(sectionIndex);
                    newHistory.push(<div key={`${history.length}-out`} className="terminal-output">Navigating to <span className="text-[var(--accent-color)]">{fileName}</span>...</div>);
                } else if (sectionIndex === -1) {
                    newHistory.push(<div key={`${history.length}-out`} className="terminal-output">cat: {fileName}: No such file or directory</div>);
                }
                break;
            case 'man':
                const arg = args.join(' ').toLowerCase();
                if (!arg) {
                     newHistory.push(<div key={`${history.length}-out`} className="terminal-output">What manual page do you want? Try 'man skills' or 'man [project name]'.</div>);
                     break;
                }
    
                if (arg === 'skills') {
                    setManPage({
                        title: 'SKILLS(1)',
                        content: <SkillsManPage />
                    });
                    newHistory.push(<div key={`${history.length}-out`} className="terminal-output">Opening manual page for skills...</div>);
                    break;
                }
    
                const project = PROJECTS.find(p => p.name.toLowerCase() === arg);
                if (project) {
                    setManPage({
                        title: `${project.name.toUpperCase()}(1)`,
                        content: <ProjectManPage project={project} />
                    });
                     newHistory.push(<div key={`${history.length}-out`} className="terminal-output">Opening manual page for {project.name}...</div>);
                } else {
                     newHistory.push(<div key={`${history.length}-out`} className="terminal-output">No manual entry for {arg}</div>);
                }
                break;
            case 'clear':
                setHistory([]);
                return;
            case '':
                break;
            default:
                newHistory.push(<div key={`${history.length}-out`} className="terminal-output">command not found: {command}</div>);
        }
        setHistory(newHistory);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow flex flex-col justify-center">
                <IntroText />
            </div>

            <div className="w-full border-t border-[var(--border-color)] pt-4 text-left" onClick={() => inputRef.current?.focus()}>
                <div ref={terminalRef} className="h-auto max-h-[160px] overflow-y-auto pr-2">
                    {history.map((item, index) => <div key={index} className="mb-2">{item}</div>)}
                </div>
                <form onSubmit={handleSubmit} className="flex items-center mt-2 h-8">
                    <Prompt />
                    <div className="terminal-input-wrapper">
                        <span className="terminal-input-pre">{input}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                        />
                        <span 
                            className="terminal-blinking-cursor" 
                            style={{ left: `${input.length}ch` }}
                        />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setIsGuideOpen(true)} 
                      className="ml-4 text-[var(--secondary-text-color)] hover:text-[var(--accent-color)] transition-colors flex-shrink-0" 
                      aria-label="Open command guide"
                    >
                      <QuestionMarkCircleIcon className="w-6 h-6" />
                    </button>
                </form>
            </div>
            {manPage && <ManPageModal title={manPage.title} content={manPage.content} onClose={() => setManPage(null)} />}
            {isGuideOpen && <CommandGuideModal onClose={() => setIsGuideOpen(false)} />}
        </div>
    );
};

const Prompt: React.FC<{ command?: string }> = ({ command }) => (
    <div className="flex-shrink-0">
        <span className="text-[var(--accent-color)]">rahman@portfolio</span>
        <span className="text-[var(--text-color)]">:~$</span>
        {command !== undefined && <span className="ml-2">{command}</span>}
    </div>
);


export default About;