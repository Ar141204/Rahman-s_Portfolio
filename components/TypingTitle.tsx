import React, { useState, useEffect } from 'react';

interface TypingTitleProps {
    command: string;
    file: string;
    isVisible: boolean;
}

const TypingTitle: React.FC<TypingTitleProps> = ({ command, file, isVisible }) => {
    const [text, setText] = useState('');
    const fullText = `$ ${command} ${file}`;

    useEffect(() => {
        // This effect handles both typing and resetting in a declarative way
        if (isVisible) {
            // If visible and not finished typing, schedule the next character
            if (text.length < fullText.length) {
                const timeoutId = setTimeout(() => {
                    setText(fullText.slice(0, text.length + 1));
                }, 50);
                return () => clearTimeout(timeoutId);
            }
        } else {
            // If not visible, reset the text
            setText('');
        }
    }, [isVisible, text, fullText]);


    const commandPart = `$ ${command}`;
    const displayedCommand = text.substring(0, commandPart.length);
    const displayedFile = text.substring(commandPart.length);


    return (
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-8 min-h-[2.25rem] h-9">
            <span className="text-[var(--accent-color)]">{displayedCommand}</span>
            <span>{displayedFile}</span>
            {isVisible && text !== fullText && <span className="blinking-cursor !h-6 !w-3"></span>}
        </h2>
    );
};

export default TypingTitle;