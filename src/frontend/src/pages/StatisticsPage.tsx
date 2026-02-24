import { useState } from 'react';
import { useGetFocusSessions, useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3 } from 'lucide-react';
import ScreenTimeChart from '../components/ScreenTimeChart';
import FocusHoursChart from '../components/FocusHoursChart';
import StreakHistory from '../components/StreakHistory';

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const { data: focusSessions, isLoading: sessionsLoading } = useGetFocusSessions();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();

  const isLoading = sessionsLoading || profileLoading;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          Statistics & Analytics
        </h1>
        <p className="text-muted-foreground mt-2">Track your progress over time</p>
      </div>

      <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value={timeRange} className="space-y-6">
          {/* Screen Time Chart */}
          <ScreenTimeChart
            timeRange={timeRange}
            currentScreenTime={userProfile ? Number(userProfile.currentScreenTime) : 0}
            dailyLimit={userProfile ? Number(userProfile.dailyLimit) : 180}
          />

          {/* Focus Hours Chart */}
          <FocusHoursChart
            timeRange={timeRange}
            focusSessions={focusSessions || []}
          />

          {/* Streak History */}
          <StreakHistory streak={userProfile ? Number(userProfile.streak) : 0} />

          {/* Improvement Stats */}
          <Card className="shadow-soft border-2">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Overall improvement metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{focusSessions?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">
                    {focusSessions?.reduce((acc, s) => acc + Number(s.durationMinutes), 0) || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Minutes Focused</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">{userProfile ? Number(userProfile.streak) : 0}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{userProfile ? Number(userProfile.totalPoints) : 0}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
