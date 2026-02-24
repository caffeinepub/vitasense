import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { DigitalDetoxUser, Level } from '../backend';
import { toast } from 'sonner';

interface DataResetDialogProps {
  open: boolean;
  onClose: () => void;
  userProfile: DigitalDetoxUser;
}

export default function DataResetDialog({ open, onClose, userProfile }: DataResetDialogProps) {
  const saveProfile = useSaveCallerUserProfile();

  const handleReset = async () => {
    try {
      const resetProfile: DigitalDetoxUser = {
        ...userProfile,
        currentScreenTime: BigInt(0),
        streak: BigInt(0),
        totalPoints: BigInt(0),
        level: Level.beginner,
        challenges: [],
        focusSessions: [],
      };

      await saveProfile.mutateAsync(resetProfile);
      toast.success('All data has been reset');
      onClose();
    } catch (error) {
      toast.error('Failed to reset data');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset All Data?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all your progress, including:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>All focus sessions</li>
              <li>All challenges</li>
              <li>Your streak and points</li>
              <li>Your level progress</li>
            </ul>
            <p className="mt-2 font-semibold">This action cannot be undone.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReset}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Reset All Data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
