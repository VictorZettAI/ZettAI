import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityControls: React.FC = () => {
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    reducedMotion,
    toggleReducedMotion,
  } = useAccessibility();

  return (
    <div
      className="accessibility-controls"
      role="region"
      aria-label="Accessibility Controls"
    >
      <h2 className="sr-only">Accessibility Settings</h2>
      
      <div className="control-group">
        <button
          onClick={toggleHighContrast}
          aria-pressed={highContrast}
          className="button-primary"
        >
          {highContrast ? 'Disable' : 'Enable'} High Contrast
        </button>
      </div>

      <div className="control-group">
        <span id="font-size-label">Font Size: {fontSize}px</span>
        <div
          role="group"
          aria-labelledby="font-size-label"
          className="button-group"
        >
          <button
            onClick={decreaseFontSize}
            aria-label="Decrease font size"
            className="button-primary"
          >
            A-
          </button>
          <button
            onClick={increaseFontSize}
            aria-label="Increase font size"
            className="button-primary"
          >
            A+
          </button>
        </div>
      </div>

      <div className="control-group">
        <button
          onClick={toggleReducedMotion}
          aria-pressed={reducedMotion}
          className="button-primary"
        >
          {reducedMotion ? 'Enable' : 'Reduce'} Motion
        </button>
      </div>

      <style jsx>{`
        .accessibility-controls {
          padding: 1rem;
          border: 1px solid var(--color-text-secondary);
          border-radius: 0.5rem;
        }

        .control-group {
          margin: 1rem 0;
        }

        .button-group {
          display: flex;
          gap: 0.5rem;
        }

        button {
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          border: none;
          cursor: pointer;
        }

        button:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default AccessibilityControls;
