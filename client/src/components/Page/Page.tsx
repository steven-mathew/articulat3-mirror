// Inspired heavily by https://github.com/brianlovin/brian-lovin-next/tree/main/src/components/Page
import React from 'react';
import { Outlet } from 'react-router-dom';

import { ThemeProvider } from '../ThemeProvider';

import { Header } from '@/components/Header';

export function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <div className="h-full flex flex-col items-center justify-center px-4 lg:px-0">
          <Outlet /> {/* Renders child routes */}
        </div>
      </ThemeProvider>
    </div>
  );
}
