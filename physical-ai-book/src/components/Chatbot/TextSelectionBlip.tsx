import React from 'react';
import styles from './styles.module.css';

interface TextSelectionBlipProps {
    position: { top: number; left: number } | null;
    onClick: () => void;
}

export const TextSelectionBlip: React.FC<TextSelectionBlipProps> = ({ position, onClick }) => {
    if (!position) return null;

    return (
        <button
            className={styles.blip}
            style={{ top: position.top, left: position.left }}
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            aria-label="Ask AI about selection"
        >
            🤖
        </button>
    );
};
