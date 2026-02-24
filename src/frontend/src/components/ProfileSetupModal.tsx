import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useProfile';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Level } from '../backend';
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

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [healthGoals, setHealthGoals] = useState('');

  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !identity) return;

    const profile = {
      callerUid: identity.getPrincipal(),
      name: name.trim(),
      email: email.trim(),
      dailyLimit: BigInt(180),
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

  const isValid = name.trim().length > 0;

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Digital Detox</DialogTitle>
          <DialogDescription>
            Let's set up your profile to personalize your digital wellness journey.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
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
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="healthGoals">Goals (Optional)</Label>
            <Textarea
              id="healthGoals"
              value={healthGoals}
              onChange={(e) => setHealthGoals(e.target.value)}
              placeholder="What do you want to achieve?"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || saveProfile.isPending}
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Profile...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
