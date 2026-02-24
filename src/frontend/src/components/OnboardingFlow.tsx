import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Level } from '../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Loader2, Smartphone, Target, Clock } from 'lucide-react';

type OnboardingStep = 'welcome' | 'screenTime' | 'distractions' | 'goals' | 'limits';

const GOAL_OPTIONS = [
  { value: 'reduce-addiction', label: 'Reduce Phone Addiction' },
  { value: 'improve-focus', label: 'Improve Focus' },
  { value: 'sleep-better', label: 'Sleep Better' },
];

export default function OnboardingFlow() {
  const { identity } = useInternetIdentity();
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avgScreenTime, setAvgScreenTime] = useState('');
  const [distractionApps, setDistractionApps] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [dailyLimit, setDailyLimit] = useState('');
  const [focusDuration, setFocusDuration] = useState('25');

  const saveProfile = useSaveCallerUserProfile();

  const steps: OnboardingStep[] = ['welcome', 'screenTime', 'distractions', 'goals', 'limits'];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    if (!identity) return;

    const profile = {
      callerUid: identity.getPrincipal(),
      name: name.trim(),
      email: email.trim(),
      dailyLimit: BigInt(parseInt(dailyLimit) || 180),
      currentScreenTime: BigInt(0),
      streak: BigInt(0),
      totalPoints: BigInt(0),
      level: Level.beginner,
      challenges: [],
      focusSessions: [],
      createdAt: BigInt(Date.now() * 1000000),
    };

    await saveProfile.mutateAsync(profile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="w-full max-w-2xl">
        <Progress value={progress} className="mb-8" />

        {step === 'welcome' && (
          <Card className="shadow-glow border-2 border-primary/20 animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 relative">
                <img
                  src="/assets/generated/welcome-hero.dim_800x600.png"
                  alt="Welcome"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <CardTitle className="text-3xl font-bold">Welcome to Digital Detox</CardTitle>
              <CardDescription className="text-lg">
                Take control of your screen time and build healthier digital habits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="text-lg"
                />
              </div>
              <Button
                onClick={handleNext}
                disabled={!name.trim()}
                className="w-full text-lg py-6"
                size="lg"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'screenTime' && (
          <Card className="shadow-glow border-2 border-primary/20 animate-fade-in">
            <CardHeader className="text-center">
              <Smartphone className="w-16 h-16 mx-auto mb-4 text-primary" />
              <CardTitle className="text-2xl">Average Daily Screen Time</CardTitle>
              <CardDescription>
                How many hours do you typically spend on your phone per day?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="screenTime">Hours per day</Label>
                <Input
                  id="screenTime"
                  type="number"
                  value={avgScreenTime}
                  onChange={(e) => setAvgScreenTime(e.target.value)}
                  placeholder="e.g., 6"
                  min="0"
                  max="24"
                  className="text-lg"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!avgScreenTime} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'distractions' && (
          <Card className="shadow-glow border-2 border-primary/20 animate-fade-in">
            <CardHeader className="text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <CardTitle className="text-2xl">Biggest Distractions</CardTitle>
              <CardDescription>
                Which apps distract you the most? (e.g., Instagram, TikTok, YouTube)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="distractions">Distraction Apps</Label>
                <Input
                  id="distractions"
                  value={distractionApps}
                  onChange={(e) => setDistractionApps(e.target.value)}
                  placeholder="Instagram, TikTok, YouTube..."
                  className="text-lg"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!distractionApps} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'goals' && (
          <Card className="shadow-glow border-2 border-primary/20 animate-fade-in">
            <CardHeader className="text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-accent" />
              <CardTitle className="text-2xl">Your Main Goal</CardTitle>
              <CardDescription>What do you want to achieve with Digital Detox?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal">Select your goal</Label>
                <Select value={mainGoal} onValueChange={setMainGoal}>
                  <SelectTrigger id="goal" className="text-lg">
                    <SelectValue placeholder="Choose your main goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {GOAL_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!mainGoal} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'limits' && (
          <Card className="shadow-glow border-2 border-primary/20 animate-fade-in">
            <CardHeader className="text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-primary" />
              <CardTitle className="text-2xl">Set Your Limits</CardTitle>
              <CardDescription>Define your daily screen time limit and focus duration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dailyLimit">Daily Screen Time Limit (minutes)</Label>
                <Input
                  id="dailyLimit"
                  type="number"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                  placeholder="e.g., 180 (3 hours)"
                  min="30"
                  max="720"
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="focusDuration">Preferred Focus Duration (minutes)</Label>
                <Select value={focusDuration} onValueChange={setFocusDuration}>
                  <SelectTrigger id="focusDuration" className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25 minutes (Pomodoro)</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!dailyLimit || saveProfile.isPending}
                  className="flex-1"
                >
                  {saveProfile.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    'Complete Setup'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
