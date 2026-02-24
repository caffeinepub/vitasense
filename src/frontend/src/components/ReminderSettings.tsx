import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function ReminderSettings() {
  const [screenTimeWarning, setScreenTimeWarning] = useState(true);
  const [nighttimeReminder, setNighttimeReminder] = useState(true);
  const [nighttimeHour, setNighttimeHour] = useState('22:00');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('reminderSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setScreenTimeWarning(settings.screenTimeWarning ?? true);
      setNighttimeReminder(settings.nighttimeReminder ?? true);
      setNighttimeHour(settings.nighttimeHour ?? '22:00');
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        toast.success('Notifications enabled');
      }
    }
  };

  const saveSettings = () => {
    const settings = {
      screenTimeWarning,
      nighttimeReminder,
      nighttimeHour,
    };
    localStorage.setItem('reminderSettings', JSON.stringify(settings));
  };

  useEffect(() => {
    saveSettings();
  }, [screenTimeWarning, nighttimeReminder, nighttimeHour]);

  return (
    <Card className="shadow-soft border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Reminders
        </CardTitle>
        <CardDescription>Configure your notification preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {notificationPermission !== 'granted' && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Enable notifications to receive reminders
            </p>
            <button
              onClick={requestNotificationPermission}
              className="text-sm text-primary hover:underline"
            >
              Enable Notifications
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Screen Time Warning</p>
            <p className="text-sm text-muted-foreground">Alert at 80% of daily limit</p>
          </div>
          <Switch
            checked={screenTimeWarning}
            onCheckedChange={setScreenTimeWarning}
            disabled={notificationPermission !== 'granted'}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Nighttime Disconnect</p>
              <p className="text-sm text-muted-foreground">Gentle reminder to disconnect</p>
            </div>
            <Switch
              checked={nighttimeReminder}
              onCheckedChange={setNighttimeReminder}
              disabled={notificationPermission !== 'granted'}
            />
          </div>
          {nighttimeReminder && (
            <div className="space-y-2 pl-4">
              <Label htmlFor="nighttime">Reminder time</Label>
              <Input
                id="nighttime"
                type="time"
                value={nighttimeHour}
                onChange={(e) => setNighttimeHour(e.target.value)}
                disabled={notificationPermission !== 'granted'}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
