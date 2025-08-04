import "./index.css";
import { AuthProvider } from './hooks/useAuth.jsx';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
