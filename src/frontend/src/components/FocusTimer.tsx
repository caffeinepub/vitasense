import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, X } from 'lucide-react';
import { useSaveFocusSession, useAddPoints } from '../hooks/useQueries';
import ExitWarningDialog from './ExitWarningDialog';
import SuccessAnimation from './SuccessAnimation';

interface FocusTimerProps {
  durationMinutes: number;
  onComplete: () => void;
  onCancel: () => void;
}

export default function FocusTimer({ durationMinutes, onComplete, onCancel }: FocusTimerProps) {
  const totalSeconds = durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const saveFocusSession = useSaveFocusSession();
  const addPoints = useAddPoints();

  const progress = ((totalSeconds - secondsRemaining) / totalSeconds) * 100;
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    if (isPaused || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, secondsRemaining]);

  const handleComplete = async () => {
    try {
      await saveFocusSession.mutateAsync(BigInt(durationMinutes));
      const points = BigInt(durationMinutes * 2);
      await addPoints.mutateAsync(points);
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    } catch (error) {
      console.error('Failed to save focus session:', error);
    }
  };

  const handleExit = () => {
    setShowExitWarning(true);
  };

  const confirmExit = () => {
    setShowExitWarning(false);
    onCancel();
  };

  if (showSuccess) {
    return <SuccessAnimation points={durationMinutes * 2} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <Card className="w-full max-w-lg shadow-glow border-2 border-primary/20">
        <CardContent className="pt-8 space-y-8">
          {/* Circular Progress */}
          <div className="relative w-64 h-64 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-6xl font-bold">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </p>
              <p className="text-muted-foreground mt-2">Stay focused</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsPaused(!isPaused)}
              className="w-32"
            >
              {isPaused ? (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={handleExit}
              className="w-32"
            >
              <X className="mr-2 h-5 w-5" />
              Exit
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-center text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </div>
        </CardContent>
      </Card>

      <ExitWarningDialog
        open={showExitWarning}
        onClose={() => setShowExitWarning(false)}
        onConfirm={confirmExit}
      />
    </div>
  );
}
