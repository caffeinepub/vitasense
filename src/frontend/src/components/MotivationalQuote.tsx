import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { useMemo } from 'react';

const QUOTES = [
  "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
  "Your focus determines your reality. Choose wisely.",
  "Almost everything will work again if you unplug it for a few minutes, including you.",
  "The best time to disconnect is now. Your mind will thank you.",
  "Digital minimalism is not about rejecting technology, but about using it intentionally.",
  "Every moment spent mindfully is a moment gained.",
  "Your attention is your most valuable asset. Protect it.",
  "Small daily improvements lead to stunning results over time.",
  "The phone can wait. Your peace of mind cannot.",
  "Be present. Your life is happening now, not on a screen.",
];

export default function MotivationalQuote() {
  const quote = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return QUOTES[dayOfYear % QUOTES.length];
  }, []);

  return (
    <Card className="shadow-soft border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardContent className="pt-6">
        <div className="flex gap-4 items-start">
          <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <p className="text-lg font-medium italic text-balance">{quote}</p>
        </div>
      </CardContent>
    </Card>
  );
}
