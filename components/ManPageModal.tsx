import React from 'react';
import { CloseIcon } from './Icons';

interface ManPageModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const ManPageModal: React.FC<ManPageModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="man-page-overlay" onClick={onClose}>
      <div className="man-page-modal" onClick={(e) => e.stopPropagation()}>
        <div className="man-page-header">
          <span>{title}</span>
          <button onClick={onClose} aria-label="Close manual page">
            <CloseIcon className="w-6 h-6 hover:text-[var(--accent-color)] transition-colors" />
          </button>
        </div>
        <div className="man-page-content">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ManPageModal;