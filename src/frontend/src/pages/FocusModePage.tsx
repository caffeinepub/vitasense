import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FocusTimer from '../components/FocusTimer';
import { Target } from 'lucide-react';

export default function FocusModePage() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [customDuration, setCustomDuration] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);

  const presetDurations = [
    { label: '25 min', value: 25, description: 'Pomodoro' },
    { label: '45 min', value: 45, description: 'Deep Work' },
    { label: '60 min', value: 60, description: 'Extended' },
  ];

  const handleStartSession = (duration: number) => {
    setSelectedDuration(duration);
    setIsSessionActive(true);
  };

  const handleCustomStart = () => {
    const duration = parseInt(customDuration);
    if (duration > 0 && duration <= 180) {
      handleStartSession(duration);
    }
  };

  const handleSessionComplete = () => {
    setIsSessionActive(false);
    setSelectedDuration(null);
    setCustomDuration('');
  };

  if (isSessionActive && selectedDuration) {
    return (
      <FocusTimer
        durationMinutes={selectedDuration}
        onComplete={handleSessionComplete}
        onCancel={() => setIsSessionActive(false)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Target className="h-16 w-16 mx-auto text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Focus Mode</h1>
          <p className="text-muted-foreground">Choose your focus duration and start your session</p>
        </div>

        {/* Preset Durations */}
        <div className="grid md:grid-cols-3 gap-4">
          {presetDurations.map((preset) => (
            <Card
              key={preset.value}
              className="shadow-soft border-2 hover:border-primary/30 transition-all cursor-pointer group"
              onClick={() => handleStartSession(preset.value)}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{preset.label}</CardTitle>
                <CardDescription>{preset.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full group-hover:shadow-glow" size="lg">
                  Start Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Duration */}
        <Card className="shadow-soft border-2">
          <CardHeader>
            <CardTitle>Custom Duration</CardTitle>
            <CardDescription>Set your own focus time (1-180 minutes)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customDuration">Minutes</Label>
              <Input
                id="customDuration"
                type="number"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                placeholder="Enter minutes"
                min="1"
                max="180"
              />
            </div>
            <Button
              onClick={handleCustomStart}
              disabled={!customDuration || parseInt(customDuration) <= 0 || parseInt(customDuration) > 180}
              className="w-full"
              size="lg"
            >
              Start Custom Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
