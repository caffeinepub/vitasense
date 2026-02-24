import { Home, Target, TrendingUp, Award, Settings } from 'lucide-react';

type View = 'dashboard' | 'focus' | 'challenges' | 'statistics' | 'rewards' | 'assistant' | 'settings';

interface BottomNavigationProps {
  currentView: View | 'landing';
  onNavigate: (view: View) => void;
}

export default function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { view: 'dashboard' as View, icon: Home, label: 'Home' },
    { view: 'focus' as View, icon: Target, label: 'Focus' },
    { view: 'challenges' as View, icon: TrendingUp, label: 'Challenges' },
    { view: 'statistics' as View, icon: Award, label: 'Stats' },
    { view: 'settings' as View, icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ view, icon: Icon, label }) => {
          const isActive = currentView === view;
          return (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'animate-pulse-glow' : ''}`} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
