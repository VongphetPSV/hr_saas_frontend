import "./index.css";
import { useAuth } from '@/hooks/useAuth';
import AppRouter from './router/AppRouter';
import { TooltipProvider } from './components/providers/TooltipProvider';
import { AuthProvider } from './components/providers/AuthProvider';

function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;
