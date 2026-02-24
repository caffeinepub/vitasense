import { Card, CardContent } from '@/components/ui/card';
import { Award, Sparkles } from 'lucide-react';

interface SuccessAnimationProps {
  points: number;
}

export default function SuccessAnimation({ points }: SuccessAnimationProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <Card className="w-full max-w-lg shadow-glow border-2 border-primary/20 animate-slide-up">
        <CardContent className="pt-12 pb-12 text-center space-y-6">
          <div className="relative">
            <img
              src="/assets/generated/success-celebration.dim_400x400.png"
              alt="Success"
              className="w-48 h-48 mx-auto rounded-full animate-fade-in"
            />
            <Sparkles className="absolute top-0 right-1/4 h-8 w-8 text-primary animate-pulse-glow" />
            <Sparkles className="absolute bottom-0 left-1/4 h-8 w-8 text-secondary animate-pulse-glow" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-primary">Session Complete!</h2>
            <p className="text-muted-foreground">Great job staying focused</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Award className="h-8 w-8 text-accent" />
            <span>+{points} Points</span>
          </div>

          <p className="text-sm text-muted-foreground">Keep up the great work!</p>
        </CardContent>
      </Card>
    </div>
  );
}
