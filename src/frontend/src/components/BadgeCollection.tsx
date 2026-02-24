import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { DigitalDetoxUser } from '../backend';
import { getBadges } from '../utils/gamification';

interface BadgeCollectionProps {
  userProfile: DigitalDetoxUser;
}

export default function BadgeCollection({ userProfile }: BadgeCollectionProps) {
  const badges = getBadges(userProfile);

  return (
    <Card className="shadow-soft border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Badge Collection
        </CardTitle>
        <CardDescription>Unlock badges by completing achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                badge.unlocked
                  ? 'border-primary/30 bg-primary/5 hover:shadow-glow'
                  : 'border-muted bg-muted/30 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="font-medium text-sm">{badge.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
