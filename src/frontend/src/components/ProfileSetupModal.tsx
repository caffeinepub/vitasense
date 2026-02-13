import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useProfile';
import { AgeRange } from '../backend';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const AGE_RANGE_LABELS: Record<AgeRange, string> = {
  [AgeRange._18to24]: '18-24',
  [AgeRange._25to34]: '25-34',
  [AgeRange._35to44]: '35-44',
  [AgeRange._45to54]: '45-54',
  [AgeRange._55to64]: '55-64',
  [AgeRange._65to74]: '65-74',
  [AgeRange._75plus]: '75+',
};

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [ageRange, setAgeRange] = useState<AgeRange | ''>('');
  const [healthGoals, setHealthGoals] = useState('');

  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ageRange) return;

    await saveProfile.mutateAsync({
      name: name.trim(),
      ageRange: ageRange as AgeRange,
      healthGoals: healthGoals.trim(),
    });
  };

  const isValid = name.trim().length > 0 && ageRange !== '';

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to VitaSense</DialogTitle>
          <DialogDescription>
            Let's set up your profile to personalize your wellness journey.
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
            <Label htmlFor="ageRange">Age Range *</Label>
            <Select value={ageRange} onValueChange={(value) => setAgeRange(value as AgeRange)}>
              <SelectTrigger id="ageRange">
                <SelectValue placeholder="Select your age range" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(AGE_RANGE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="healthGoals">Health Goals (Optional)</Label>
            <Textarea
              id="healthGoals"
              value={healthGoals}
              onChange={(e) => setHealthGoals(e.target.value)}
              placeholder="What are your wellness goals?"
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
