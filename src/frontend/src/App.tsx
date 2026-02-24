import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import FocusModePage from './pages/FocusModePage';
import ChallengesPage from './pages/ChallengesPage';
import StatisticsPage from './pages/StatisticsPage';
import RewardsPage from './pages/RewardsPage';
import AssistantPage from './pages/AssistantPage';
import SettingsPage from './pages/SettingsPage';
import OnboardingFlow from './components/OnboardingFlow';
import BottomNavigation from './components/BottomNavigation';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

type View = 'landing' | 'dashboard' | 'focus' | 'challenges' | 'statistics' | 'rewards' | 'assistant' | 'settings';

export default function App() {
  const { identity } = useInternetIdentity();
  const [currentView, setCurrentView] = useState<View>('landing');

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  // Show onboarding only when authenticated, profile is fetched, and no profile exists
  const showOnboarding =
    isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  // Redirect to dashboard after login if not on a specific page
  useEffect(() => {
    if (isAuthenticated && currentView === 'landing') {
      setCurrentView('dashboard');
    }
  }, [isAuthenticated, currentView]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen flex flex-col bg-background">
        {!showOnboarding && (
          <AppHeader
            currentView={currentView}
            onNavigate={setCurrentView}
            isAuthenticated={isAuthenticated}
          />
        )}

        <main className="flex-1 pb-20 md:pb-0">
          {showOnboarding ? (
            <OnboardingFlow />
          ) : (
            <>
              {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
              {currentView === 'dashboard' && isAuthenticated && <DashboardPage />}
              {currentView === 'focus' && isAuthenticated && <FocusModePage />}
              {currentView === 'challenges' && isAuthenticated && <ChallengesPage />}
              {currentView === 'statistics' && isAuthenticated && <StatisticsPage />}
              {currentView === 'rewards' && isAuthenticated && <RewardsPage />}
              {currentView === 'assistant' && isAuthenticated && <AssistantPage />}
              {currentView === 'settings' && isAuthenticated && <SettingsPage />}
            </>
          )}
        </main>

        {!showOnboarding && (
          <footer className="border-t border-border bg-card hidden md:block">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Digital Detox. Control Your Screen, Control Your Life.</p>
                <p>
                  Built with{' '}
                  <span className="text-primary inline-block animate-pulse">♥</span> using{' '}
                  <a
                    href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.hostname : 'digital-detox'
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
        )}

        {isAuthenticated && !showOnboarding && (
          <BottomNavigation currentView={currentView} onNavigate={setCurrentView} />
        )}

        <Toaster />
      </div>
    </ThemeProvider>
  );
}
