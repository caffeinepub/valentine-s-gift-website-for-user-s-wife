import { type ReactNode } from 'react';

interface ValentineThemeProviderProps {
  children: ReactNode;
}

export function ValentineThemeProvider({ children }: ValentineThemeProviderProps) {
  return (
    <div className="min-h-screen heart-pattern-bg">
      {children}
    </div>
  );
}
