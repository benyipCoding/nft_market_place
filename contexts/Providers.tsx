'use client';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import Script from 'next/script';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      {children}
      <Script
        src="https://kit.fontawesome.com/5f7ac22047.js"
        crossOrigin="anonymous"
      ></Script>
    </ThemeProvider>
  );
};

export default Providers;
