import "./index.css";
import { useCurrentUser } from '@/hooks/useAuth';
import AppRouter from './router/AppRouter';
import TooltipProvider from './components/providers/TooltipProvider';
import { AuthProvider } from './components/providers/AuthProvider';
import React from 'react';

const App: React.FC = () => {
  return (
    <TooltipProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </TooltipProvider>
  );
};

export default App;
