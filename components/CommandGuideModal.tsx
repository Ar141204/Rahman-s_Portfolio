import React from 'react';
import { CloseIcon } from './Icons';

const commands = [
  {
    cmd: 'whoami',
    desc: 'Displays a short introduction about me.',
    example: null,
  },
  {
    cmd: 'ls',
    desc: 'Lists all the available sections of the portfolio you can navigate to.',
    example: null,
  },
  {
    cmd: 'cat [file]',
    desc: 'Navigates to a specific section.',
    example: 'cat experience.log',
  },
  {
    cmd: 'man [page]',
    desc: 'Shows a detailed "manual page" for skills or a specific project.',
    example: 'man skills',
  },
  {
    cmd: 'clear',
    desc: 'Clears all the previous commands and outputs from the terminal screen.',
    example: null,
  },
];

const CommandGuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="man-page-overlay" onClick={onClose}>
      <div className="man-page-modal" onClick={(e) => e.stopPropagation()}>
        <div className="man-page-header">
          <span>Command Guide</span>
          <button onClick={onClose} aria-label="Close command guide">
            <CloseIcon className="w-6 h-6 hover:text-[var(--accent-color)] transition-colors" />
          </button>
        </div>
        <div className="man-page-content">
          <p className="mb-6">This is an interactive terminal. Use the following commands to explore my portfolio.</p>
          <dl>
            {commands.map(({ cmd, desc, example }) => (
              <div key={cmd} className="mb-4">
                <dt className="font-bold text-[var(--accent-color)] text-lg font-mono">{cmd}</dt>
                <dd className="ml-4 text-[var(--secondary-text-color)]">
                  {desc}
                  {example && (
                    <span className="block mt-1 text-sm text-[var(--secondary-accent-color)] bg-[#3E3D32] p-2 rounded-md font-mono">
                      e.g., {example}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CommandGuideModal;
