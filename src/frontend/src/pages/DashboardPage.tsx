import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Flame, Clock } from 'lucide-react';
import ScreenTimeProgress from '../components/ScreenTimeProgress';
import MotivationalQuote from '../components/MotivationalQuote';
import DashboardStats from '../components/DashboardStats';

export default function DashboardPage() {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-xl"></div>
          <div className="h-48 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {userProfile.name}!</h1>
        <p className="text-muted-foreground">Let's make today count</p>
      </div>

      {/* Motivational Quote */}
      <MotivationalQuote />

      {/* Stats Overview */}
      <DashboardStats userProfile={userProfile} />

      {/* Screen Time Progress */}
      <ScreenTimeProgress
        currentScreenTime={Number(userProfile.currentScreenTime)}
        dailyLimit={Number(userProfile.dailyLimit)}
      />

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="shadow-soft border-2 hover:border-primary/30 transition-all cursor-pointer group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Start Focus Session
                </CardTitle>
                <CardDescription>Begin a focused work session</CardDescription>
              </div>
              <Button size="sm" className="group-hover:shadow-glow">
                Start
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-soft border-2 hover:border-secondary/30 transition-all cursor-pointer group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Join Challenge
                </CardTitle>
                <CardDescription>Take on a new digital detox challenge</CardDescription>
              </div>
              <Button size="sm" variant="secondary" className="group-hover:shadow-glow">
                Browse
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Current Streak */}
      <Card className="shadow-soft border-2 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-accent" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-accent">{Number(userProfile.streak)}</div>
            <div className="text-muted-foreground">
              <p className="font-medium">days</p>
              <p className="text-sm">Keep it going!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
