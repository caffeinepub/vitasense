import { useState } from 'react';
import { useGetChallenges } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Plus } from 'lucide-react';
import ChallengeCard from '../components/ChallengeCard';
import CustomChallengeDialog from '../components/CustomChallengeDialog';

const PRE_BUILT_CHALLENGES = [
  {
    id: 1,
    name: '7-Day Detox',
    description: 'Reduce your screen time by 30% for 7 consecutive days',
    duration: 7,
  },
  {
    id: 2,
    name: 'No Social Media Sunday',
    description: 'Stay off social media every Sunday for 4 weeks',
    duration: 28,
  },
  {
    id: 3,
    name: '2 Hours No Phone Before Sleep',
    description: 'No phone usage 2 hours before bedtime for 14 days',
    duration: 14,
  },
];

export default function ChallengesPage() {
  const { data: challenges, isLoading } = useGetChallenges();
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Challenges
          </h1>
          <p className="text-muted-foreground mt-2">Take on challenges to build better habits</p>
        </div>
        <Button onClick={() => setShowCustomDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Custom
        </Button>
      </div>

      {/* Pre-built Challenges */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Challenges</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRE_BUILT_CHALLENGES.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} isPrebuilt />
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      {challenges && challenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Active Challenges</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <ChallengeCard key={Number(challenge.id)} challenge={challenge} />
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CustomChallengeDialog open={showCustomDialog} onClose={() => setShowCustomDialog(false)} />
    </div>
  );
}
