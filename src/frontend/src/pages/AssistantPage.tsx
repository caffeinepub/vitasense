import { useGetCallerUserProfile, useGetFocusSessions } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import AiSuggestions from '../components/AiSuggestions';

export default function AssistantPage() {
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: focusSessions, isLoading: sessionsLoading } = useGetFocusSessions();

  const isLoading = profileLoading || sessionsLoading;

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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          AI Smart Assistant
        </h1>
        <p className="text-muted-foreground mt-2">Personalized insights based on your patterns</p>
      </div>

      <AiSuggestions userProfile={userProfile || null} focusSessions={focusSessions || []} />
    </div>
  );
}
