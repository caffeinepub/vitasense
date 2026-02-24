import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Smartphone, Menu } from 'lucide-react';
import AuthButton from './AuthButton';
import SignedInBadge from './SignedInBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type View = 'landing' | 'dashboard' | 'focus' | 'challenges' | 'statistics' | 'rewards' | 'assistant' | 'settings';

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
                src="/assets/generated/app-icon.dim_512x512.png"
                alt="Digital Detox"
                className="h-8 w-8 rounded-lg"
              />
              <span className="font-display text-xl font-semibold text-foreground hidden sm:inline">
                Digital Detox
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {isAuthenticated && (
                <>
                  <Button
                    variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => onNavigate('dashboard')}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant={currentView === 'focus' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => onNavigate('focus')}
                  >
                    Focus
                  </Button>
                  <Button
                    variant={currentView === 'challenges' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => onNavigate('challenges')}
                  >
                    Challenges
                  </Button>
                  <Button
                    variant={currentView === 'statistics' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => onNavigate('statistics')}
                  >
                    Statistics
                  </Button>
                </>
              )}
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
