import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import LevelProgressTracker from '../components/LevelProgressTracker';
import BadgeCollection from '../components/BadgeCollection';

export default function RewardsPage() {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-xl"></div>
          <div className="h-64 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          <Award className="h-8 w-8 text-primary" />
          Rewards & Progress
        </h1>
        <p className="text-muted-foreground mt-2">Track your achievements and level up</p>
      </div>

      <LevelProgressTracker userProfile={userProfile} />
      <BadgeCollection userProfile={userProfile} />
    </div>
  );
}
