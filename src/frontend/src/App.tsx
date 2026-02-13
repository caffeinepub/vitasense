import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useActor } from './hooks/useActor';
import { useState } from 'react';
import AppHeader from './components/AppHeader';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import FutureAiInsightsPage from './pages/FutureAiInsightsPage';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useGetCallerUserProfile } from './hooks/useProfile';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

type View = 'landing' | 'dashboard' | 'insights';

export default function App() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const [currentView, setCurrentView] = useState<View>('landing');

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  // Show profile setup modal only when authenticated, profile is fetched, and no profile exists
  const showProfileSetup =
    isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  // Redirect to dashboard after login if not on insights page
  if (isAuthenticated && currentView === 'landing') {
    setCurrentView('dashboard');
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-background">
        <AppHeader
          currentView={currentView}
          onNavigate={setCurrentView}
          isAuthenticated={isAuthenticated}
        />

        <main className="flex-1">
          {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
          {currentView === 'dashboard' && isAuthenticated && (
            <DashboardPage userProfile={userProfile} />
          )}
          {currentView === 'insights' && <FutureAiInsightsPage />}
        </main>

        <footer className="border-t border-border bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} VitaSense. Not medical advice.</p>
              <p>
                Built with{' '}
                <span className="text-primary inline-block animate-pulse">♥</span> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.hostname : 'vitasense'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </footer>

        {showProfileSetup && <ProfileSetupModal />}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
