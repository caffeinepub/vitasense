import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

export default function SignedInBadge() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();

  if (!identity) return null;

  const displayName = userProfile?.name || identity.getPrincipal().toString().slice(0, 8) + '...';

  return (
    <Badge variant="secondary" className="gap-2 px-3 py-1">
      <User className="h-3 w-3" />
      {displayName}
    </Badge>
  );
}
