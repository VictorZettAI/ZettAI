import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccessibilityProvider } from '../../context/AccessibilityContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import SkipLink from '../ui/SkipLink';
import AccessibilityControls from '../AccessibilityControls/AccessibilityControls';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <div className="app-container">
          <SkipLink />
          <AccessibilityControls />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            role="alert"
            aria-live="polite"
          />
        </div>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
};

export default AppLayout;
