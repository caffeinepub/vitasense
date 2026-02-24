import { Level, DigitalDetoxUser } from '../backend';

export interface LevelInfo {
  level: Level;
  label: string;
  threshold: number;
  icon: string;
  nextLevel: Level;
}

export function getLevelInfo(level: Level): LevelInfo {
  const levels: Record<Level, LevelInfo> = {
    [Level.beginner]: {
      level: Level.beginner,
      label: 'Beginner',
      threshold: 0,
      icon: '🌱',
      nextLevel: Level.consistent,
    },
    [Level.consistent]: {
      level: Level.consistent,
      label: 'Consistent',
      threshold: 100,
      icon: '🔥',
      nextLevel: Level.focusedMind,
    },
    [Level.focusedMind]: {
      level: Level.focusedMind,
      label: 'Focused Mind',
      threshold: 400,
      icon: '🧠',
      nextLevel: Level.digitalMaster,
    },
    [Level.digitalMaster]: {
      level: Level.digitalMaster,
      label: 'Digital Master',
      threshold: 900,
      icon: '👑',
      nextLevel: Level.digitalMaster,
    },
  };

  return levels[level];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export function getBadges(userProfile: DigitalDetoxUser): Badge[] {
  const points = Number(userProfile.totalPoints);
  const streak = Number(userProfile.streak);
  const sessions = userProfile.focusSessions.length;
  const challenges = userProfile.challenges.filter((c) => c.completed).length;

  return [
    {
      id: 'first-session',
      name: 'First Steps',
      description: 'Complete your first focus session',
      icon: '🎯',
      unlocked: sessions >= 1,
    },
    {
      id: 'week-streak',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: streak >= 7,
    },
    {
      id: 'hundred-points',
      name: 'Century',
      description: 'Earn 100 points',
      icon: '💯',
      unlocked: points >= 100,
    },
    {
      id: 'first-challenge',
      name: 'Challenge Accepted',
      description: 'Complete your first challenge',
      icon: '🏆',
      unlocked: challenges >= 1,
    },
    {
      id: 'ten-sessions',
      name: 'Focus Master',
      description: 'Complete 10 focus sessions',
      icon: '🎓',
      unlocked: sessions >= 10,
    },
    {
      id: 'month-streak',
      name: 'Monthly Dedication',
      description: 'Maintain a 30-day streak',
      icon: '📅',
      unlocked: streak >= 30,
    },
    {
      id: 'five-hundred-points',
      name: 'Point Collector',
      description: 'Earn 500 points',
      icon: '💎',
      unlocked: points >= 500,
    },
    {
      id: 'three-challenges',
      name: 'Challenge Champion',
      description: 'Complete 3 challenges',
      icon: '🥇',
      unlocked: challenges >= 3,
    },
  ];
}
