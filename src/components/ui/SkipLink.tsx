import React from 'react';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                bg-amber-500 text-black px-4 py-2 rounded-md z-50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
      aria-label="Saltar al contenido principal"
    >
      Saltar al contenido principal
    </a>
  );
}
