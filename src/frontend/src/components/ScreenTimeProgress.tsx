import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface ScreenTimeProgressProps {
  currentScreenTime: number;
  dailyLimit: number;
}

export default function ScreenTimeProgress({ currentScreenTime, dailyLimit }: ScreenTimeProgressProps) {
  const percentage = dailyLimit > 0 ? (currentScreenTime / dailyLimit) * 100 : 0;
  const remainingTime = Math.max(0, dailyLimit - currentScreenTime);
  
  const getStatusColor = () => {
    if (percentage >= 100) return 'text-destructive';
    if (percentage >= 80) return 'text-yellow-500';
    return 'text-primary';
  };

  const getProgressColor = () => {
    if (percentage >= 100) return 'bg-destructive';
    if (percentage >= 80) return 'bg-yellow-500';
    return '';
  };

  return (
    <Card className="shadow-soft border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Today's Screen Time
        </CardTitle>
        <CardDescription>Track your daily usage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-3xl font-bold">{currentScreenTime} min</p>
            <p className="text-sm text-muted-foreground">of {dailyLimit} min limit</p>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${getStatusColor()}`}>{remainingTime} min</p>
            <p className="text-sm text-muted-foreground">remaining</p>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={Math.min(percentage, 100)} className={getProgressColor()} />
          <p className="text-sm text-center text-muted-foreground">
            {percentage >= 100 ? 'Limit exceeded!' : percentage >= 80 ? 'Almost at your limit' : 'You\'re doing great!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
