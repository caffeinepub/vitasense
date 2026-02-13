import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useProfile';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

export default function SignedInBadge() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();

  if (!identity) return null;

  const principal = identity.getPrincipal().toString();
  const shortPrincipal = `${principal.slice(0, 5)}...${principal.slice(-3)}`;

  return (
    <Badge variant="secondary" className="gap-2 px-3 py-1.5 hidden sm:flex">
      <User className="h-3.5 w-3.5" />
      <span className="text-xs font-medium">
        {userProfile?.name || shortPrincipal}
      </span>
    </Badge>
  );
}
