import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Dashboard } from './components/Dashboard';
import { LoadingScreen } from './components/LoadingScreen';
import { LoginScreen } from './components/LoginScreen';
import { AmbientCursorGlow } from './components/AmbientCursorGlow';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useApp();

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <AmbientCursorGlow />
      {!loading && (
        isAuthenticated ? <Dashboard /> : <LoginScreen />
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
