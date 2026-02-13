import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';
import AuthButton from './AuthButton';
import SignedInBadge from './SignedInBadge';

type View = 'landing' | 'dashboard' | 'insights';

interface AppHeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  isAuthenticated: boolean;
}

export default function AppHeader({ currentView, onNavigate, isAuthenticated }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/assets/generated/vitasense-logo.dim_512x512.png"
                alt="VitaSense"
                className="h-8 w-8"
              />
              <span className="font-display text-xl font-semibold text-foreground">
                VitaSense
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {isAuthenticated && (
                <Button
                  variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate('dashboard')}
                  className="gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Dashboard
                </Button>
              )}
              <Button
                variant={currentView === 'insights' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onNavigate('insights')}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                AI Insights
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && <SignedInBadge />}
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}
