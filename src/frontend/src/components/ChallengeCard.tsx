import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { Challenge } from '../backend';
import { useCreateChallenge } from '../hooks/useQueries';
import { toast } from 'sonner';

interface ChallengeCardProps {
  challenge: Challenge | { id: number; name: string; description: string; duration: number };
  isPrebuilt?: boolean;
}

export default function ChallengeCard({ challenge, isPrebuilt = false }: ChallengeCardProps) {
  const createChallenge = useCreateChallenge();

  const handleJoin = async () => {
    if (!isPrebuilt) return;

    const startDate = BigInt(Date.now() * 1000000);
    const endDate = BigInt((Date.now() + (challenge as any).duration * 24 * 60 * 60 * 1000) * 1000000);

    try {
      await createChallenge.mutateAsync({
        name: challenge.name,
        description: challenge.description,
        startDate,
        endDate,
      });
      toast.success('Challenge joined successfully!');
    } catch (error) {
      toast.error('Failed to join challenge');
    }
  };

  const isActive = !isPrebuilt && 'progress' in challenge;
  const progress = isActive ? Number((challenge as Challenge).progress) : 0;
  const completed = isActive ? (challenge as Challenge).completed : false;

  return (
    <Card className={`shadow-soft border-2 ${completed ? 'border-primary/30 bg-primary/5' : 'hover:border-primary/20'} transition-all`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {completed && <CheckCircle2 className="h-5 w-5 text-primary" />}
          {challenge.name}
        </CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isActive && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            {!completed && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>In progress</span>
              </div>
            )}
          </>
        )}
        {isPrebuilt && (
          <Button
            onClick={handleJoin}
            disabled={createChallenge.isPending}
            className="w-full"
          >
            {createChallenge.isPending ? 'Joining...' : 'Join Challenge'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
