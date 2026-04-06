import React from 'react';
import App from './App';
import { ThemeProvider } from './components/ThemeContext';

const RootApp: React.FC = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default RootApp;
