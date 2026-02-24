import { Card, CardContent } from '@/components/ui/card';
import { Flame, Award, TrendingUp } from 'lucide-react';
import { DigitalDetoxUser, Level } from '../backend';

interface DashboardStatsProps {
  userProfile: DigitalDetoxUser;
}

const LEVEL_LABELS: Record<Level, string> = {
  [Level.beginner]: 'Beginner',
  [Level.consistent]: 'Consistent',
  [Level.focusedMind]: 'Focused Mind',
  [Level.digitalMaster]: 'Digital Master',
};

export default function DashboardStats({ userProfile }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Flame className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{Number(userProfile.streak)}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{Number(userProfile.totalPoints)}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{LEVEL_LABELS[userProfile.level]}</p>
              <p className="text-sm text-muted-foreground">Current Level</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
