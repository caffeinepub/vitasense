import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { DigitalDetoxUser, Level } from '../backend';
import { getLevelInfo } from '../utils/gamification';

interface LevelProgressTrackerProps {
  userProfile: DigitalDetoxUser;
}

export default function LevelProgressTracker({ userProfile }: LevelProgressTrackerProps) {
  const currentPoints = Number(userProfile.totalPoints);
  const levelInfo = getLevelInfo(userProfile.level);
  const nextLevelInfo = getLevelInfo(levelInfo.nextLevel);
  
  const pointsToNext = nextLevelInfo.threshold - currentPoints;
  const progress = ((currentPoints - levelInfo.threshold) / (nextLevelInfo.threshold - levelInfo.threshold)) * 100;

  return (
    <Card className="shadow-glow border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Level Progress
        </CardTitle>
        <CardDescription>Keep earning points to level up</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-primary">{levelInfo.label}</p>
            <p className="text-sm text-muted-foreground">Current Level</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{currentPoints}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to {nextLevelInfo.label}</span>
            <span className="font-medium">{pointsToNext} points needed</span>
          </div>
          <Progress value={Math.min(progress, 100)} className="h-3" />
        </div>

        <div className="grid grid-cols-4 gap-2 pt-4">
          {[Level.beginner, Level.consistent, Level.focusedMind, Level.digitalMaster].map((level) => {
            const info = getLevelInfo(level);
            const isUnlocked = currentPoints >= info.threshold;
            const isCurrent = userProfile.level === level;
            
            return (
              <div
                key={level}
                className={`text-center p-3 rounded-xl border-2 transition-all ${
                  isCurrent
                    ? 'border-primary bg-primary/10'
                    : isUnlocked
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-muted bg-muted/30'
                }`}
              >
                <p className="text-2xl mb-1">{info.icon}</p>
                <p className="text-xs font-medium">{info.label}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
