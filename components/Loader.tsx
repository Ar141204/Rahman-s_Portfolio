import React, { useState, useEffect } from 'react';
import Pacman from './Pacman';

const steps = [
    { text: "Booting up system...", duration: 500 },
    { text: "Connecting to server...", duration: 600 },
    { text: "Compiling assets...", duration: 700 },
    { text: "Launching portfolio...", duration: 500 },
];

const Loader: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, steps[currentStep].duration);
            return () => clearTimeout(timer);
        }
    }, [currentStep]);

    return (
        <div className="loader-container">
            <div className="loader-text text-left text-lg sm:text-xl space-y-2">
                {steps.slice(0, currentStep + 1).map((step, index) => (
                    <div key={index} className="flex items-center h-8">
                        {index < currentStep ? (
                            <>
                                <span className="text-[var(--tertiary-accent-color)] w-[28px] text-left flex-shrink-0">✔</span>
                                <span className="text-[var(--secondary-text-color)]">{step.text}</span>
                            </>
                        ) : (
                           <div className="flex items-center">
                                <div className="pacman-loader-line">
                                    <div className="pacman-eat-animation" style={{ animationDuration: `${step.duration}ms` }}>
                                        <Pacman />
                                    </div>
                                    <div className="dots-wrapper">
                                        {[...Array(5)].map((_, i) => (
                                            <div 
                                                key={i} 
                                                className="dot"
                                                style={{ 
                                                    animationDelay: `${(i * (step.duration)) / 6}ms` 
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-[var(--text-color)]">{step.text}</span>
                           </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loader;