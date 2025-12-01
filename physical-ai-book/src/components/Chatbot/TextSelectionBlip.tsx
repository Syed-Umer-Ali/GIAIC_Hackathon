import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

interface TextSelectionBlipProps {
    position: { top: number; left: number } | null;
    onClick: () => void;
}

export const TextSelectionBlip: React.FC<TextSelectionBlipProps> = ({ position, onClick }) => {
    if (!position) return null;

    return ReactDOM.createPortal(
        <div
            className={styles.blipContainer}
            style={{ top: position.top, left: position.left }}
            onMouseDown={(e) => e.preventDefault()} // Prevent losing selection
            onClick={onClick}
        >
            <button
                className={styles.blip}
                aria-label="Ask AI about selection"
            >
                🤖
            </button>
            <span className={styles.blipLabel}>Ask AI</span>
        </div>,
        document.body
    );
};
