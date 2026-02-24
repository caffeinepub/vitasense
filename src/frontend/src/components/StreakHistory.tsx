import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';

interface StreakHistoryProps {
  streak: number;
}

interface DayData {
  day: number;
  active: boolean;
}

export default function StreakHistory({ streak }: StreakHistoryProps) {
  const generateCalendar = (): DayData[] => {
    const days: DayData[] = [];
    for (let i = 29; i >= 0; i--) {
      const isActive = i < streak;
      days.push({
        day: i,
        active: isActive,
      });
    }
    return days.reverse();
  };

  const calendar = generateCalendar();

  return (
    <Card className="shadow-soft border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-accent" />
          Streak History
        </CardTitle>
        <CardDescription>Your consistency over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-5xl font-bold text-accent">{streak}</p>
            <p className="text-muted-foreground">Current Streak</p>
          </div>
          <div className="grid grid-cols-10 gap-2">
            {calendar.map((day, i) => (
              <div
                key={i}
                className={`aspect-square rounded-md ${
                  day.active ? 'bg-accent' : 'bg-muted'
                } transition-colors`}
                title={`Day ${day.day + 1}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
