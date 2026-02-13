import { useGetHealthLogEntries } from '../hooks/useHealthLog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Moon, Smile, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MOOD_EMOJIS = ['😢', '😕', '😐', '🙂', '😄'];

export default function HealthLogList() {
  const { data: entries, isLoading, error } = useGetHealthLogEntries();

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return (
      <Card className="shadow-soft">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-soft">
        <CardContent className="py-6">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load health log entries. Please try again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const displayEntries = entries?.slice(0, 20) || [];

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Your Health Log
        </CardTitle>
        <CardDescription>
          {displayEntries.length > 0
            ? `Showing ${displayEntries.length} most recent ${displayEntries.length === 1 ? 'entry' : 'entries'}`
            : 'No entries yet'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {displayEntries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No entries yet</p>
            <p className="text-sm">Start logging your wellness journey above!</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {displayEntries.map((entry, index) => (
                <div key={index}>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="gap-1.5">
                            <Smile className="h-3.5 w-3.5" />
                            Mood: {MOOD_EMOJIS[entry.mood - 1]} {entry.mood}/5
                          </Badge>
                          <Badge variant="secondary" className="gap-1.5">
                            <Moon className="h-3.5 w-3.5" />
                            Sleep: {entry.sleepHours}h
                          </Badge>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-foreground leading-relaxed">{entry.notes}</p>
                        )}
                      </div>
                      <time className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(entry.timestamp)}
                      </time>
                    </div>
                  </div>
                  {index < displayEntries.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
