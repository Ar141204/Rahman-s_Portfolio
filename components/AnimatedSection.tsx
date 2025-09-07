import React from 'react';

interface AnimatedSectionProps {
  id: string;
  children: React.ReactNode;
  isActive: boolean;
  navigateTo: (index: number) => void;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ id, children, isActive, navigateTo }) => {
  const isAbout = id === 'about';

  return (
    <section 
      id={id} 
      className={`h-full w-full flex items-center justify-center p-4 md:pl-24 md:pr-8 md:py-8 transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className={`w-full content-panel ${isAbout ? 'about-section-bg' : ''}`}
      >
        {React.Children.map(children, child => {
            if (React.isValidElement(child) && typeof child.type !== 'string') {
                return React.cloneElement(child as React.ReactElement<any>, { isVisible: isActive, navigateTo });
            }
            return child;
        })}
      </div>
    </section>
  );
};

export default AnimatedSection;