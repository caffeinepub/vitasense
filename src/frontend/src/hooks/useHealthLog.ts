import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { HealthLogEntry } from '../backend';

export function useGetHealthLogEntries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<HealthLogEntry[]>({
    queryKey: ['healthLogEntries'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getHealthLogEntries();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateHealthLogEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      mood,
      sleepHours,
      notes,
    }: {
      mood: number;
      sleepHours: number;
      notes: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createHealthLogEntry(mood, sleepHours, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthLogEntries'] });
    },
  });
}
