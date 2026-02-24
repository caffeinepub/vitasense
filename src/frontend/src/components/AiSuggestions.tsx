import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { DigitalDetoxUser, FocusSession } from '../backend';
import { analyzeUserPatterns } from '../utils/aiAnalysis';

interface AiSuggestionsProps {
  userProfile: DigitalDetoxUser | null;
  focusSessions: FocusSession[];
}

export default function AiSuggestions({ userProfile, focusSessions }: AiSuggestionsProps) {
  if (!userProfile) return null;

  const suggestions = analyzeUserPatterns(userProfile, focusSessions);

  const iconMap = {
    'focus-time': Clock,
    'detox-tip': Lightbulb,
    'warning': AlertTriangle,
    'insight': TrendingUp,
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {suggestions.map((suggestion, index) => {
        const Icon = iconMap[suggestion.type as keyof typeof iconMap] || Lightbulb;
        
        return (
          <Card
            key={index}
            className={`shadow-soft border-2 ${
              suggestion.type === 'warning'
                ? 'border-yellow-500/30 bg-yellow-500/5'
                : 'border-primary/20 hover:border-primary/30'
            } transition-all`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className="h-5 w-5" />
                {suggestion.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{suggestion.message}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
