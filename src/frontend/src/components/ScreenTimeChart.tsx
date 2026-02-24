import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';

interface ScreenTimeChartProps {
  timeRange: 'daily' | 'weekly' | 'monthly';
  currentScreenTime: number;
  dailyLimit: number;
}

export default function ScreenTimeChart({ timeRange, currentScreenTime, dailyLimit }: ScreenTimeChartProps) {
  // Generate mock data based on time range
  const generateData = () => {
    const days = timeRange === 'daily' ? 7 : timeRange === 'weekly' ? 4 : 12;
    const labels = timeRange === 'daily' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeRange === 'weekly'
      ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return labels.slice(0, days).map((label, i) => ({
      name: label,
      screenTime: Math.floor(Math.random() * dailyLimit * 0.8) + dailyLimit * 0.2,
      limit: dailyLimit,
    }));
  };

  const data = generateData();

  return (
    <Card className="shadow-soft border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Screen Time Trends
        </CardTitle>
        <CardDescription>Your screen time compared to your daily limit</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="screenTime" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            <Bar dataKey="limit" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
