import { useState } from 'react';
import { useCreateHealthLogEntry } from '../hooks/useHealthLog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { PlusCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const MOOD_LABELS = ['😢 Very Low', '😕 Low', '😐 Neutral', '🙂 Good', '😄 Excellent'];

export default function HealthLogComposer() {
  const [mood, setMood] = useState<number>(3);
  const [sleepHours, setSleepHours] = useState<string>('7');
  const [notes, setNotes] = useState('');

  const createEntry = useCreateHealthLogEntry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sleepValue = parseInt(sleepHours, 10);
    if (isNaN(sleepValue) || sleepValue < 0 || sleepValue > 24) {
      toast.error('Please enter valid sleep hours (0-24)');
      return;
    }

    try {
      await createEntry.mutateAsync({
        mood: mood as number,
        sleepHours: sleepValue,
        notes: notes.trim(),
      });

      // Reset form
      setMood(3);
      setSleepHours('7');
      setNotes('');
      toast.success('Health log entry added successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add entry');
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          Log Today's Wellness
        </CardTitle>
        <CardDescription>Track your daily mood, sleep, and notes</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Mood: {MOOD_LABELS[mood - 1]}</Label>
            <Slider
              value={[mood]}
              onValueChange={(values) => setMood(values[0])}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Low</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepHours">Sleep Hours</Label>
            <Input
              id="sleepHours"
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              placeholder="7"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling today? Any observations?"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={createEntry.isPending}>
            {createEntry.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Entry...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Entry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
