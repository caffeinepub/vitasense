import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';
import { FocusSession } from '../backend';

interface FocusHoursChartProps {
  timeRange: 'daily' | 'weekly' | 'monthly';
  focusSessions: FocusSession[];
}

export default function FocusHoursChart({ timeRange, focusSessions }: FocusHoursChartProps) {
  const generateData = () => {
    const days = timeRange === 'daily' ? 7 : timeRange === 'weekly' ? 4 : 12;
    const labels = timeRange === 'daily' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeRange === 'weekly'
      ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return labels.slice(0, days).map((label) => ({
      name: label,
      hours: Math.floor(Math.random() * 4) + 1,
    }));
  };

  const data = generateData();

  return (
    <Card className="shadow-soft border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Focus Hours
        </CardTitle>
        <CardDescription>Time spent in focused work sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
            <Line
              type="monotone"
              dataKey="hours"
              stroke="hsl(var(--secondary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--secondary))', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
