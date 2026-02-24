import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useCreateChallenge } from '../hooks/useQueries';
import { toast } from 'sonner';

interface CustomChallengeDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CustomChallengeDialog({ open, onClose }: CustomChallengeDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [durationDays, setDurationDays] = useState('');

  const createChallenge = useCreateChallenge();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDate = BigInt(Date.now() * 1000000);
    const endDate = BigInt((Date.now() + parseInt(durationDays) * 24 * 60 * 60 * 1000) * 1000000);

    try {
      await createChallenge.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        startDate,
        endDate,
      });
      toast.success('Custom challenge created!');
      onClose();
      setName('');
      setDescription('');
      setDurationDays('');
    } catch (error) {
      toast.error('Failed to create challenge');
    }
  };

  const isValid = name.trim() && description.trim() && parseInt(durationDays) > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Custom Challenge</DialogTitle>
          <DialogDescription>
            Design your own digital detox challenge
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Challenge Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning Phone-Free"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your challenge goals..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days) *</Label>
            <Input
              id="duration"
              type="number"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              placeholder="e.g., 7"
              min="1"
              max="90"
              required
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || createChallenge.isPending}
              className="flex-1"
            >
              {createChallenge.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Challenge'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
