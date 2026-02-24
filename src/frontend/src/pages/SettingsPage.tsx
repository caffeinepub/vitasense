import { useState } from 'react';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Moon, Sun, Bell, Trash2, LogOut, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import ReminderSettings from '../components/ReminderSettings';
import DataResetDialog from '../components/DataResetDialog';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();

  const [dailyLimit, setDailyLimit] = useState('');
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleSaveLimit = async () => {
    if (!userProfile || !dailyLimit) return;

    const limit = parseInt(dailyLimit);
    if (limit < 30 || limit > 720) {
      toast.error('Daily limit must be between 30 and 720 minutes');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        ...userProfile,
        dailyLimit: BigInt(limit),
      });
      toast.success('Daily limit updated successfully');
      setDailyLimit('');
    } catch (error) {
      toast.error('Failed to update daily limit');
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    toast.success('Logged out successfully');
  };

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

  if (!userProfile) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">Manage your preferences</p>
      </div>

      {/* Screen Time Limit */}
      <Card className="shadow-soft border-2">
        <CardHeader>
          <CardTitle>Daily Screen Time Limit</CardTitle>
          <CardDescription>
            Current limit: {Number(userProfile.dailyLimit)} minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dailyLimit">New limit (minutes)</Label>
            <Input
              id="dailyLimit"
              type="number"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
              placeholder={String(Number(userProfile.dailyLimit))}
              min="30"
              max="720"
            />
          </div>
          <Button
            onClick={handleSaveLimit}
            disabled={!dailyLimit || saveProfile.isPending}
            className="w-full"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Update Limit'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card className="shadow-soft border-2">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize your app theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="font-medium">Dark Mode</span>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <ReminderSettings />

      {/* Data Management */}
      <Card className="shadow-soft border-2 border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="destructive"
            onClick={() => setShowResetDialog(true)}
            className="w-full gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Reset All Data
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>

      <DataResetDialog
        open={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        userProfile={userProfile}
      />
    </div>
  );
}
