import { useState } from 'react';
import { UserProfile, AgeRange } from '../backend';
import { useSaveCallerUserProfile } from '../hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';
import { User, Target, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import HealthLogComposer from '../components/HealthLogComposer';
import HealthLogList from '../components/HealthLogList';

const AGE_RANGE_LABELS: Record<AgeRange, string> = {
  [AgeRange._18to24]: '18-24',
  [AgeRange._25to34]: '25-34',
  [AgeRange._35to44]: '35-44',
  [AgeRange._45to54]: '45-54',
  [AgeRange._55to64]: '55-64',
  [AgeRange._65to74]: '65-74',
  [AgeRange._75plus]: '75+',
};

interface DashboardPageProps {
  userProfile: UserProfile | null | undefined;
}

export default function DashboardPage({ userProfile }: DashboardPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile?.name || '');
  const [ageRange, setAgeRange] = useState<AgeRange | ''>(userProfile?.ageRange || '');
  const [healthGoals, setHealthGoals] = useState(userProfile?.healthGoals || '');

  const saveProfile = useSaveCallerUserProfile();

  const handleSave = async () => {
    if (!name.trim() || !ageRange) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        ageRange: ageRange as AgeRange,
        healthGoals: healthGoals.trim(),
      });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setName(userProfile?.name || '');
    setAgeRange(userProfile?.ageRange || '');
    setHealthGoals(userProfile?.healthGoals || '');
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {userProfile?.name || 'there'}!
        </h1>
        <p className="text-muted-foreground">
          Track your wellness journey and monitor your health metrics
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <Card className="lg:col-span-1 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Your Profile
            </CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name *</Label>
                  <Input
                    id="edit-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-ageRange">Age Range *</Label>
                  <Select
                    value={ageRange}
                    onValueChange={(value) => setAgeRange(value as AgeRange)}
                  >
                    <SelectTrigger id="edit-ageRange">
                      <SelectValue placeholder="Select age range" />
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
                  <Label htmlFor="edit-healthGoals">Health Goals</Label>
                  <Textarea
                    id="edit-healthGoals"
                    value={healthGoals}
                    onChange={(e) => setHealthGoals(e.target.value)}
                    placeholder="Your wellness goals"
                    rows={4}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSave}
                    disabled={saveProfile.isPending}
                    className="flex-1"
                  >
                    {saveProfile.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                    <p className="font-medium">{userProfile?.name || 'Not set'}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Age Range</p>
                    <p className="font-medium">
                      {userProfile?.ageRange
                        ? AGE_RANGE_LABELS[userProfile.ageRange]
                        : 'Not set'}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5" />
                      Health Goals
                    </p>
                    <p className="text-sm leading-relaxed">
                      {userProfile?.healthGoals || 'No goals set yet'}
                    </p>
                  </div>
                </div>

                <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Health Log Composer */}
        <div className="lg:col-span-2">
          <HealthLogComposer />
        </div>
      </div>

      {/* Health Log List */}
      <HealthLogList />
    </div>
  );
}
