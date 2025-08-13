import "./index.css";
import { useAuth } from '@/hooks/useAuth';
import AppRouter from './router/AppRouter';
import { TooltipProvider } from './components/providers/TooltipProvider';

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
