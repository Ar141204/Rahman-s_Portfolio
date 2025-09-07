import React, { useState, useRef, useEffect } from 'react';
import { PaletteIcon } from './Icons';
import { THEMES, ThemeName } from '../constants';

interface ThemeSwitcherProps {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const themeNames: { id: ThemeName; name: string }[] = [
    { id: 'monokai-pink', name: 'Monokai Pink' },
    { id: 'terminal-green', name: 'Terminal Green' },
    { id: 'nordic-night', name: 'Nordic Night' },
    { id: 'solarized-amber', name: 'Solarized Amber' },
    { id: 'synthwave-indigo', name: 'Synthwave Indigo' },
    { id: 'electric-blue', name: 'Electric Blue' },
    { id: 'dracula-orchid', name: 'Dracula Orchid' },
    { id: 'oceanic-teal', name: 'Oceanic Teal' },
    { id: 'crimson-red', name: 'Crimson Red' },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close popover on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleThemeChange = (themeName: ThemeName) => {
        setTheme(themeName);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[var(--secondary-accent-color)] hover:text-[var(--accent-color)] transition-colors"
                aria-label="Change theme"
            >
                <PaletteIcon className="w-6 h-6" />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-2 w-48 bg-[var(--panel-solid-bg)] border border-[var(--border-color)] rounded-md shadow-lg p-2 z-50"
                >
                    <ul className="space-y-1">
                        {themeNames.map(({ id, name }) => (
                            <li key={id}>
                                <button
                                    onClick={() => handleThemeChange(id)}
                                    className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center transition-colors ${
                                        currentTheme === id
                                            ? 'bg-[var(--hover-bg)] text-[var(--accent-color)] font-semibold'
                                            : 'text-[var(--secondary-text-color)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-color)]'
                                    }`}
                                >
                                    <span
                                        className="w-4 h-4 rounded-full mr-3 border border-gray-500"
                                        style={{ backgroundColor: THEMES[id]['--accent-color'] }}
                                    ></span>
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;