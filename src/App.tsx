import React from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/layout/HeroSection';
import { CategoryGrid } from './components/layout/CategoryGrid';
import { FeaturedListings } from './components/layout/FeaturedListings';
import { Footer } from './components/layout/Footer';
import { lightTheme } from './styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const GlobalStyle = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
    line-height: 1.6;
    color: #171717;
  }

  html {
    scroll-behavior: smooth;
  }

  /* RTL Support */
  [dir="rtl"] {
    direction: rtl;
    text-align: right;
  }

  [dir="rtl"] * {
    font-family: 'Noto Sans Arabic', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #0284c7 0%, #c026d3 100%);
  }

  /* Focus styles */
  :focus {
    outline: 2px solid #0ea5e9;
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Image loading */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Selection styles */
  ::selection {
    background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%);
    color: white;
  }

  /* Smooth transitions for theme changes */
  * {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }

  /* Loading animation */
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  .shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }

  /* Improved button hover effects */
  button {
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Enhanced card shadows */
  .card-shadow {
    box-shadow: 
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
    transition: box-shadow 0.3s ease;
  }

  .card-shadow:hover {
    box-shadow: 
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider theme={lightTheme}>
          <style>{GlobalStyle}</style>
          <div className="App">
            <Header />
            <main>
              <HeroSection />
              <CategoryGrid />
              <FeaturedListings />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;