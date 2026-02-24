import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { DigitalDetoxUser, Challenge, FocusSession } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<DigitalDetoxUser | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: DigitalDetoxUser) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetChallenges() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Challenge[]>({
    queryKey: ['challenges'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getChallengeProgress();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateChallenge() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      startDate,
      endDate,
    }: {
      name: string;
      description: string;
      startDate: bigint;
      endDate: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createChallenge(name, description, startDate, endDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useUpdateChallengeProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ challengeId, progress }: { challengeId: bigint; progress: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateChallengeProgress(challengeId, progress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetFocusSessions() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<FocusSession[]>({
    queryKey: ['focusSessions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getFocusSessions();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveFocusSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (durationMinutes: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveFocusSession(durationMinutes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['focusSessions'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useAddPoints() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (points: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addPoints(points);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
